<?php

namespace App\Http\Controllers;

use App\Models\Ecole;
use App\Http\Requests\StoreEcoleRequest;
use App\Http\Requests\UpdateEcoleRequest;
use App\Http\Resources\EcoleResource;
use Illuminate\Http\Response;

class EcoleController extends Controller
{
    /**
     * Affiche la liste paginée des écoles
     */
    public function index()
    {
        $ecoles = Ecole::query()
            ->with(['classes', 'enseignants'])
            ->paginate(10);

        return EcoleResource::collection($ecoles);
    }

    /**
     * Affiche les détails d'une école spécifique
     */
    public function show(Ecole $ecole)
    {
        $ecole->load(['classes', 'enseignants']);
        return new EcoleResource($ecole);
    }

    /**
     * Crée une nouvelle école
     */
    public function store(StoreEcoleRequest $request)
    {
        $data = $request->validated();
        $data['infrastructure'] = json_encode($data['infrastructure'] ?? []);

        $ecole = Ecole::create($data);

        return response()->json([
            'message' => 'École créée avec succès',
            'data' => new EcoleResource($ecole)
        ], Response::HTTP_CREATED);
    }

    /**
     * Met à jour une école existante
     */
    public function update(UpdateEcoleRequest $request, Ecole $ecole)
    {
        $data = $request->validated();

        if (isset($data['infrastructure'])) {
            $data['infrastructure'] = json_encode($data['infrastructure']);
        }

        $ecole->update($data);

        return new EcoleResource($ecole->fresh());
    }

    /**
     * Supprime une école
     */
    public function destroy(Ecole $ecole)
    {
        $ecole->delete();

        return response()->json([
            'message' => 'École supprimée avec succès'
        ], Response::HTTP_NO_CONTENT);
    }
}
