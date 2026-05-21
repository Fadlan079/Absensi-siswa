<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->string('nis', 20)->nullable()->unique()->after('id');
            $table->enum('jenis_kelamin', ['L', 'P'])->default('L')->after('nama');
            $table->foreignId('kelas_id')->nullable()->constrained('kelas')->nullOnDelete()->after('jenis_kelamin');
            // kolom kelas & jurusan (VARCHAR) dibiarkan dulu untuk backward-compat, bisa di-drop nanti
        });
    }

    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropForeign(['kelas_id']);
            $table->dropColumn(['nis', 'jenis_kelamin', 'kelas_id']);
        });
    }
};
