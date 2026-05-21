<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Kelas;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Sistem Dasar
        User::firstOrCreate(
            ['email' => 'admin@portalpresensi.com'],
            ['name' => 'Admin', 'password' => Hash::make('password'), 'role' => 'admin']
        );

        User::firstOrCreate(
            ['email' => 'kepsek@portalpresensi.com'],
            ['name' => 'Kepala Sekolah', 'password' => Hash::make('password'), 'role' => 'kepala_sekolah']
        );

        User::firstOrCreate(
            ['email' => 'piket@portalpresensi.com'],
            ['name' => 'Guru Piket', 'password' => Hash::make('password'), 'role' => 'guru_piket']
        );

        // Ambil kelas XI PPLG (default untuk Wali Kelas dan Sekretaris Kelas)
        $kelasXIPplg = Kelas::where('nama_kelas', 'XI')->where('jurusan', 'PPLG')->first();

        $waliKelas = User::firstOrCreate(
            ['email' => 'walikelas@portalpresensi.com'],
            [
                'name' => 'Wali Kelas',
                'password' => Hash::make('password'),
                'role' => 'wali_kelas',
                'kelas_id' => $kelasXIPplg ? $kelasXIPplg->id : null
            ]
        );

        // Update wali_kelas_id di tabel kelas untuk XI PPLG
        if ($kelasXIPplg && $waliKelas) {
            $kelasXIPplg->update(['wali_kelas_id' => $waliKelas->id]);
        }

        User::firstOrCreate(
            ['email' => 'sekretaris@portalpresensi.com'],
            [
                'name' => 'Sekretaris Kelas',
                'password' => Hash::make('password'),
                'role' => 'sekretaris',
                'kelas_id' => $kelasXIPplg ? $kelasXIPplg->id : null
            ]
        );

        // 2. Data Guru Mapel
        $gurus = [
            'Guru Mapel 1',
            'Guru Mapel 2',
            'Guru Mapel 3',
            'Guru Mapel 4',
            'Guru Mapel 5',
        ];

        foreach ($gurus as $index => $guruName) {
            $num = $index + 1;
            User::firstOrCreate(
                ['name' => $guruName],
                [
                    'email' => "gurumapel{$num}@portalpresensi.com",
                    'password' => Hash::make('password'),
                    'role' => 'guru_mapel'
                ]
            );
        }
    }
}
