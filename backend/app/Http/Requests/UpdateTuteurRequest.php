<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTuteurRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'lien_avec_eleve' => 'sometimes|in:père,mère,tuteur',
            'profession' => 'nullable|string|max:100',
            'telephone' => 'sometimes|string|max:20',
            'adresse' => 'nullable|string'
        ];
    }
}
