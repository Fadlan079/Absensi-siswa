<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\PresensiHarian;
use App\Models\PresensiHarianDetail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PresensiSeeder extends Seeder
{
    public function run(): void
    {
        $kelasList = Kelas::with('siswa')->get();
        $user = User::first(); // First user to act as creator if needed

        if ($kelasList->isEmpty()) {
            $this->command->warn('⚠️ KelasSeeder dan StudentSeeder harus dijalankan terlebih dahulu!');
            return;
        }

        $this->command->info('⏳ Memulai seeding data presensi untuk 30 hari terakhir...');

        // Loop through the last 30 days
        for ($i = 29; $i >= 0; $i--) {
            $tanggal = Carbon::today()->subDays($i);

            // Skip weekends (Saturday and Sunday)
            if ($tanggal->isWeekend()) {
                continue;
            }

            foreach ($kelasList as $kelas) {
                $students = $kelas->siswa;

                if ($students->isEmpty()) {
                    continue;
                }

                // Create daily attendance header
                $presensi = PresensiHarian::firstOrCreate(
                    [
                        'kelas_id' => $kelas->id,
                        'tanggal'  => $tanggal->toDateString(),
                    ],
                    [
                        'created_by' => $user?->id,
                    ]
                );

                foreach ($students as $student) {
                    // Probability distribution for student status:
                    // 85% Hadir, 7% Sakit, 5% Izin, 3% Alpha
                    $rand = rand(1, 100);
                    if ($rand <= 85) {
                        $status = 'hadir';
                    } elseif ($rand <= 92) {
                        $status = 'sakit';
                    } elseif ($rand <= 97) {
                        $status = 'izin';
                    } else {
                        $status = 'alpha';
                    }

                    PresensiHarianDetail::firstOrCreate(
                        [
                            'presensi_id' => $presensi->id,
                            'siswa_id'    => $student->id,
                        ],
                        [
                            'status'   => $status,
                            'catatan'  => $status !== 'hadir' ? 'Keterangan demo presensi' : null,
                        ]
                    );
                }
            }
        }

        $this->command->info('✅ Seeding data presensi harian 30 hari terakhir berhasil!');
    }
}
