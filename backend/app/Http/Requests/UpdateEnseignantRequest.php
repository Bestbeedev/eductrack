<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEnseignantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'ecole_id' => 'sometimes|exists:ecoles,id',
            'nom' => 'sometimes|string|max:50',
            'prenom' => 'sometimes|string|max:50',
            'specialite' => 'sometimes|string|max:100'
        ];
    }
}
