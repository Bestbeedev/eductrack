<?php

namespace App\Http\Resources;

use App\Models\Enseignant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EcoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'type' => $this->type,
            'email' => $this->email,
            'telephone' => $this->telephone,
            'adresse' => $this->adresse,
            'siteWeb' => $this->siteWeb,
            'dateCreation' => $this->dateCreation,
            'responsable' => $this->responsable,
            'numeroEnregistrement' => $this->numeroEnregistrement,
            'numeroLicence' => $this->numeroLicence,
            'region' => $this->region,
            'codeEcole' => $this->codeEcole,
            'statut' => $this->statut,
            'certification' => (bool)$this->certification,
            'infrastructure' => json_decode($this->infrastructure, true),
            'accesTechnologie' => (bool)$this->accesTechnologie,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),

            // Relations éventuelles
            'classes' => ClasseResource::collection($this->whenLoaded('classes')),
            'enseignants' => EnseignantResource::collection($this->whenLoaded('enseignants')),
        ];
    }
}
