<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEcoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:privee,public',
            'email' => 'sometimes|email|unique:ecoles,email,'.$this->ecole->id,
            'telephone' => 'sometimes|string|max:20',
            'adresse' => 'sometimes|string',
            'siteWeb' => 'nullable|url',
            'dateCreation' => 'sometimes|date',
            'responsable' => 'sometimes|string',
            'numeroEnregistrement' => 'sometimes|string|unique:ecoles,numeroEnregistrement,'.$this->ecole->id,
            'numeroLicence' => 'sometimes|string|unique:ecoles,numeroLicence,'.$this->ecole->id,
            'region' => 'sometimes|string',
            'codeEcole' => 'sometimes|string|unique:ecoles,codeEcole,'.$this->ecole->id.'|size:6',
            'statut' => 'sometimes|in:privee,public',
            'certification' => 'sometimes|boolean',
            'infrastructure' => 'nullable|json',
            'accesTechnologie' => 'sometimes|boolean',
        ];
    }
}
