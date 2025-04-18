<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClasseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ecole_id' => 'sometimes|exists:ecoles,id',
            'nom_classe' => 'sometimes|string|max:50',
            'niveau' => 'sometimes|string|max:30',
            'prof_principal_id' => 'nullable|exists:enseignants,enseignant_id',
            'capacite_max' => 'nullable|integer|min:1'
        ];
    }
}
