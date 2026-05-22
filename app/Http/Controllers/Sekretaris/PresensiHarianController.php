<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use App\Models\Notifikasi;
use App\Models\PresensiHarian;
use App\Models\PresensiHarianDetail;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PresensiHarianController extends Controller
{
    public function index()
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        if (!$kelas) {
            return redirect()->route('sekretaris.dashboard')
                ->with('error', 'Anda belum ditugaskan ke kelas manapun.');
        }

        $riwayat = PresensiHarian::where('kelas_id', $kelas->id)
            ->with(['detail', 'pembuat'])
            ->orderByDesc('tanggal')
            ->paginate(20);

        return Inertia::render('Sekretaris/Presensi/Index', [
            'kelas'   => ['id' => $kelas->id, 'nama' => "{$kelas->nama_kelas} {$kelas->jurusan}"],
            'riwayat' => $riwayat->through(fn($p) => [
                'id'      => $p->id,
                'tanggal' => $p->tanggal->format('d/m/Y'),
                'tanggal_raw' => $p->tanggal->toDateString(),
                'hadir'   => $p->detail->where('status', 'hadir')->count(),
                'sakit'   => $p->detail->where('status', 'sakit')->count(),
                'izin'    => $p->detail->where('status', 'izin')->count(),
                'alpha'   => $p->detail->where('status', 'alpha')->count(),
                'total'   => $p->detail->count(),
                'oleh'    => $p->pembuat?->name ?? '-',
            ]),
        ]);
    }

    public function create()
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        if (!$kelas) {
            return redirect()->route('sekretaris.dashboard')
                ->with('error', 'Anda belum ditugaskan ke kelas manapun.');
        }

        $today = Carbon::today();

        // Cek sudah absen hari ini
        $existing = PresensiHarian::where('kelas_id', $kelas->id)
            ->whereDate('tanggal', $today)
            ->with('detail.siswa')
            ->first();

        if ($existing) {
            return redirect()->route('sekretaris.presensi.show', $existing->id)
                ->with('error', 'Presensi hari ini sudah diisi. Anda dapat mengeditnya.');
        }

        $siswa = Student::where('kelas_id', $kelas->id)
            ->orderBy('nama')
            ->get(['id', 'nis', 'nama', 'jenis_kelamin']);

        return Inertia::render('Sekretaris/Presensi/Create', [
            'kelas'   => ['id' => $kelas->id, 'nama' => "{$kelas->nama_kelas} {$kelas->jurusan}"],
            'siswa'   => $siswa,
            'tanggal' => $today->isoFormat('dddd, D MMMM Y'),
            'tanggal_raw' => $today->toDateString(),
        ]);
    }

    public function store(Request $request)
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        $request->validate([
            'tanggal'         => 'required|date',
            'presensi'        => 'required|array',
            'presensi.*.siswa_id' => 'required|exists:students,id',
            'presensi.*.status'   => 'required|in:hadir,sakit,izin,alpha',
        ]);

        // Cek duplikat
        $existing = PresensiHarian::where('kelas_id', $kelas->id)
            ->whereDate('tanggal', $request->tanggal)
            ->first();

        if ($existing) {
            return back()->with('error', 'Presensi tanggal tersebut sudah ada.');
        }

        $presensi = PresensiHarian::create([
            'kelas_id'   => $kelas->id,
            'tanggal'    => $request->tanggal,
            'created_by' => auth()->id(),
        ]);

        foreach ($request->presensi as $item) {
            PresensiHarianDetail::create([
                'presensi_id' => $presensi->id,
                'siswa_id'    => $item['siswa_id'],
                'status'      => $item['status'],
                'catatan'     => $item['catatan'] ?? null,
            ]);

            // Cek notifikasi alpha
            if ($item['status'] === 'alpha') {
                $siswa = Student::with('kelasInfo')->find($item['siswa_id']);
                
                // Hitung total alpha di semester ini (asumsi berdasarkan bulan)
                $now = Carbon::parse($request->tanggal);
                $bulanRange = $now->month >= 7 ? [7, 8, 9, 10, 11, 12] : [1, 2, 3, 4, 5, 6];

                $presensiIds = PresensiHarian::where('kelas_id', $kelas->id)
                    ->whereYear('tanggal', $now->year)
                    ->whereIn(DB::raw('MONTH(tanggal)'), $bulanRange)
                    ->pluck('id');

                $totalAlpha = PresensiHarianDetail::where('siswa_id', $siswa->id)
                    ->whereIn('presensi_id', $presensiIds)
                    ->where('status', 'alpha')
                    ->count();

                if ($totalAlpha >= 5 && $totalAlpha % 5 == 0) { // Notif per kelipatan 5
                    $pesan = "Siswa {$siswa->nama} ({$siswa->kelasInfo?->nama_kelas} {$siswa->kelasInfo?->jurusan}) telah Alpha sebanyak {$totalAlpha} hari di semester ini.";
                    
                    // Ke Wali Kelas
                    $wali = User::where('role', 'wali_kelas')->where('kelas_id', $siswa->kelas_id)->first();
                    if ($wali) {
                        Notifikasi::create(['user_id' => $wali->id, 'judul' => 'Peringatan Alpha Kritis', 'pesan' => $pesan]);
                    }

                    // Ke Kepala Sekolah
                    $kepsek = User::where('role', 'kepala_sekolah')->get();
                    foreach ($kepsek as $ks) {
                        Notifikasi::create(['user_id' => $ks->id, 'judul' => 'Peringatan Alpha Kritis', 'pesan' => $pesan]);
                    }
                }
            }
        }

        return redirect()->route('sekretaris.presensi.show', $presensi->id)
            ->with('success', 'Presensi berhasil disimpan!');
    }

    public function show(int $id)
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        $presensi = PresensiHarian::where('kelas_id', $kelas?->id)
            ->with(['detail.siswa', 'pembuat'])
            ->findOrFail($id);

        $detail = $presensi->detail->map(fn($d) => [
            'id'        => $d->id,
            'siswa_id'  => $d->siswa_id,
            'nama'      => $d->siswa?->nama,
            'nis'       => $d->siswa?->nis,
            'jk'        => $d->siswa?->jenis_kelamin,
            'status'    => $d->status,
            'catatan'   => $d->catatan,
        ])->sortBy('nama')->values();

        $summary = [
            'hadir' => $detail->where('status', 'hadir')->count(),
            'sakit' => $detail->where('status', 'sakit')->count(),
            'izin'  => $detail->where('status', 'izin')->count(),
            'alpha' => $detail->where('status', 'alpha')->count(),
        ];

        return Inertia::render('Sekretaris/Presensi/Show', [
            'kelas'    => ['id' => $kelas?->id, 'nama' => "{$kelas?->nama_kelas} {$kelas?->jurusan}"],
            'presensi' => [
                'id'      => $presensi->id,
                'tanggal' => $presensi->tanggal->isoFormat('dddd, D MMMM Y'),
                'oleh'    => $presensi->pembuat?->name ?? '-',
                'is_today' => $presensi->tanggal->isToday(),
            ],
            'detail'  => $detail,
            'summary' => $summary,
        ]);
    }

    public function edit(int $id)
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        $presensi = PresensiHarian::where('kelas_id', $kelas?->id)
            ->with(['detail.siswa'])
            ->findOrFail($id);

        // Hanya bisa edit presensi hari ini
        if (!$presensi->tanggal->isToday()) {
            return redirect()->route('sekretaris.presensi.show', $id)
                ->with('error', 'Presensi hanya dapat diedit pada hari yang sama.');
        }

        $detail = $presensi->detail->map(fn($d) => [
            'siswa_id' => $d->siswa_id,
            'status'   => $d->status,
            'catatan'  => $d->catatan,
            'nama'     => $d->siswa?->nama,
            'nis'      => $d->siswa?->nis,
            'jenis_kelamin' => $d->siswa?->jenis_kelamin,
        ])->sortBy('nama')->values();

        return Inertia::render('Sekretaris/Presensi/Edit', [
            'kelas'    => ['id' => $kelas?->id, 'nama' => "{$kelas?->nama_kelas} {$kelas?->jurusan}"],
            'presensi' => [
                'id'      => $presensi->id,
                'tanggal' => $presensi->tanggal->isoFormat('dddd, D MMMM Y'),
                'tanggal_raw' => $presensi->tanggal->toDateString(),
            ],
            'detail'   => $detail,
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user  = auth()->user();
        $kelas = $user->kelas;

        $presensi = PresensiHarian::where('kelas_id', $kelas?->id)->findOrFail($id);

        // Hanya bisa update presensi hari ini
        if (!$presensi->tanggal->isToday()) {
            return back()->with('error', 'Presensi hanya dapat diedit pada hari yang sama.');
        }

        $request->validate([
            'presensi'            => 'required|array',
            'presensi.*.siswa_id' => 'required|exists:students,id',
            'presensi.*.status'   => 'required|in:hadir,sakit,izin,alpha',
        ]);

        foreach ($request->presensi as $item) {
            PresensiHarianDetail::updateOrCreate(
                ['presensi_id' => $presensi->id, 'siswa_id' => $item['siswa_id']],
                ['status' => $item['status'], 'catatan' => $item['catatan'] ?? null]
            );

            // Update notifikasi alpha jika perlu
            if ($item['status'] === 'alpha') {
                $siswa = Student::with('kelasInfo')->find($item['siswa_id']);
                $now   = Carbon::today();
                $bulanRange = $now->month >= 7 ? [7, 8, 9, 10, 11, 12] : [1, 2, 3, 4, 5, 6];

                $presensiIds = PresensiHarian::where('kelas_id', $kelas->id)
                    ->whereYear('tanggal', $now->year)
                    ->whereIn(DB::raw('MONTH(tanggal)'), $bulanRange)
                    ->pluck('id');

                $totalAlpha = PresensiHarianDetail::where('siswa_id', $siswa->id)
                    ->whereIn('presensi_id', $presensiIds)
                    ->where('status', 'alpha')
                    ->count();

                if ($totalAlpha >= 5 && $totalAlpha % 5 == 0) {
                    $pesan = "Siswa {$siswa->nama} ({$siswa->kelasInfo?->nama_kelas} {$siswa->kelasInfo?->jurusan}) telah Alpha sebanyak {$totalAlpha} hari di semester ini.";
                    $wali  = User::where('role', 'wali_kelas')->where('kelas_id', $siswa->kelas_id)->first();
                    if ($wali) {
                        Notifikasi::create(['user_id' => $wali->id, 'judul' => 'Peringatan Alpha Kritis', 'pesan' => $pesan]);
                    }
                    $kepsek = User::where('role', 'kepala_sekolah')->get();
                    foreach ($kepsek as $ks) {
                        Notifikasi::create(['user_id' => $ks->id, 'judul' => 'Peringatan Alpha Kritis', 'pesan' => $pesan]);
                    }
                }
            }
        }

        return redirect()->route('sekretaris.presensi.show', $presensi->id)
            ->with('success', 'Presensi berhasil diperbarui!');
    }
}
