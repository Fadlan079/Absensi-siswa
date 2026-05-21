<?php

namespace App\Http\Controllers\GuruPiket;

use App\Http\Controllers\Controller;
use App\Models\Keterlambatan;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $terlambatHariIni = Keterlambatan::whereDate('tanggal', $today)
            ->with('siswa.kelas')
            ->get()
            ->map(fn($k) => [
                'id'        => $k->id,
                'siswa'     => $k->siswa?->nama,
                'kelas'     => $k->siswa?->kelas ? "{$k->siswa->kelas->nama_kelas} {$k->siswa->kelas->jurusan}" : '-',
                'jam_datang'=> $k->jam_datang,
                'alasan'    => $k->alasan,
            ]);

        return Inertia::render('GuruPiket/Dashboard', [
            'terlambat_hari_ini' => $terlambatHariIni,
            'tanggal'            => $today->isoFormat('dddd, D MMMM Y'),
            'total_terlambat'    => $terlambatHariIni->count(),
        ]);
    }
}
