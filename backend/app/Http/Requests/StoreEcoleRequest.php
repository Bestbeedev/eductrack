<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEcoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'type' => 'required|in:privee,public',
            'email' => 'required|email|unique:ecoles',
            'telephone' => 'required|string|max:20',
            'adresse' => 'required|string',
            'siteWeb' => 'nullable|url',
            'dateCreation' => 'required|date',
            'responsable' => 'required|string',
            'numeroEnregistrement' => 'required|string|unique:ecoles',
            'numeroLicence' => 'required|string|unique:ecoles',
            'region' => 'required|string',
            'codeEcole' => 'required|string|unique:ecoles',
            'statut' => 'required|in:privee,public',
            'certification' => 'nullable|string',
            'infrastructure' => 'nullable|json',
            'accesTechnologie' => 'nullable|string',
        ];
    }
}
