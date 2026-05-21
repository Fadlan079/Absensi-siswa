<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Langkah 1: Ubah kolom role menjadi VARCHAR sementara agar bisa diupdate bebas
        DB::statement("ALTER TABLE `users` MODIFY `role` VARCHAR(50) NOT NULL DEFAULT 'guru_mapel'");

        // Langkah 2: Update nilai role lama ke nilai baru
        DB::table('users')->where('role', 'guru')->update(['role' => 'guru_mapel']);
        DB::table('users')->whereNull('role')->update(['role' => 'admin']);
        DB::table('users')->whereNotIn('role', [
            'admin','kepala_sekolah','wali_kelas','sekretaris','guru_mapel','guru_piket'
        ])->update(['role' => 'guru_mapel']);

        // Langkah 3: Ubah kembali ke ENUM dengan nilai-nilai baru
        DB::statement("ALTER TABLE `users` MODIFY `role` ENUM('admin','kepala_sekolah','wali_kelas','sekretaris','guru_mapel','guru_piket') NOT NULL DEFAULT 'guru_mapel'");

        // Langkah 4: Tambahkan kolom kelas_id
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('kelas_id')->nullable()->constrained('kelas')->nullOnDelete()->after('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['kelas_id']);
            $table->dropColumn('kelas_id');
        });
        DB::statement("ALTER TABLE `users` MODIFY `role` VARCHAR(50) NOT NULL DEFAULT 'guru'");
    }
};

