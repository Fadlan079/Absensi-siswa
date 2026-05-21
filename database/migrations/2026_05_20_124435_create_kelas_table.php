<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kelas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kelas', 10); // X, XI, XII
            $table->string('jurusan', 30);    // PPLG, TJKT, DKV, MPLB
            $table->foreignId('wali_kelas_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->unique(['nama_kelas', 'jurusan']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kelas');
    }
};
