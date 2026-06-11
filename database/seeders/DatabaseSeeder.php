<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            KelasSeeder::class,
            UserSeeder::class,
            MapelSeeder::class,
            StudentSeeder::class,
            PresensiSeeder::class,
        ]);
        
        $this->command->info('✅ Seluruh seeder (User, Kelas, Mapel, Student, Presensi) berhasil dijalankan!');
    }
}
