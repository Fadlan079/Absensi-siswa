<?php

namespace App\Http\Controllers\KepalaSekolah;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\PresensiHarian;
use App\Models\PresensiHarianDetail;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RankingController extends Controller
{
    public function index()
    {
        $bulan  = (int) request('bulan', Carbon::now()->month);
        $tahun  = (int) request('tahun', Carbon::now()->year);
        $kelasFilter = request('kelas_id');

        // Ambil semua presensi bulan ini
        $query = PresensiHarian::whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun);

        if ($kelasFilter) {
            $query->where('kelas_id', $kelasFilter);
        }

        $presensiIds = $query->pluck('id');

        // Ranking siswa berdasarkan alpha terbanyak
        $ranking = Student::with('kelasInfo')
            ->when($kelasFilter, fn($q) => $q->where('kelas_id', $kelasFilter))
            ->get()
            ->map(function ($s) use ($presensiIds) {
                $detail = PresensiHarianDetail::where('siswa_id', $s->id)
                    ->whereIn('presensi_id', $presensiIds)->get();
                return [
                    'id'    => $s->id,
                    'nama'  => $s->nama,
                    'nis'   => $s->nis,
                    'kelas' => $s->kelasInfo ? "{$s->kelasInfo->nama_kelas} {$s->kelasInfo->jurusan}" : '-',
                    'hadir' => $detail->where('status', 'hadir')->count(),
                    'sakit' => $detail->where('status', 'sakit')->count(),
                    'izin'  => $detail->where('status', 'izin')->count(),
                    'alpha' => $detail->where('status', 'alpha')->count(),
                    'total' => $detail->count(),
                    'persen'=> $detail->count() > 0
                        ? round(($detail->where('status', 'hadir')->count() / $detail->count()) * 100, 1)
                        : 0,
                ];
            })
            ->sortBy('alpha')
            ->values();

        // Statistik per kelas
        $kelasList = Kelas::all(['id', 'nama_kelas', 'jurusan']);

        $statsPerKelas = $kelasList->map(function ($k) use ($bulan, $tahun) {
            $ids = PresensiHarian::where('kelas_id', $k->id)
                ->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun)
                ->pluck('id');
            $detail = PresensiHarianDetail::whereIn('presensi_id', $ids)->get();
            $total  = $detail->count();
            return [
                'nama'   => "{$k->nama_kelas} {$k->jurusan}",
                'hadir'  => $detail->where('status', 'hadir')->count(),
                'alpha'  => $detail->where('status', 'alpha')->count(),
                'persen' => $total > 0 ? round(($detail->where('status', 'hadir')->count() / $total) * 100, 1) : 0,
            ];
        });

        return Inertia::render('KepalaSekolah/Ranking', [
            'ranking'       => $ranking->take(50),
            'stats_kelas'   => $statsPerKelas,
            'kelas_list'    => $kelasList->map(fn($k) => ['id' => $k->id, 'nama' => "{$k->nama_kelas} {$k->jurusan}"]),
            'bulan'         => $bulan,
            'tahun'         => $tahun,
            'kelas_filter'  => $kelasFilter,
        ]);
    }
}
