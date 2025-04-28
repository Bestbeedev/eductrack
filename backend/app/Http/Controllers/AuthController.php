<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use App\Notifications\VerifyEmail;
use App\Notifications\TeacherRegistrationPending;
use App\Notifications\TeacherValidated;
use Carbon\Carbon;

class AuthController extends Controller
{
    // Inscription avec vérification de l'email
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:6',
            'role' => 'required|string|max:255|in:etudiant,enseignant,admin,parent',
        ]);

        // Créer l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'matricule' => $request->role === 'enseignant' ? null : $this->generateMatricule($request->role)
        ]);

        // Gestion spécifique pour les enseignants
        if ($user->role === 'enseignant') {
            // Envoyer une notification personnalisée pour les enseignants
            $user->notify(new TeacherRegistrationPending());

            return response()->json([
                'message' => 'Votre inscription en tant qu\'enseignant est en attente de validation. Un email vous a été envoyé vous avec les prochaines étapes.',
            ]);
        }

        // Pour les autres rôles, procéder normalement
        event(new Registered($user));

        return response()->json([
            'message' => 'Utilisateur créé avec succès. Vérifiez votre email.',
            'token' => $this->createTokenWithExpiry($user),
        ]);
    }

    // Connexion avec vérification du matricule pour les enseignants
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations d\'identification sont incorrectes.'],
            ]);
        }

        // Vérification spécifique pour les enseignants
        if ($user->role === 'enseignant' && empty($user->matricule)) {
            return response()->json(['message' => 'Votre compte enseignant n\'a pas encore été validé par l\'administrateur.'], 403);
        }

        // Vérification de l'email pour tous les utilisateurs
        if (!$user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Veuillez vérifier votre adresse email.'], 401);
        }

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $this->createTokenWithExpiry($user),
            'expires_at' => Carbon::now()->addDays(7)->toDateTimeString()
        ]);
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    // Vérification de l'email
public function verifyEmail(Request $request, $id, $hash)
{
    $user = User::findOrFail($id);

    if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => 'Lien de vérification invalide'], 400);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'Email déjà vérifié']);
    }

    $user->markEmailAsVerified();

    return response()->json([
        'message' => 'Email vérifié avec succès',
        'user' => $user->only(['id', 'name', 'email'])
    ]);
}
    // Renvoyer l'email de vérification
    public function resendVerificationEmail(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email déjà vérifié.'], 400);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Un email de vérification a été renvoyé.']);
    }

    // Méthode pour générer un matricule
    private function generateMatricule($role)
    {
        $prefix = '';
        switch ($role) {
            case 'etudiant':
                $prefix = 'ETU';
                break;
            case 'admin':
                $prefix = 'ADM';
                break;
            default:
                return null;
        }

        return $prefix . strtoupper(uniqid());
    }

    // Méthode pour créer un token avec expiration
    private function createTokenWithExpiry($user)
    {
        $token = $user->createToken('auth_token');

        // Définir l'expiration du token (7 jours)
        $token->accessToken->expires_at = Carbon::now()->addDays(7);
        $token->accessToken->save();

        return $token->plainTextToken;
    }

    // Méthode pour l'admin pour valider un enseignant et lui attribuer un matricule
    public function validateTeacher(Request $request, $teacherId)
    {
        // Vérification plus complète des permissions
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Action non autorisée'], 403);
        }

        $teacher = User::find($teacherId);

        if (!$teacher) {
            return response()->json(['message' => 'Enseignant non trouvé'], 404);
        }

        if ($teacher->role !== 'enseignant') {
            return response()->json(['message' => 'Seuls les enseignants peuvent être validés'], 400);
        }

        if ($teacher->matricule) {
            return response()->json(['message' => 'Cet enseignant a déjà un matricule'], 400);
        }

        // Génération du matricule
        $matricule = 'ENS' . date('Y') . strtoupper(substr(md5(uniqid()), 0, 6));

        $teacher->update([
            'matricule' => $matricule,
            'email_verified_at' => now() // Optionnel: marquer comme vérifié
        ]);

        // Envoi de la notification
        $teacher->notify(new TeacherValidated($matricule));

        return response()->json([
            'success' => true,
            'message' => 'Enseignant validé avec succès',
            'matricule' => $matricule,
            'teacher' => $teacher->only(['id', 'name', 'email'])
        ]);
    }
    // Méthode pour récupérer les enseignants en attente de validation
    public function getPendingTeachers()
{
    return response()->json([
        'teachers' => User::where('role', 'enseignant')
                         ->whereNull('matricule')
                         ->get(['id', 'name', 'email', 'created_at'])
    ]);
}
}
