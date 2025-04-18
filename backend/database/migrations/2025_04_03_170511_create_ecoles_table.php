<?php

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
        Schema::create('ecoles', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->enum('type', ['Privée', 'Public']);
            $table->string('email')->unique();
            $table->string('telephone');
            $table->text('adresse');
            $table->string('siteWeb')->nullable();
            $table->date('dateCreation');
            $table->string('responsable');
            $table->string('numeroEnregistrement')->unique();
            $table->string('numeroLicence')->unique();
            $table->string('region');
            $table->string('codeEcole')->unique();
            $table->enum('statut', ['Privée', 'Public']);
            $table->string('certification')->default(null);
            $table->json('infrastructure')->nullable();
            $table->string('accesTechnologie')->default(null)->nullable();
            $table->string('logo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ecoles');
    }
};
