<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enseignant extends Model
{
    use HasFactory;

    protected $primaryKey = 'enseignant_id';
    protected $fillable = [
        'matricule',
        'user_id',
        'ecole_id',
        'nom',
        'prenom',
        'specialite'
    ];

    /**
     * Relation avec l'utilisateur
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relation avec l'école
     */
    public function ecole(): BelongsTo
    {
        return $this->belongsTo(Ecole::class, 'ecole_id');
    }

    /**
     * Accesseur pour le nom complet
     */
    public function getNomCompletAttribute(): string
    {
        return $this->prenom . ' ' . $this->nom;
    }

    /**
     * Génère un matricule unique
     */
    public static function genererMatricule(): string
    {
        do {
            $matricule = 'ENS' . date('Y') . strtoupper(substr(uniqid(), -5));
        } while (self::where('matricule', $matricule)->exists());

        return $matricule;
    }
}
