<?php

namespace App\Http\Controllers\GuruMapel;

use App\Http\Controllers\Controller;
use App\Models\Mapel;
use App\Models\PresensiMapel;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user   = auth()->user();
        $mapels = Mapel::where('guru_id', $user->id)->with('presensiMapel')->get();

        $recentPresensi = PresensiMapel::where('guru_id', $user->id)
            ->with('mapel', 'kelas')
            ->orderByDesc('tanggal')
            ->take(5)
            ->get()
            ->map(fn($p) => [
                'id'     => $p->id,
                'mapel'  => $p->mapel?->nama_mapel,
                'kelas'  => "{$p->kelas?->nama_kelas} {$p->kelas?->jurusan}",
                'tanggal'=> $p->tanggal->format('d/m/Y'),
                'jam_ke' => $p->jam_ke,
            ]);

        return Inertia::render('GuruMapel/Dashboard', [
            'mapels'          => $mapels->map(fn($m) => ['id' => $m->id, 'nama' => $m->nama_mapel]),
            'recent_presensi' => $recentPresensi,
        ]);
    }
}
