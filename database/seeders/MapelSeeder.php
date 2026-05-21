<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mapel;
use App\Models\User;

class MapelSeeder extends Seeder
{
    public function run(): void
    {
        $mapels = [
            ['1A', 'Informatika', 'Guru Mapel 1'],
            ['2A', 'Teknik Jaringan Komputer dan Telekomunikasi', 'Guru Mapel 2'],
            ['3A', 'Matematika', 'Guru Mapel 3'],
            ['4B', 'Kreatif Inovasi dan Kewirausahaan', 'Guru Mapel 4'],
            ['4C', 'Otomatisasi Report Menggunakan Excel & Word', 'Guru Mapel 4'],
            ['4D', 'P5 X MPLB', 'Guru Mapel 4'],
            ['5A', 'Dasar-dasar MPLB', 'Guru Mapel 5'],
            ['6A', 'Manajemen Perkantoran dan Layanan Bisnis', 'Guru Mapel 1'],
            ['7A', 'Dasar-dasar PPLG', 'Guru Mapel 2'],
            ['8A', 'Dasar-dasar DKV', 'Guru Mapel 3'],
            ['9A', 'Desain Komunikasi Visual', 'Guru Mapel 4'],
            ['10A', 'Sejarah', 'Guru Mapel 5'],
            ['12A', 'Bahasa Inggris', 'Guru Mapel 1'],
            ['13A', 'Bahasa Indonesia', 'Guru Mapel 2'],
            ['14A', 'Pendidikan Agama Islam dan Budi Pekerti', 'Guru Mapel 3'],
            ['15A', 'Dasar-dasar TJKT', 'Guru Mapel 4'],
            ['16A', 'Bahasa Indonesia', 'Guru Mapel 2'],
            ['17A', 'Proyek Ilmu Pengetahuan Alam dan Sosial', 'Guru Mapel 5'],
            ['18A', 'Pendidikan Jasmani, Olahraga dan Kesehatan', 'Guru Mapel 1'],
            ['19A', 'Pendidikan Agama Katolik dan Budi Pekerti', 'Guru Mapel 3'],
            ['20A', 'Pendidikan Agama Kristen dan Budi Pekerti', 'Guru Mapel 3'],
            ['21A', 'Pendidikan Pancasila dan Kewarganegaraan', 'Guru Mapel 5'],
            ['22A', 'Pendidikan Agama Buddha dan Budi Pekerti', 'Guru Mapel 3'],
            ['23A', 'Dasar-Dasar PPLG', 'Guru Mapel 2'],
            ['24A', 'Konsentrasi DKV', 'Guru Mapel 4'],
            ['25A', 'Konsentrasi PPLG', 'Guru Mapel 2'],
        ];

        foreach ($mapels as $mapel) {
            $guru = User::where('name', $mapel[2])->first();
            
            Mapel::updateOrCreate(
                ['kode_mapel' => $mapel[0]],
                [
                    'nama_mapel' => $mapel[1],
                    'guru_id' => $guru ? $guru->id : null,
                ]
            );
        }
    }
}
