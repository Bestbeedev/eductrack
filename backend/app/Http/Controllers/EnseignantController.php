<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use App\Http\Requests\StoreEnseignantRequest;
use App\Http\Requests\UpdateEnseignantRequest;
use App\Http\Resources\EnseignantResource;
use Illuminate\Http\JsonResponse;

class EnseignantController extends Controller
{
    /**
     * Affiche la liste des enseignants
     */
    public function index(): JsonResponse
    {
        $enseignants = Enseignant::with(['ecole', 'user'])
            ->orderBy('nom')
            ->paginate(10);

        return response()->json(EnseignantResource::collection($enseignants));
    }

    /**
     * Crée un nouvel enseignant
     */
    public function store(StoreEnseignantRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['matricule'] = Enseignant::genererMatricule();

        $enseignant = Enseignant::create($data);

        return response()->json([
            'message' => 'Enseignant créé avec succès',
            'data' => new EnseignantResource($enseignant)
        ], 201);
    }

    /**
     * Affiche un enseignant spécifique
     */
    public function show(Enseignant $enseignant): JsonResponse
    {
        return response()->json(new EnseignantResource($enseignant->load(['ecole', 'user'])));
    }

    /**
     * Met à jour un enseignant
     */
    public function update(UpdateEnseignantRequest $request, Enseignant $enseignant): JsonResponse
    {
        $enseignant->update($request->validated());

        return response()->json([
            'message' => 'Enseignant mis à jour avec succès',
            'data' => new EnseignantResource($enseignant->fresh())
        ]);
    }

    /**
     * Supprime un enseignant
     */
    public function destroy(Enseignant $enseignant): JsonResponse
    {
        $enseignant->delete();

        return response()->json([
            'message' => 'Enseignant supprimé avec succès'
        ], 204);
    }
}
