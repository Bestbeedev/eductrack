<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EleveResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'nom_complet' => $this->nom . ' ' . $this->prenom,
            'age' => $this->date_naissance,
            'date_naissance' => $this->date_naissance,
            'photo_url' => $this->photo ? asset("storage/{$this->photo}") : null,
            'ecole' => $this->whenLoaded('ecole', fn() => [
                'id' => $this->ecole->id,
                'nom' => $this->ecole->nom
            ]),
            'classe' => $this->whenLoaded('classe', fn() => [
                'id' => $this->classe->id,
                'nom' => $this->classe->nom_classe
            ]),
            'parent' => $this->whenLoaded('tuteur', fn() => [
                'id' => $this->parent->id,
                'nom_complet' => $this->tuteur->nom . ' ' . $this->tuteur->prenom,
                'telephone' => $this->tuteur->telephone
            ]),
            'user_account' => $this->whenLoaded('user', fn() => $this->user ? [
                'id' => $this->user->id,
                'email' => $this->user->email
            ] : null),
            'created_at' => $this->created_at->format('d/m/Y H:i'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i')
        ];
    }
}
