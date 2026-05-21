<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kelas;

class KelasSeeder extends Seeder
{
    public function run(): void
    {
        $kelasList = [
            ['nama_kelas' => 'X', 'jurusan' => 'PPLG'],
            ['nama_kelas' => 'X', 'jurusan' => 'TJKT'],
            ['nama_kelas' => 'X', 'jurusan' => 'DKV'],
            ['nama_kelas' => 'X', 'jurusan' => 'MPLB'],
            ['nama_kelas' => 'XI', 'jurusan' => 'PPLG'],
            ['nama_kelas' => 'XI', 'jurusan' => 'TJKT'],
            ['nama_kelas' => 'XI', 'jurusan' => 'DKV'],
            ['nama_kelas' => 'XI', 'jurusan' => 'MPLB'],
        ];

        foreach ($kelasList as $kelas) {
            Kelas::firstOrCreate(['nama_kelas' => $kelas['nama_kelas'], 'jurusan' => $kelas['jurusan']], $kelas);
        }
    }
}
