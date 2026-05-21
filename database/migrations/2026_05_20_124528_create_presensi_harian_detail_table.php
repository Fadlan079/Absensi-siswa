<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('presensi_harian_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('presensi_id')->constrained('presensi_harian')->cascadeOnDelete();
            $table->foreignId('siswa_id')->constrained('students')->cascadeOnDelete();
            $table->enum('status', ['hadir', 'sakit', 'izin', 'alpha'])->default('alpha');
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->unique(['presensi_id', 'siswa_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('presensi_harian_detail');
    }
};
