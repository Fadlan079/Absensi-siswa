<?php

namespace App\Http\Controllers\KepalaSekolah;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\PresensiHarian;
use App\Models\PresensiHarianDetail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $bulanIni = Carbon::now()->startOfMonth();

        // Statistik kehadiran bulan ini per kelas
        $statistikKelas = Kelas::with('siswa')
            ->get()
            ->map(function ($kelas) use ($bulanIni) {
                $totalSiswa = $kelas->siswa->count();
                $presensiIds = PresensiHarian::where('kelas_id', $kelas->id)
                    ->where('tanggal', '>=', $bulanIni)
                    ->pluck('id');

                $totalDetail = PresensiHarianDetail::whereIn('presensi_id', $presensiIds)->count();
                $totalHadir = PresensiHarianDetail::whereIn('presensi_id', $presensiIds)
                    ->where('status', 'hadir')->count();

                return [
                    'kelas'       => "{$kelas->nama_kelas} {$kelas->jurusan}",
                    'total_siswa' => $totalSiswa,
                    'hadir'       => $totalHadir,
                    'persen'      => $totalDetail > 0 ? round(($totalHadir / $totalDetail) * 100, 1) : 0,
                ];
            })
            ->sortByDesc('persen')
            ->values();

        // Kelas belum absen hari ini
        $absenHariIni = PresensiHarian::whereDate('tanggal', $today)->pluck('kelas_id');
        $kelasBelumAbsen = Kelas::whereNotIn('id', $absenHariIni)
            ->get(['id', 'nama_kelas', 'jurusan'])
            ->map(fn($k) => ['nama' => "{$k->nama_kelas} {$k->jurusan}"]);

        // Grafik kehadiran 30 hari terakhir
        $grafikHarian = PresensiHarian::with('detail')
            ->where('tanggal', '>=', Carbon::now()->subDays(29))
            ->get()
            ->groupBy(fn($p) => $p->tanggal->format('Y-m-d'))
            ->map(function ($group, $tanggal) {
                $hadir = $group->sum(fn($p) => $p->detail->where('status', 'hadir')->count());
                $total = $group->sum(fn($p) => $p->detail->count());
                return [
                    'tanggal' => $tanggal,
                    'hadir'   => $hadir,
                    'total'   => $total,
                    'persen'  => $total > 0 ? round(($hadir / $total) * 100) : 0,
                ];
            })
            ->values();

        return Inertia::render('KepalaSekolah/Dashboard', [
            'statistik_kelas'   => $statistikKelas,
            'kelas_belum_absen' => $kelasBelumAbsen,
            'grafik_harian'     => $grafikHarian,
            'tanggal'           => $today->isoFormat('dddd, D MMMM Y'),
        ]);
    }
}
