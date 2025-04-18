<?php

namespace App\Http\Controllers;

use App\Models\Eleve;
use App\Http\Requests\StoreEleveRequest;
use App\Http\Requests\UpdateEleveRequest;
use App\Http\Resources\EleveResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class EleveController extends Controller
{
    /**
     * Affiche la liste paginée des élèves
     */
    public function index(): JsonResponse
    {
        $eleves = Eleve::with(['ecole', 'classe', 'parent', 'user'])
            ->latest()
            ->paginate(10);

        return response()->json([
            'data' => EleveResource::collection($eleves),
            'meta' => [
                'current_page' => $eleves->currentPage(),
                'total' => $eleves->total(),
                'per_page' => $eleves->perPage(),
            ]
        ]);
    }

    /**
     * Crée un nouvel élève
     */
    public function store(StoreEleveRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Gestion du fichier photo
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('eleves/photos', 'public');
        }

        $eleve = Eleve::create($data);

        return response()->json([
            'message' => 'Élève créé avec succès',
            'data' => new EleveResource($eleve->loadMissing(['ecole', 'classe', 'tuteur']))
        ], Response::HTTP_CREATED);
    }

    /**
     * Affiche les détails d'un élève
     */
    public function show(Eleve $eleve): JsonResponse
    {
        return response()->json([
            'data' => new EleveResource($eleve->loadMissing(['ecole', 'classe', 'parent', 'user']))
        ]);
    }

    /**
     * Met à jour un élève existant
     */
    public function update(UpdateEleveRequest $request, Eleve $eleve): JsonResponse
    {
        $data = $request->validated();

        // Gestion de la mise à jour de la photo
        if ($request->hasFile('photo')) {
            // Supprime l'ancienne photo si elle existe
            if ($eleve->photo) {
                Storage::disk('public')->delete($eleve->photo);
            }
            $data['photo'] = $request->file('photo')->store('eleves/photos', 'public');
        }

        $eleve->update($data);

        return response()->json([
            'message' => 'Élève mis à jour avec succès',
            'data' => new EleveResource($eleve->fresh()->loadMissing(['ecole', 'classe', 'parent']))
        ]);
    }

    /**
     * Supprime un élève
     */
    public function destroy(Eleve $eleve): JsonResponse
    {
        // Supprime la photo associée si elle existe
        if ($eleve->photo) {
            Storage::disk('public')->delete($eleve->photo);
        }

        $eleve->delete();

        return response()->json([
            'message' => 'Élève supprimé avec succès'
        ], Response::HTTP_NO_CONTENT);
    }

    /**
     * Liste les élèves d'une école spécifique
     */
    public function byEcole($ecoleId): JsonResponse
    {
        $eleves = Eleve::with(['classe', 'tuteur'])
            ->where('ecole_id', $ecoleId)
            ->paginate(10);

        return response()->json(EleveResource::collection($eleves));
    }

    /**
     * Liste les élèves d'une classe spécifique
     */
    public function byClasse($classeId): JsonResponse
    {
        $eleves = Eleve::with(['parent'])
            ->where('classe_id', $classeId)
            ->get();

        return response()->json(EleveResource::collection($eleves));
    }
}
