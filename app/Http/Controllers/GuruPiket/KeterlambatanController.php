<?php

namespace App\Http\Controllers\GuruPiket;

use App\Http\Controllers\Controller;
use App\Models\Keterlambatan;
use App\Models\Notifikasi;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeterlambatanController extends Controller
{
    public function index()
    {
        $riwayat = Keterlambatan::with(['siswa.kelasInfo', 'guruPiket'])
            ->orderByDesc('tanggal')
            ->orderByDesc('created_at')
            ->paginate(20);

        return Inertia::render('GuruPiket/Keterlambatan/Index', [
            'riwayat' => $riwayat->through(fn($k) => [
                'id'        => $k->id,
                'siswa'     => $k->siswa?->nama,
                'kelas'     => $k->siswa?->kelasInfo ? "{$k->siswa->kelasInfo->nama_kelas} {$k->siswa->kelasInfo->jurusan}" : '-',
                'tanggal'   => $k->tanggal->format('d/m/Y'),
                'jam_datang'=> $k->jam_datang,
                'alasan'    => $k->alasan,
                'sanksi'    => $k->sanksi,
                'oleh'      => $k->guruPiket?->name ?? '-',
            ]),
        ]);
    }

    public function create()
    {
        $siswa = Student::with('kelasInfo')
            ->orderBy('nama')
            ->get(['id', 'nis', 'nama', 'jenis_kelamin', 'kelas_id'])
            ->map(fn($s) => [
                'id'    => $s->id,
                'nama'  => $s->nama,
                'nis'   => $s->nis,
                'kelas' => $s->kelasInfo ? "{$s->kelasInfo->nama_kelas} {$s->kelasInfo->jurusan}" : '-',
            ]);

        return Inertia::render('GuruPiket/Keterlambatan/Create', [
            'siswa'      => $siswa,
            'tanggal'    => Carbon::today()->isoFormat('dddd, D MMMM Y'),
            'tanggal_raw'=> Carbon::today()->toDateString(),
            'jam_sekarang' => Carbon::now()->format('H:i'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'siswa_id'   => 'required|exists:students,id',
            'tanggal'    => 'required|date',
            'jam_datang' => 'required|date_format:H:i',
            'alasan'     => 'nullable|string|max:255',
            'catatan'    => 'nullable|string|max:500',
            'sanksi'     => 'nullable|string|max:255',
        ]);

        Keterlambatan::create([
            'siswa_id'     => $request->siswa_id,
            'tanggal'      => $request->tanggal,
            'jam_datang'   => $request->jam_datang,
            'alasan'       => $request->alasan,
            'catatan'      => $request->catatan,
            'sanksi'       => $request->sanksi,
            'guru_piket_id'=> auth()->id(),
        ]);

        // Cek total keterlambatan
        $siswa = Student::with('kelasInfo')->find($request->siswa_id);
        $totalTerlambat = Keterlambatan::where('siswa_id', $siswa->id)->count();

        if ($totalTerlambat >= 3 && $totalTerlambat % 3 == 0) { // Notif kelipatan 3
            $pesan = "Siswa {$siswa->nama} ({$siswa->kelasInfo?->nama_kelas} {$siswa->kelasInfo?->jurusan}) telah terlambat sebanyak {$totalTerlambat} kali.";
            
            // Notif ke Wali Kelas
            $wali = User::where('role', 'wali_kelas')->where('kelas_id', $siswa->kelas_id)->first();
            if ($wali) {
                Notifikasi::create(['user_id' => $wali->id, 'judul' => 'Peringatan Terlambat Kritis', 'pesan' => $pesan]);
            }

            // Notif ke Kepala Sekolah
            $kepsek = User::where('role', 'kepala_sekolah')->get();
            foreach ($kepsek as $ks) {
                Notifikasi::create(['user_id' => $ks->id, 'judul' => 'Peringatan Terlambat Kritis', 'pesan' => $pesan]);
            }
        }

        return redirect()->route('guru_piket.keterlambatan.index')
            ->with('success', 'Data keterlambatan berhasil dicatat!');
    }
}
