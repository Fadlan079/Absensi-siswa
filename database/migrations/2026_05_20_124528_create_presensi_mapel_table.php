<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('presensi_mapel', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mapel_id')->constrained('mapel')->cascadeOnDelete();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->date('tanggal');
            $table->tinyInteger('jam_ke'); // Jam pelajaran ke-berapa
            $table->foreignId('guru_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->unique(['mapel_id', 'kelas_id', 'tanggal', 'jam_ke']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('presensi_mapel');
    }
};
