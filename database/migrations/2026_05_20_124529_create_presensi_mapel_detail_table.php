<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('presensi_mapel_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('presensi_mapel_id')->constrained('presensi_mapel')->cascadeOnDelete();
            $table->foreignId('siswa_id')->constrained('students')->cascadeOnDelete();
            $table->enum('status', ['hadir', 'sakit', 'izin', 'alpha'])->default('alpha');
            $table->timestamps();

            $table->unique(['presensi_mapel_id', 'siswa_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('presensi_mapel_detail');
    }
};
