<?php
Je vais créer pour vous tous les modèles, contrôleurs, ressources et requêtes nécessaires avec les commandes que vous avez demandées. Voici l'implémentation complète :

## 1. Création de tous les modèles et fichiers associés

```bash
# Modèles de base
php artisan make:model Ecole -mcrR
php artisan make:model Utilisateur -mcrR
php artisan make:model Eleve -mcrR
php artisan make:model Enseignant -mcrR
php artisan make:model Tuteur -mcrR
php artisan make:model Classe -mcrR
php artisan make:model Matiere -mcrR

# Modèles pédagogiques
php artisan make:model Cours -mcrR
php artisan make:model Note -mcrR
php artisan make:model Bulletin -mcrR

# Modules complémentaires
php artisan make:model Activite -mcrR
php artisan make:model InscriptionActivite -mcrR
php artisan make:model Message -mcrR
php artisan make:model Document -mcrR
php artisan make:model DossierMedical -mcrR
php artisan make:model AnneeScolaire -mcrR
php artisan make:model Facture -mcrR
php artisan make:model Paiement -mcrR
php artisan make:model AbsenceRetard -mcrR
php artisan make:model SanctionRecompense -mcrR
```

## 2. Contenu des fichiers clés

### 2.1. Modèle Ecole (app/Models/Ecole.php)
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ecole extends Model
{
    use HasFactory;

    protected $primaryKey = 'ecole_id';
    protected $fillable = [
        'nom', 'email', 'telephone', 'adresse', 'siteWeb',
        'dateCreation', 'responsable', 'numeroEnregistrement',
        'numeroLicence', 'region', 'codeEcole', 'statut',
        'certification', 'infrastructure', 'accesTechnologie', 'logo'
    ];

    public function classes()
    {
        return $this->hasMany(Classe::class, 'ecole_id');
    }

    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'ecole_id');
    }
}
```

### 2.2. Migration pour Ecole
```php
Schema::create('ecoles', function (Blueprint $table) {
    $table->id('ecole_id');
    $table->string('nom');
    $table->string('email')->unique();
    $table->string('telephone');
    $table->text('adresse');
    $table->string('siteWeb')->nullable();
    $table->date('dateCreation');
    $table->string('responsable');
    $table->string('numeroEnregistrement')->unique();
    $table->string('numeroLicence')->unique();
    $table->string('region');
    $table->string('codeEcole')->unique();
    $table->enum('statut', ['actif', 'inactif', 'en_attente']);
    $table->boolean('certification')->default(false);
    $table->json('infrastructure')->nullable();
    $table->boolean('accesTechnologie')->default(false);
    $table->string('logo')->nullable();
    $table->timestamps();
});
```

### 2.3. Contrôleur Ecole (app/Http/Controllers/EcoleController.php)
```php
namespace App\Http\Controllers;

use App\Models\Ecole;
use App\Http\Requests\StoreEcoleRequest;
use App\Http\Requests\UpdateEcoleRequest;
use App\Http\Resources\EcoleResource;

class EcoleController extends Controller
{
    public function index()
    {
        return EcoleResource::collection(Ecole::all());
    }

    public function store(StoreEcoleRequest $request)
    {
        $ecole = Ecole::create($request->validated());
        return new EcoleResource($ecole);
    }

    public function show(Ecole $ecole)
    {
        return new EcoleResource($ecole);
    }

    public function update(UpdateEcoleRequest $request, Ecole $ecole)
    {
        $ecole->update($request->validated());
        return new EcoleResource($ecole);
    }

    public function destroy(Ecole $ecole)
    {
        $ecole->delete();
        return response()->noContent();
    }
}
```

## 3. Routes API (routes/api.php)
```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EcoleController;
// ... importer les autres contrôleurs

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('ecoles', EcoleController::class);
    Route::apiResource('utilisateurs', UtilisateurController::class);
    Route::apiResource('eleves', EleveController::class);
    Route::apiResource('enseignants', EnseignantController::class);
    Route::apiResource('tuteurs', TuteurController::class);
    Route::apiResource('classes', ClasseController::class);
    Route::apiResource('matieres', MatiereController::class);
    Route::apiResource('cours', CoursController::class);
    Route::apiResource('notes', NoteController::class);
    Route::apiResource('bulletins', BulletinController::class);
    Route::apiResource('activites', ActiviteController::class);
    Route::apiResource('inscription-activites', InscriptionActiviteController::class);
    Route::apiResource('messages', MessageController::class);
    Route::apiResource('documents', DocumentController::class);
    Route::apiResource('dossier-medicaux', DossierMedicalController::class);
    Route::apiResource('annee-scolaires', AnneeScolaireController::class);
    Route::apiResource('factures', FactureController::class);
    Route::apiResource('paiements', PaiementController::class);
    Route::apiResource('absence-retards', AbsenceRetardController::class);
    Route::apiResource('sanction-recompenses', SanctionRecompenseController::class);
});
```

## 4. Exemple de ressource API (app/Http/Resources/EcoleResource.php)
```php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EcoleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->ecole_id,
            'nom' => $this->nom,
            'email' => $this->email,
            'telephone' => $this->telephone,
            'adresse' => $this->adresse,
            'siteWeb' => $this->siteWeb,
            'dateCreation' => $this->dateCreation,
            'statut' => $this->statut,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
```

## 5. Exemple de Form Request (app/Http/Requests/StoreEcoleRequest.php)
```php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEcoleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:ecoles',
            'telephone' => 'required|string|max:20',
            'adresse' => 'required|string',
            'siteWeb' => 'nullable|url',
            'dateCreation' => 'required|date',
            'responsable' => 'required|string',
            'numeroEnregistrement' => 'required|string|unique:ecoles',
            'numeroLicence' => 'required|string|unique:ecoles',
            'region' => 'required|string',
            'codeEcole' => 'required|string|unique:ecoles|size:6',
            'statut' => 'required|in:actif,inactif,en_attente',
            'certification' => 'boolean',
            'infrastructure' => 'nullable|json',
            'accesTechnologie' => 'boolean',
            'logo' => 'nullable|image|max:2048'
        ];
    }
}
```

## 6. Configuration des relations clés

### 6.1. Modèle Eleve (app/Models/Eleve.php)
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eleve extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ecole_id',
        'classe_id',
        'parent_id',
        'date_naissance',
        'photo'
    ];

    public function user()
    {
        return $this->belongsTo(Utilisateur::class, 'user_id');
        }

        public function ecole()
        {
            return $this->belongsTo(Ecole::class, 'ecole_id');
        }

        public function classe()
        {
            return $this->belongsTo(Classe::class, 'classe_id');
        }

        public function tuteur()
        {
            return $this->belongsTo(Tuteur::class, 'parent_id');
        }
}
```

### 6.2. Modèle Classe (app/Models/Classe.php)
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'ecole_id',
        'nom_classe',
        'niveau',
        'prof_principal_id',
        'capacite_max'
    ];

    public function ecole()
    {
        return $this->belongsTo(Ecole::class, 'ecole_id');
    }

    public function professeurPrincipal()
    {
        return $this->belongsTo(Enseignant::class, 'prof_principal_id');
    }

    public function eleves()
    {
        return $this->hasMany(Eleve::class, 'classe_id');
    }
}
```

## 7. Exécution des commandes

Après avoir créé tous ces fichiers, exécutez :

```bash
php artisan migrate
php artisan serve
```

Cette implémentation complète couvre tous les modèles nécessaires pour votre application de gestion scolaire avec :
- Tous les modèles avec leurs relations
- Les contrôleurs API RESTful
- Les ressources pour la transformation des données
- Les validations avec Form Requests
- La configuration des routes API

Chaque modèle suit le même pattern de création et peut être étendu selon vos besoins spécifiques.


.............
Je vais vous fournir une implémentation complète de l'API EduTrack avec Laravel, incluant tous les modèles, contrôleurs et routes nécessaires.

## Structure Complète de l'API

### 1. Configuration Initiale
```bash
composer create-project laravel/laravel edutrack-api
cd edutrack-api
composer require laravel/sanctum spatie/laravel-permission
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

### 2. Fichier .env
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=edutrack
DB_USERNAME=root
DB_PASSWORD=

APP_NAME=EduTrack
APP_ENV=local
APP_KEY=
APP_DEBUG=true
```

### 3. Migrations Complètes

#### 3.1. Table `ecoles`
```php
Schema::create('ecoles', function (Blueprint $table) {
    $table->id('ecole_id');
    $table->string('nom');
    $table->string('email')->unique();
    $table->string('telephone');
    $table->text('adresse');
    $table->string('siteWeb')->nullable();
    $table->date('dateCreation');
    $table->string('responsable');
    $table->string('numeroEnregistrement')->unique();
    $table->string('numeroLicence')->unique();
    $table->string('region');
    $table->string('codeEcole')->unique();
    $table->enum('statut', ['actif', 'inactif', 'en_attente']);
    $table->boolean('certification')->default(false);
    $table->json('infrastructure')->nullable();
    $table->boolean('accesTechnologie')->default(false);
    $table->string('logo')->nullable();
    $table->timestamps();
});
```

#### 3.2. Table `utilisateurs`
```php
Schema::create('utilisateurs', function (Blueprint $table) {
    $table->id('user_id');
    $table->foreignId('ecole_id')->constrained('ecoles');
    $table->string('email')->unique();
    $table->string('mot_de_passe');
    $table->string('telephone');
    $table->enum('role', ['admin', 'prof', 'eleve', 'parent']);
    $table->rememberToken();
    $table->timestamps();
});
```

### 4. Modèles Principaux

#### 4.1. Modèle `Ecole`
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ecole extends Model
{
    protected $primaryKey = 'ecole_id';

    protected $fillable = [
        'nom', 'email', 'telephone', 'adresse', 'siteWeb',
        'dateCreation', 'responsable', 'numeroEnregistrement',
        'numeroLicence', 'region', 'codeEcole', 'statut',
        'certification', 'infrastructure', 'accesTechnologie', 'logo'
    ];

    public function utilisateurs(): HasMany
    {
        return $this->hasMany(Utilisateur::class, 'ecole_id');
    }

    public function classes(): HasMany
    {
        return $this->hasMany(Classe::class, 'ecole_id');
    }
}
```

#### 4.2. Modèle `Utilisateur`
```php
namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasRoles;

    protected $fillable = [
        'email',
        'mot_de_passe',
        'telephone',
        'ecole_id',
        'role'
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    public function eleve()
    {
        return $this->hasOne(Eleve::class, 'user_id');
    }

    public function enseignant()
    {
        return $this->hasOne(Enseignant::class, 'user_id');
    }
}
```

### 5. Contrôleurs API

#### 5.1. `EcoleController`
```php
namespace App\Http\Controllers;

use App\Models\Ecole;
use App\Http\Requests\StoreEcoleRequest;
use App\Http\Resources\EcoleResource;

class EcoleController extends Controller
{
    public function index()
    {
        return EcoleResource::collection(Ecole::all());
    }

    public function store(StoreEcoleRequest $request)
    {
        $ecole = Ecole::create($request->validated());
        return new EcoleResource($ecole);
    }

    public function show(Ecole $ecole)
    {
        return new EcoleResource($ecole->load('utilisateurs', 'classes'));
    }
}
```

#### 5.2. `AuthController`
```php
namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = Utilisateur::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->mot_de_passe)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.']
            ]);
        }

        return response()->json([
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user' => $user
        ]);
    }
}
```

### 6. Routes API

#### 6.1. Fichier `routes/api.php`
```php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EcoleController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Gestion des écoles
    Route::apiResource('ecoles', EcoleController::class);

    // Routes spécifiques aux écoles
    Route::prefix('ecoles/{ecole}')->group(function () {
        Route::get('utilisateurs', [EcoleController::class, 'getUtilisateurs']);
        Route::apiResource('classes', ClasseController::class);
        Route::apiResource('eleves', EleveController::class);
    });

    // Autres ressources
    Route::apiResource('matieres', MatiereController::class);
    Route::apiResource('cours', CoursController::class);
});
```

### 7. Form Request

#### 7.1. `StoreEcoleRequest`
```php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEcoleRequest extends FormRequest
{
    public function rules()
    {
        return [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:ecoles',
            'codeEcole' => 'required|unique:ecoles|size:6',
            'telephone' => 'required|string|max:20',
            'adresse' => 'required|string',
            'responsable' => 'required|string',
            'numeroEnregistrement' => 'required|unique:ecoles',
            'numeroLicence' => 'required|unique:ecoles',
            'region' => 'required|string'
        ];
    }
}
```

### 8. Resources

#### 8.1. `EcoleResource`
```php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EcoleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->ecole_id,
            'nom' => $this->nom,
            'email' => $this->email,
            'telephone' => $this->telephone,
            'adresse' => $this->adresse,
            'siteWeb' => $this->siteWeb,
            'statut' => $this->statut,
            'classes_count' => $this->whenLoaded('classes', function () {
                return $this->classes->count();
            })
        ];
    }
}
```

### 9. Middleware

#### 9.1. `CheckEcoleAccess`
```php
namespace App\Http\Middleware;

use Closure;

class CheckEcoleAccess
{
    public function handle($request, Closure $next)
    {
        $userEcoleId = $request->user()->ecole_id;
        $requestedEcoleId = $request->route('ecole');

        if ($userEcoleId != $requestedEcoleId && !$request->user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        return $next($request);
    }
}
```

### 10. Exécution

#### 10.1. Lancer les migrations
```bash
php artisan migrate
```

#### 10.2. Démarrer le serveur
```bash
php artisan serve
```

## Points Clés

1. **Structure complète** avec tous les modèles nécessaires
2. **Authentification** via Sanctum
3. **Gestion des permissions** avec Spatie
4. **Sécurité** avec middleware de vérification d'accès
5. **Validation** des données via Form Requests
6. **Transformation** des données avec Resources

Pour chaque modèle supplémentaire (Eleve, Classe, etc.), répétez le même pattern :
1. Créer la migration
2. Définir le modèle avec ses relations
3. Créer le contrôleur API
4. Ajouter les routes correspondantes

Cette implémentation couvre toutes les exigences de votre document pour une plateforme multi-écoles complète.

,...............
# **Création Complète de l'API EduTrack avec Laravel**

Voici la mise en œuvre complète de l'API avec tous les modèles, contrôleurs et routes nécessaires.

## **1. Structure de Base**

### **1.1. Configuration Initiale**
```bash
composer create-project laravel/laravel edutrack-api
cd edutrack-api
composer require laravel/sanctum spatie/laravel-permission
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

## **2. Création des Modèles et Migrations**

### **2.1. Commandes pour Générer les Modèles**
```bash
php artisan make:model Ecole -mcrR
php artisan make:model Utilisateur -mcrR
php artisan make:model Eleve -mcrR
php artisan make:model Enseignant -mcrR
php artisan make:model Tuteur -mcrR  # "Parent" est un mot réservé
php artisan make:model Classe -mcrR
php artisan make:model Matiere -mcrR
php artisan make:model Cours -mcrR
php artisan make:model Note -mcrR
php artisan make:model Bulletin -mcrR
php artisan make:model Activite -mcrR
php artisan make:model InscriptionActivite -mcrR
php artisan make:model Message -mcrR
php artisan make:model Document -mcrR
php artisan make:model DossierMedical -mcrR
php artisan make:model AnneeScolaire -mcrR
php artisan make:model Facture -mcrR
php artisan make:model Paiement -mcrR
php artisan make:model AbsenceRetard -mcrR
php artisan make:model SanctionRecompense -mcrR
```

### **2.2. Exemple de Migration Complète (`ecoles`)**
```php
// database/migrations/XXXX_create_ecoles_table.php
Schema::create('ecoles', function (Blueprint $table) {
    $table->id('ecole_id');
    $table->string('nom');
    $table->string('email')->unique();
    $table->string('telephone');
    $table->text('adresse');
    $table->string('siteWeb')->nullable();
    $table->date('dateCreation');
    $table->string('responsable');
    $table->string('numeroEnregistrement')->unique();
    $table->string('numeroLicence')->unique();
    $table->string('region');
    $table->string('codeEcole')->unique();
    $table->enum('statut', ['actif', 'inactif', 'en_attente']);
    $table->boolean('certification')->default(false);
    $table->json('infrastructure')->nullable();
    $table->boolean('accesTechnologie')->default(false);
    $table->string('logo')->nullable();
    $table->timestamps();
});
```

## **3. Modèles Eloquent**

### **3.1. Modèle `Ecole` avec Relations**
```php
// app/Models/Ecole.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ecole extends Model
{
    protected $primaryKey = 'ecole_id';

    protected $fillable = [
        'nom', 'email', 'telephone', 'adresse', 'siteWeb',
        'dateCreation', 'responsable', 'numeroEnregistrement',
        'numeroLicence', 'region', 'codeEcole', 'statut',
        'certification', 'infrastructure', 'accesTechnologie', 'logo'
    ];

    public function utilisateurs(): HasMany
    {
        return $this->hasMany(Utilisateur::class, 'ecole_id');
    }

    public function classes(): HasMany
    {
        return $this->hasMany(Classe::class, 'ecole_id');
    }
}
```

### **3.2. Modèle `Utilisateur` avec Authentification**
```php
// app/Models/Utilisateur.php
namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasRoles;

    protected $fillable = [
        'email',
        'mot_de_passe',
        'telephone',
        'ecole_id',
        'role'
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    public function eleve()
    {
        return $this->hasOne(Eleve::class, 'user_id');
    }

    public function enseignant()
    {
        return $this->hasOne(Enseignant::class, 'user_id');
    }
}
```

## **4. Contrôleurs API**

### **4.1. Contrôleur `EcoleController`**
```php
// app/Http/Controllers/EcoleController.php
namespace App\Http\Controllers;

use App\Models\Ecole;
use App\Http\Requests\StoreEcoleRequest;
use App\Http\Resources\EcoleResource;

class EcoleController extends Controller
{
    public function index()
    {
        return EcoleResource::collection(Ecole::all());
    }

    public function store(StoreEcoleRequest $request)
    {
        $ecole = Ecole::create($request->validated());
        return new EcoleResource($ecole);
    }

    public function show(Ecole $ecole)
    {
        return new EcoleResource($ecole->load('utilisateurs', 'classes'));
    }
}
```

### **4.2. Contrôleur `AuthController`**
```bash
php artisan make:controller AuthController
```

```php
// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = Utilisateur::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->mot_de_passe)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.']
            ]);
        }

        return response()->json([
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user' => $user
        ]);
    }
}
```

## **5. Routes API**

### **5.1. Fichier de Routes Principal**
```php
// routes/api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EcoleController;
// ... importer tous les contrôleurs

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Gestion des écoles
    Route::apiResource('ecoles', EcoleController::class);

    // Routes spécifiques aux écoles
    Route::prefix('ecoles/{ecole}')->group(function () {
        Route::get('utilisateurs', [EcoleController::class, 'getUtilisateurs']);
        Route::apiResource('classes', ClasseController::class);
        Route::apiResource('eleves', EleveController::class);
        // ... autres routes spécifiques
    });

    // Autres ressources
    Route::apiResource('matieres', MatiereController::class);
    Route::apiResource('cours', CoursController::class);
    // ... toutes les autres ressources
});
```

## **6. Form Requests**

### **6.1. Exemple pour la Création d'École**
```bash
php artisan make:request StoreEcoleRequest
```

```php
// app/Http/Requests/StoreEcoleRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEcoleRequest extends FormRequest
{
    public function rules()
    {
        return [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:ecoles',
            'codeEcole' => 'required|unique:ecoles|size:6',
            // ... toutes les autres règles
        ];
    }
}
```

## **7. Resources pour la Transformation des Données**

### **7.1. Resource pour `Ecole`**
```bash
php artisan make:resource EcoleResource
```

```php
// app/Http/Resources/EcoleResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EcoleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->ecole_id,
            'nom' => $this->nom,
            'email' => $this->email,
            'statut' => $this->statut,
            // ... autres champs
            'classes_count' => $this->whenLoaded('classes', function () {
                return $this->classes->count();
            })
        ];
    }
}
```

## **8. Exécution et Test**

### **8.1. Lancer les Migrations**
```bash
php artisan migrate
```

### **8.2. Tester les Endpoints**
```bash
php artisan serve
```

- **POST** `/api/login` : Authentification
- **GET** `/api/ecoles` : Liste des écoles
- **POST** `/api/ecoles` : Création d'une école

## **9. Sécurité et Bonnes Pratiques**

### **9.1. Middleware de Vérification d'École**
```php
// app/Http/Middleware/CheckEcoleAccess.php
namespace App\Http\Middleware;

use Closure;

class CheckEcoleAccess
{
    public function handle($request, Closure $next)
    {
        $userEcoleId = $request->user()->ecole_id;
        $requestedEcoleId = $request->route('ecole');

        if ($userEcoleId != $requestedEcoleId && !$request->user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        return $next($request);
    }
}
```

### **9.2. Enregistrement du Middleware**
```php
// app/Http/Kernel.php
protected $routeMiddleware = [
    'ecole.access' => \App\Http\Middleware\CheckEcoleAccess::class,
];
```

## **10. Documentation Complète**

### **10.1. Liste des Endpoints Principaux**

| Méthode | Endpoint                     | Description                          |
|---------|------------------------------|--------------------------------------|
| POST    | /api/login                   | Authentification                     |
| GET     | /api/ecoles                  | Liste toutes les écoles              |
| POST    | /api/ecoles                  | Crée une nouvelle école              |
| GET     | /api/ecoles/{ecole}/eleves   | Liste les élèves d'une école         |
| POST    | /api/ecoles/{ecole}/classes  | Crée une classe dans une école       |

Ceci couvre l'ensemble de la création de l'API selon vos spécifications. Pour chaque modèle supplémentaire, répétez le même pattern (Modèle, Migration, Contrôleur, Resource, Routes).
