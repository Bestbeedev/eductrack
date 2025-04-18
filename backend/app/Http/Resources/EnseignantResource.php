<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnseignantResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->enseignant_id,
            'matricule' => $this->matricule,
            'nom_complet' => $this->nom_complet,
            'specialite' => $this->specialite,
            'ecole' => [
                'id' => $this->ecole->id,
                'nom' => $this->ecole->nom
            ],
            'user' => $this->when($this->user_id, [
                'id' => $this->user->id,
                'email' => $this->user->email
            ]),
            'created_at' => $this->created_at->format('d/m/Y H:i'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i')
        ];
    }
}
