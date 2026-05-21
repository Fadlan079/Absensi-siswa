<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PublicInfoController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();
        $threeMonthsAgo = now()->subMonths(3)->toDateString();
        $startOfMonth = now()->startOfMonth()->toDateString();
        $endOfMonth = now()->endOfMonth()->toDateString();

        // 1. Leaderboard 3 Bulan Terakhir
        $leaderboard = DB::table('kelas')
            ->select('kelas.id', 'kelas.nama_kelas', 'kelas.jurusan')
            ->leftJoin('presensi_harian', 'kelas.id', '=', 'presensi_harian.kelas_id')
            ->leftJoin('presensi_harian_detail', 'presensi_harian.id', '=', 'presensi_harian_detail.presensi_id')
            ->where('presensi_harian.tanggal', '>=', $threeMonthsAgo)
            ->selectRaw('COUNT(presensi_harian_detail.id) as total_absensi')
            ->selectRaw('SUM(CASE WHEN presensi_harian_detail.status = "hadir" THEN 1 ELSE 0 END) as total_hadir')
            ->groupBy('kelas.id', 'kelas.nama_kelas', 'kelas.jurusan')
            ->get()
            ->map(function ($item) {
                $item->persentase = $item->total_absensi > 0 
                    ? round(($item->total_hadir / $item->total_absensi) * 100, 2) 
                    : 0;
                return $item;
            })
            ->sortByDesc('persentase')
            ->values()
            ->take(10); // Ambil Top 10

        // 2. Rekap Kehadiran Kelas Hari Ini
        $kehadiranHariIni = DB::table('kelas')
            ->select('kelas.id', 'kelas.nama_kelas', 'kelas.jurusan')
            ->leftJoin('presensi_harian', function ($join) use ($today) {
                $join->on('kelas.id', '=', 'presensi_harian.kelas_id')
                     ->where('presensi_harian.tanggal', '=', $today);
            })
            ->leftJoin('presensi_harian_detail', 'presensi_harian.id', '=', 'presensi_harian_detail.presensi_id')
            ->selectRaw('SUM(CASE WHEN presensi_harian_detail.status = "hadir" THEN 1 ELSE 0 END) as hadir')
            ->selectRaw('SUM(CASE WHEN presensi_harian_detail.status = "sakit" THEN 1 ELSE 0 END) as sakit')
            ->selectRaw('SUM(CASE WHEN presensi_harian_detail.status = "izin" THEN 1 ELSE 0 END) as izin')
            ->selectRaw('SUM(CASE WHEN presensi_harian_detail.status = "alpha" THEN 1 ELSE 0 END) as alpha')
            ->groupBy('kelas.id', 'kelas.nama_kelas', 'kelas.jurusan')
            ->orderBy('kelas.nama_kelas')
            ->orderBy('kelas.jurusan')
            ->get();

        // 3. Keterlambatan Hari Ini
        $keterlambatan = DB::table('keterlambatan')
            ->join('students', 'keterlambatan.siswa_id', '=', 'students.id')
            ->join('kelas', 'students.kelas_id', '=', 'kelas.id')
            ->where('keterlambatan.tanggal', '=', $today)
            ->select(
                'students.nama as nama_siswa', 
                'kelas.nama_kelas', 
                'kelas.jurusan', 
                'keterlambatan.jam_datang', 
                'keterlambatan.alasan',
                'keterlambatan.sanksi'
            )
            ->orderBy('keterlambatan.jam_datang', 'desc')
            ->get();

        // 4. Rekap Kehadiran Siswa per Kelas (Bulan Berjalan)
        $rekapSiswa = DB::table('students')
            ->join('kelas', 'students.kelas_id', '=', 'kelas.id')
            ->leftJoin('presensi_harian_detail', 'students.id', '=', 'presensi_harian_detail.siswa_id')
            ->leftJoin('presensi_harian', function ($join) use ($startOfMonth, $endOfMonth) {
                $join->on('presensi_harian_detail.presensi_id', '=', 'presensi_harian.id')
                     ->whereBetween('presensi_harian.tanggal', [$startOfMonth, $endOfMonth]);
            })
            ->select(
                'students.id',
                'students.nama',
                'students.nisn',
                'kelas.nama_kelas',
                'kelas.jurusan',
                DB::raw('SUM(CASE WHEN presensi_harian_detail.status = "hadir" THEN 1 ELSE 0 END) as hadir'),
                DB::raw('SUM(CASE WHEN presensi_harian_detail.status = "sakit" THEN 1 ELSE 0 END) as sakit'),
                DB::raw('SUM(CASE WHEN presensi_harian_detail.status = "izin" THEN 1 ELSE 0 END) as izin'),
                DB::raw('SUM(CASE WHEN presensi_harian_detail.status = "alpha" THEN 1 ELSE 0 END) as alpha')
            )
            ->groupBy('students.id', 'students.nama', 'students.nisn', 'kelas.nama_kelas', 'kelas.jurusan')
            ->orderBy('kelas.nama_kelas')
            ->orderBy('kelas.jurusan')
            ->orderBy('students.nama')
            ->get()
            ->groupBy(function($item) {
                return $item->nama_kelas . ' ' . $item->jurusan;
            });

        return Inertia::render('Public/Dashboard', [
            'leaderboard' => $leaderboard,
            'kehadiranHariIni' => $kehadiranHariIni,
            'keterlambatan' => $keterlambatan,
            'rekapSiswa' => $rekapSiswa,
            'terakhirDiperbarui' => now()->toIso8601String(),
        ]);
    }
}
