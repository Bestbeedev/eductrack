<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tuteur extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lien_avec_eleve',
        'profession',
        'telephone',
        'adresse'
    ];

    protected $casts = [
        'lien_avec_eleve' => 'string',
    ];

    /**
     * Relation avec l'utilisateur
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec les élèves
     */
    public function eleves(): HasMany
    {
        return $this->hasMany(Eleve::class);
    }

    /**
     * Accesseur pour le type de parent formaté
     */
    public function getLienFormattedAttribute(): string
    {
        return match($this->lien_avec_eleve) {
            'père' => 'Père',
            'mère' => 'Mère',
            'tuteur' => 'Tuteur légal',
            default => $this->lien_avec_eleve
        };
    }

    /**
     * Scope pour les pères
     */
    public function scopePeres($query)
    {
        return $query->where('lien_avec_eleve', 'père');
    }

    /**
     * Scope pour les mères
     */
    public function scopeMeres($query)
    {
        return $query->where('lien_avec_eleve', 'mère');
    }
}
