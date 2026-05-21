<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use App\Models\Kelas;
use Faker\Factory as Faker;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $kelasList = Kelas::all();

        if ($kelasList->isEmpty()) {
            $this->command->warn('⚠️ KelasSeeder harus dijalankan terlebih dahulu sebelum StudentSeeder!');
            return;
        }

        foreach ($kelasList as $kelas) {
            for ($i = 0; $i < 10; $i++) {
                // Tentukan jenis kelamin secara acak
                $gender = $faker->randomElement(['L', 'P']);
                
                // Cari nama yang sesuai dengan gender (Faker Indonesia kadangkala mendukung gender)
                $nama = $gender === 'L' ? $faker->name('male') : $faker->name('female');
                // Hapus gelar seperti S.Pd, S.Kom jika ada agar terlihat seperti nama siswa SMA/SMK
                $nama = preg_replace('/^(dr\.|H\.|Hj\.)\s+/i', '', $nama);
                $nama = preg_replace('/,\s*(S\.Pd|S\.Kom|M\.Pd|S\.E|S\.T|A\.Md|S\.Si|S\.H|S\.IP)$/i', '', $nama);
                $nama = strtoupper($nama);

                // Buat NISN unik 10 digit (misal dimulai dari 009 atau 010)
                $nisn = '00' . $faker->unique()->numerify('########');
                
                // Buat NIS unik 8 digit
                $nis = $faker->unique()->numerify('24######');

                Student::create([
                    'nis' => $nis,
                    'nisn' => $nisn,
                    'nama' => $nama,
                    'jenis_kelamin' => $gender,
                    'kelas_id' => $kelas->id,
                    'kelas' => $kelas->nama_kelas,
                    'jurusan' => $kelas->jurusan,
                ]);
            }
        }
    }
}
