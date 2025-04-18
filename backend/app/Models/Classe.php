<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /**
     * Relation avec l'école
     */
    public function ecole(): BelongsTo
    {
        return $this->belongsTo(Ecole::class, 'ecole_id');
    }

    /**
     * Relation avec le professeur principal
     */
    public function profPrincipal(): BelongsTo
    {
        return $this->belongsTo(Enseignant::class, 'prof_principal_id');
    }

    /**
     * Relation avec les élèves
     */
    public function eleves(): HasMany
    {
        return $this->hasMany(Eleve::class, 'classe_id');
    }

    /**
     * Accesseur pour le nom complet de la classe
     */
    public function getNomCompletAttribute(): string
    {
        return "{$this->niveau} - {$this->nom_classe}";
    }

    /**
     * Scope pour les classes d'une école spécifique
     */
    public function scopeOfEcole($query, $ecoleId)
    {
        return $query->where('ecole_id', $ecoleId);
    }

    /**
     * Scope pour les classes d'un niveau spécifique
     */
    public function scopeOfNiveau($query, $niveau)
    {
        return $query->where('niveau', $niveau);
    }
}
