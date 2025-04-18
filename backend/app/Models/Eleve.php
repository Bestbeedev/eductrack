<?php

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
        'nom',
        'prenom',
        'date_naissance',
        'photo'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ecole()
    {
        return $this->belongsTo(Ecole::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function tuteur()
    {
        return $this->belongsTo(Tuteur::class);
    }
}
