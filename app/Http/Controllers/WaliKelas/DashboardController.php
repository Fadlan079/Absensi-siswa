<?php

namespace App\Http\Controllers\WaliKelas;

use App\Http\Controllers\Controller;
use App\Models\PresensiHarian;
use App\Models\PresensiHarianDetail;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        if (!$kelas) {
            return Inertia::render('WaliKelas/Dashboard', [
                'kelas'           => null,
                'statistik'       => null,
                'presensi_recent' => [],
            ]);
        }

        $today      = Carbon::today();
        $bulanIni   = Carbon::now()->startOfMonth();

        $presensiIds = PresensiHarian::where('kelas_id', $kelas->id)
            ->where('tanggal', '>=', $bulanIni)
            ->pluck('id');

        $statistik = [
            'hadir' => PresensiHarianDetail::whereIn('presensi_id', $presensiIds)->where('status', 'hadir')->count(),
            'sakit' => PresensiHarianDetail::whereIn('presensi_id', $presensiIds)->where('status', 'sakit')->count(),
            'izin'  => PresensiHarianDetail::whereIn('presensi_id', $presensiIds)->where('status', 'izin')->count(),
            'alpha' => PresensiHarianDetail::whereIn('presensi_id', $presensiIds)->where('status', 'alpha')->count(),
        ];

        $presensiRecent = PresensiHarian::where('kelas_id', $kelas->id)
            ->with('detail', 'pembuat')
            ->orderByDesc('tanggal')
            ->take(10)
            ->get()
            ->map(fn($p) => [
                'id'      => $p->id,
                'tanggal' => $p->tanggal->format('d/m/Y'),
                'hadir'   => $p->detail->where('status', 'hadir')->count(),
                'alpha'   => $p->detail->where('status', 'alpha')->count(),
                'total'   => $p->detail->count(),
                'oleh'    => $p->pembuat?->name ?? '-',
            ]);

        return Inertia::render('WaliKelas/Dashboard', [
            'kelas'           => ['nama' => "{$kelas->nama_kelas} {$kelas->jurusan}"],
            'statistik'       => $statistik,
            'presensi_recent' => $presensiRecent,
        ]);
    }
}
