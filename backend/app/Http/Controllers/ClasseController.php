<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Http\Requests\StoreClasseRequest;
use App\Http\Requests\UpdateClasseRequest;
use App\Http\Resources\ClasseResource;
use Illuminate\Http\JsonResponse;

class ClasseController extends Controller
{
    /**
     * Affiche la liste des classes
     */
    public function index(): JsonResponse
    {
        $classes = Classe::with(['ecole', 'profPrincipal'])
            ->orderBy('niveau')
            ->orderBy('nom_classe')
            ->paginate(10);

        return response()->json(ClasseResource::collection($classes));
    }

    /**
     * Crée une nouvelle classe
     */
    public function store(StoreClasseRequest $request): JsonResponse
    {
        $classe = Classe::create($request->validated());

        return response()->json([
            'message' => 'Classe créée avec succès',
            'data' => new ClasseResource($classe->load(['ecole', 'profPrincipal']))
        ], 201);
    }

    /**
     * Affiche une classe spécifique
     */
    public function show(Classe $classe): JsonResponse
    {
        return response()->json(
            new ClasseResource($classe->load(['ecole', 'profPrincipal', 'eleves']))
        );
    }

    /**
     * Met à jour une classe
     */
    public function update(UpdateClasseRequest $request, Classe $classe): JsonResponse
    {
        $classe->update($request->validated());

        return response()->json([
            'message' => 'Classe mise à jour avec succès',
            'data' => new ClasseResource($classe->fresh()->load(['ecole', 'profPrincipal']))
        ]);
    }

    /**
     * Supprime une classe
     */
    public function destroy(Classe $classe): JsonResponse
    {
        $classe->delete();

        return response()->json([
            'message' => 'Classe supprimée avec succès'
        ], 204);
    }

    /**
     * Liste les classes d'une école
     */
    public function byEcole($ecoleId): JsonResponse
    {
        $classes = Classe::with(['profPrincipal'])
            ->where('ecole_id', $ecoleId)
            ->get();

        return response()->json(ClasseResource::collection($classes));
    }
}
