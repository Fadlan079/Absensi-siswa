<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Student;
use App\Models\User;
use App\Models\PresensiHarian;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        // Statistik utama
        $totalSiswa   = Student::count();
        $totalKelas   = Kelas::count();
        $totalGuru    = User::whereIn('role', ['guru_mapel', 'guru_piket', 'wali_kelas', 'sekretaris'])->count();
        $totalMapel   = Mapel::count();

        // Kelas yang sudah absen hari ini
        $kelasAbsenHariIni = PresensiHarian::whereDate('tanggal', $today)->pluck('kelas_id');
        $kelasBelumAbsen   = Kelas::whereNotIn('id', $kelasAbsenHariIni)->count();

        // Daftar kelas belum absen
        $daftarBelumAbsen = Kelas::with('waliKelas')
            ->whereNotIn('id', $kelasAbsenHariIni)
            ->get()
            ->map(fn($k) => [
                'id'         => $k->id,
                'nama_kelas' => $k->nama_kelas,
                'jurusan'    => $k->jurusan,
                'wali_kelas' => $k->waliKelas?->name,
            ]);

        // Daftar user terbaru
        $userTerbaru = User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_siswa'       => $totalSiswa,
                'total_kelas'       => $totalKelas,
                'total_guru'        => $totalGuru,
                'total_mapel'       => $totalMapel,
                'kelas_belum_absen' => $kelasBelumAbsen,
            ],
            'daftar_belum_absen' => $daftarBelumAbsen,
            'user_terbaru'       => $userTerbaru,
        ]);
    }
}
