<?php

namespace App\Http\Controllers;

use App\Models\Tuteur;
use App\Http\Requests\StoreTuteurRequest;
use App\Http\Requests\UpdateTuteurRequest;
use App\Http\Resources\TuteurResource;
use Illuminate\Http\JsonResponse;

class TuteurController extends Controller
{
    public function index(): JsonResponse
    {
        $parents = Tuteur::with(['user', 'eleves'])
            ->orderBy('lien_avec_eleve')
            ->paginate(10);

        return response()->json(TuteurResource::collection($parents));
    }

    public function store(StoreTuteurRequest $request): JsonResponse
    {
        $parent = Tuteur::create($request->validated());

        return response()->json([
            'message' => 'Parent/tuteur créé avec succès',
            'data' => new TuteurResource($parent->load(['user']))
        ], 201);
    }

    public function show(Tuteur $parent): JsonResponse
    {
        return response()->json(
            new TuteurResource($parent->load(['user', 'eleves']))
        );
    }

    public function update(UpdateTuteurRequest $request, Tuteur $parent): JsonResponse
    {
        $parent->update($request->validated());

        return response()->json([
            'message' => 'Parent/tuteur mis à jour avec succès',
            'data' => new TuteurResource($parent->fresh()->load(['user']))
        ]);
    }

    public function destroy(Tuteur $parent): JsonResponse
    {
        $parent->delete();

        return response()->json([
            'message' => 'Parent/tuteur supprimé avec succès'
        ], 204);
    }
}
