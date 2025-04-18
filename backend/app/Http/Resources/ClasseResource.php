<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClasseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->classe_id,
            'nom_complet' => $this->nom_complet,
            'nom_classe' => $this->nom_classe,
            'niveau' => $this->niveau,
            'capacite_max' => $this->capacite_max,
            'ecole' => [
                'id' => $this->ecole->id,
                'nom' => $this->ecole->nom
            ],
            'prof_principal' => $this->whenLoaded('profPrincipal', function() {
                return $this->profPrincipal ? [
                    'id' => $this->profPrincipal->enseignant_id,
                    'nom_complet' => $this->profPrincipal->nom_complet
                ] : null;
            }),
            'eleves_count' => $this->whenLoaded('eleves', function() {
                return $this->eleves->count();
            }),
            'created_at' => $this->created_at->format('d/m/Y H:i'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i')
        ];
    }
}
