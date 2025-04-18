<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ecole extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom', 'email', 'telephone', 'adresse', 'siteWeb',
        'dateCreation', 'responsable', 'numeroEnregistrement',
        'numeroLicence', 'region', 'codeEcole', 'statut',
        'certification', 'infrastructure', 'accesTechnologie', 'logo'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }
}
