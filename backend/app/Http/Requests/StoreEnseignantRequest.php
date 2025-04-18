<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEnseignantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'ecole_id' => 'required|exists:ecoles,id',
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'specialite' => 'required|string|max:100'
        ];
    }
}

    // public function messages(): array
    // {
    //     return [
    //         'user_id.exists' => 'L\'utilisateur sélectionné n\'existe pas.',
    //         'ecole_id.required' => 'L\'école est requise.',
    //         'ecole_id.exists' => 'L\'école sélectionnée n\'existe pas.',
    //         'nom.required' => 'Le nom est requis.',
    //         'prenom.required' => 'Le prénom est requis.',
    //         'specialite.required' => 'La spécialité est requise.'
    //     ];
    // }

