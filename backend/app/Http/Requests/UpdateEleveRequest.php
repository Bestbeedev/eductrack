<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEleveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ecole_id' => 'sometimes|exists:ecoles,id',
            'user_id' => 'nullable|exists:users,id',
            'classe_id' => 'sometimes|exists:classes,id',
            'parent_id' => 'sometimes|exists:parents,id',
            'nom' => 'sometimes|string|max:50',
            'prenom' => 'sometimes|string|max:50',
            'date_naissance' => 'sometimes|date|before:-6 years',
            'photo' => 'nullable|image|max:2048'
        ];
    }
}
