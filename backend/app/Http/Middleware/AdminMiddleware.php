<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Vérification de l'authentification
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Authentification requise'
            ], Response::HTTP_UNAUTHORIZED); // 401
        }

        // Vérification du rôle admin
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'message' => 'Accès refusé. Privilèges insuffisants'
            ], Response::HTTP_FORBIDDEN); // 403
        }

        return $next($request);
    }
}
