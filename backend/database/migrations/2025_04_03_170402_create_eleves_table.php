<?php

use App\Models\Classe;
use App\Models\Ecole;
use App\Models\Tuteur;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('eleves', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Ecole::class)->nullable()->onDelete('cascade');
            $table->foreignIdFor(User::class)->nullable()->onDelete('cascade');
            $table->foreignIdFor(Classe::class)->nullable()->onDelete('cascade');
            $table->foreignIdFor(Tuteur::class)->nullable()->onDelete('cascade');
            $table->string('nom');
            $table->string('prenom');
            $table->date('date_naissance');
            $table->string('matricule')->unique()->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();

        });
        // Ajout d'une contrainte d'unicité sur le matricule
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eleves');
    }
};
