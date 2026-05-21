<?php

namespace App\Http\Controllers\WaliKelas;

use App\Http\Controllers\Controller;
use App\Models\PresensiHarian;
use App\Models\PresensiHarianDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RekapController extends Controller
{
    public function bulanan()
    {
        $user  = auth()->user();
        $kelas = $user->kelas;
        $bulan = (int) request('bulan', Carbon::now()->month);
        $tahun = (int) request('tahun', Carbon::now()->year);

        if (!$kelas) {
            return redirect()->route('wali_kelas.dashboard')
                ->with('error', 'Anda belum ditugaskan ke kelas.');
        }

        $presensiIds = PresensiHarian::where('kelas_id', $kelas->id)
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->pluck('id');

        $siswaRekap = $kelas->siswa->map(function ($siswa) use ($presensiIds) {
            $detail = PresensiHarianDetail::where('siswa_id', $siswa->id)
                ->whereIn('presensi_id', $presensiIds)
                ->get();

            return [
                'id'    => $siswa->id,
                'nama'  => $siswa->nama,
                'nis'   => $siswa->nis,
                'hadir' => $detail->where('status', 'hadir')->count(),
                'sakit' => $detail->where('status', 'sakit')->count(),
                'izin'  => $detail->where('status', 'izin')->count(),
                'alpha' => $detail->where('status', 'alpha')->count(),
                'total' => $detail->count(),
                'persen'=> $detail->count() > 0
                    ? round(($detail->where('status', 'hadir')->count() / $detail->count()) * 100, 1)
                    : 0,
            ];
        })->sortBy('nama')->values();

        $totalHari = PresensiHarian::where('kelas_id', $kelas->id)
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->count();

        return Inertia::render('WaliKelas/Rekap/Bulanan', [
            'kelas'      => ['id' => $kelas->id, 'nama' => "{$kelas->nama_kelas} {$kelas->jurusan}"],
            'rekap'      => $siswaRekap,
            'bulan'      => $bulan,
            'tahun'      => $tahun,
            'total_hari' => $totalHari,
        ]);
    }

    public function semester()
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        // Semester 1: Juli-Desember, Semester 2: Januari-Juni
        $now = Carbon::now();
        $semester = request('semester', $now->month >= 7 ? 1 : 2);
        $tahun    = (int) request('tahun', $now->year);

        $bulanRange = $semester == 1
            ? [7, 8, 9, 10, 11, 12]
            : [1, 2, 3, 4, 5, 6];

        if (!$kelas) {
            return redirect()->route('wali_kelas.dashboard')
                ->with('error', 'Anda belum ditugaskan ke kelas.');
        }

        $presensiIds = PresensiHarian::where('kelas_id', $kelas->id)
            ->whereYear('tanggal', $tahun)
            ->whereIn(\Illuminate\Support\Facades\DB::raw('MONTH(tanggal)'), $bulanRange)
            ->pluck('id');

        $siswaRekap = $kelas->siswa->map(function ($siswa) use ($presensiIds) {
            $detail = PresensiHarianDetail::where('siswa_id', $siswa->id)
                ->whereIn('presensi_id', $presensiIds)->get();
            return [
                'nama'  => $siswa->nama,
                'nis'   => $siswa->nis,
                'hadir' => $detail->where('status', 'hadir')->count(),
                'sakit' => $detail->where('status', 'sakit')->count(),
                'izin'  => $detail->where('status', 'izin')->count(),
                'alpha' => $detail->where('status', 'alpha')->count(),
                'total' => $detail->count(),
            ];
        })->sortBy('nama')->values();

        return Inertia::render('WaliKelas/Rekap/Semester', [
            'kelas'    => ['nama' => "{$kelas->nama_kelas} {$kelas->jurusan}"],
            'rekap'    => $siswaRekap,
            'semester' => (int) $semester,
            'tahun'    => $tahun,
        ]);
    }
}
