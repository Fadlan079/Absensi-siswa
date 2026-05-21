<?php

namespace App\Http\Controllers\WaliKelas;

use App\Http\Controllers\Controller;
use App\Models\PresensiHarian;
use Carbon\Carbon;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index()
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        if (!$kelas) {
            return redirect()->route('wali_kelas.dashboard')
                ->with('error', 'Anda belum ditugaskan ke kelas manapun.');
        }

        $siswa = $kelas->siswa()->orderBy('nama')->get(['id', 'nis', 'nama', 'jenis_kelamin']);

        // Ambil presensi hari ini jika ada
        $today = Carbon::today();
        $presensiHariIni = PresensiHarian::where('kelas_id', $kelas->id)
            ->whereDate('tanggal', $today)
            ->with('detail')
            ->first();

        $todayPresensi = null;
        if ($presensiHariIni) {
            $detail = $presensiHariIni->detail;
            $todayPresensi = [
                'hadir' => $detail->where('status', 'hadir')->count(),
                'sakit' => $detail->where('status', 'sakit')->count(),
                'izin'  => $detail->where('status', 'izin')->count(),
                'alpha' => $detail->where('status', 'alpha')->count(),
            ];
        }

        return Inertia::render('WaliKelas/Siswa', [
            'kelas'          => ['nama' => "{$kelas->nama_kelas} {$kelas->jurusan}"],
            'siswa'          => $siswa,
            'today_presensi' => $todayPresensi,
        ]);
    }
}
