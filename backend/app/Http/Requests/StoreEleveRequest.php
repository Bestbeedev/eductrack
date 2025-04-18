<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEleveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ecole_id' => 'required|exists:ecoles,id',
            'user_id' => 'nullable|exists:users,id',
            'classe_id' => 'required|exists:classes,id',
            'parent_id' => 'required|exists:tuteurs,id',
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'date_naissance' => 'required|date|before:-6 years',
            'photo' => 'nullable|image|max:2048'
        ];
    }
}
