<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClasseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ecole_id' => 'required|exists:ecoles,id',
            'nom_classe' => 'required|string|max:50',
            'niveau' => 'required|string|max:30',
            'enseigant_enseignant_id' => 'nullable|exists:enseignants,id',
            'capacite_max' => 'nullable|integer|min:1'
        ];
    }
}
