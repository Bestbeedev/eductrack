<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TuteurResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->parent_id,
            'lien_avec_eleve' => $this->lien_formatted,
            'profession' => $this->profession,
            'telephone' => $this->telephone,
            'user' => $this->whenLoaded('user', function() {
                return $this->user ? [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email
                ] : null;
            }),
            'eleves' => $this->whenLoaded('eleves', function() {
                return $this->eleves->map(fn($eleve) => [
                    'id' => $eleve->eleve_id,
                    'nom_complet' => $eleve->nom . ' ' . $eleve->prenom,
                    'classe' => $eleve->classe->nom_classe ?? null
                ]);
            }),
            'created_at' => $this->created_at->format('d/m/Y H:i'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i')
        ];
    }
}
