<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\EcoleController;
use App\Http\Controllers\EleveController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\TuteurController;
use App\Models\Classe;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API de gestion des élèves et enseignants'
    ]);
});
// Inscription
Route::post('/register', [AuthController::class, 'register']);

// Connexion
Route::post('/login', [AuthController::class, 'login']);

// Déconnexion (authentifié)
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Vérification de l'email
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
     ->name('verification.verify');

// Renvoyer l'email de vérification (authentifié)
Route::middleware('auth:sanctum')->post('/email/verification-notification',
     [AuthController::class, 'resendVerificationEmail']);

// Routes protégées pour admin seulement
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Valider un enseignant et lui attribuer un matricule
    Route::post('/teachers/{teacher}/validate', [AuthController::class, 'validateTeacher'])
         ->whereNumber('teacher'); // Validation que l'ID est numérique
});

//vérifier les enseignants à valider
Route::middleware(['auth:sanctum', 'admin'])->get('/pending-teachers',
     [AuthController::class, 'getPendingTeachers']);


// Routes pour les écoles
Route::apiResource('ecoles', EcoleController::class)
    ->middleware('auth:sanctum'); // Optionnel - si vous voulez protéger les routes

    Route::middleware('auth:sanctum')->group(function () {
        // Routes standards
        Route::apiResource('eleves', EleveController::class);

        // Routes supplémentaires
        Route::get('ecoles/{ecoleId}/eleves', [EleveController::class, 'byEcole']);
        Route::get('classes/{classeId}/eleves', [EleveController::class, 'byClasse']);
    });

//Routes pour les enseigants
Route::apiResource('enseignants', EnseignantController::class)
    ->middleware('auth:sanctum');


// Routes pour les classes
Route::apiResource('classes', ClasseController::class)
    ->middleware('auth:sanctum');

Route::get('ecoles/{ecoleId}/classes', [ClasseController::class, 'byEcole'])
    ->middleware('auth:sanctum');

Route::apiResource('parents', TuteurController::class)
    ->middleware('auth:sanctum');

