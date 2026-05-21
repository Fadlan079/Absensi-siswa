<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use App\Models\PresensiHarian;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user  = auth()->user();
        $kelas = $user->kelas;
        $today = Carbon::today();

        $sudahAbsen = $kelas
            ? PresensiHarian::where('kelas_id', $kelas->id)->whereDate('tanggal', $today)->exists()
            : false;

        $recentPresensi = $kelas
            ? PresensiHarian::where('kelas_id', $kelas->id)
                ->orderByDesc('tanggal')->take(7)->get()
                ->map(fn($p) => ['tanggal' => $p->tanggal->format('d/m/Y'), 'id' => $p->id])
            : [];

        return Inertia::render('Sekretaris/Dashboard', [
            'kelas'          => $kelas ? ['nama' => "{$kelas->nama_kelas} {$kelas->jurusan}", 'id' => $kelas->id] : null,
            'sudah_absen'    => $sudahAbsen,
            'recent_presensi'=> $recentPresensi,
            'tanggal'        => $today->isoFormat('dddd, D MMMM Y'),
        ]);
    }
}
