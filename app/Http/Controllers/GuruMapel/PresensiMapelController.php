<?php

namespace App\Http\Controllers\GuruMapel;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\PresensiMapel;
use App\Models\PresensiMapelDetail;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PresensiMapelController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $riwayat = PresensiMapel::where('guru_id', $user->id)
            ->with(['mapel', 'kelas', 'detail'])
            ->orderByDesc('tanggal')
            ->paginate(20);

        return Inertia::render('GuruMapel/Presensi/Index', [
            'riwayat' => $riwayat->through(fn($p) => [
                'id'      => $p->id,
                'mapel'   => $p->mapel?->nama_mapel,
                'kelas'   => "{$p->kelas?->nama_kelas} {$p->kelas?->jurusan}",
                'tanggal' => $p->tanggal->format('d/m/Y'),
                'jam_ke'  => $p->jam_ke,
                'hadir'   => $p->detail->where('status', 'hadir')->count(),
                'total'   => $p->detail->count(),
            ]),
        ]);
    }

    public function create()
    {
        $user   = auth()->user();
        $mapels = Mapel::where('guru_id', $user->id)->get(['id', 'nama_mapel', 'kode_mapel']);
        $kelas  = Kelas::all(['id', 'nama_kelas', 'jurusan']);

        return Inertia::render('GuruMapel/Presensi/Create', [
            'mapels'      => $mapels,
            'kelas_list'  => $kelas,
            'tanggal'     => Carbon::today()->isoFormat('dddd, D MMMM Y'),
            'tanggal_raw' => Carbon::today()->toDateString(),
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'mapel_id'  => 'required|exists:mapel,id',
            'kelas_id'  => 'required|exists:kelas,id',
            'tanggal'   => 'required|date',
            'jam_ke'    => 'required|integer|min:1|max:12',
            'presensi'  => 'required|array',
            'presensi.*.siswa_id' => 'required|exists:students,id',
            'presensi.*.status'   => 'required|in:hadir,sakit,izin,alpha',
        ]);

        $presensi = PresensiMapel::create([
            'mapel_id'  => $request->mapel_id,
            'kelas_id'  => $request->kelas_id,
            'tanggal'   => $request->tanggal,
            'jam_ke'    => $request->jam_ke,
            'guru_id'   => $user->id,
        ]);

        foreach ($request->presensi as $item) {
            PresensiMapelDetail::create([
                'presensi_mapel_id' => $presensi->id,
                'siswa_id'          => $item['siswa_id'],
                'status'            => $item['status'],
                'catatan'           => $item['catatan'] ?? null,
            ]);
        }

        return redirect()->route('guru_mapel.presensi.index')
            ->with('success', 'Presensi mapel berhasil disimpan!');
    }
}
