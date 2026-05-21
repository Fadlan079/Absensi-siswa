<?php

namespace App\Http\Controllers\Admin;

use App\Exports\SimpleExport;
use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::with('kelasInfo');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('nis', 'like', "%{$search}%");
            });
        }

        if ($request->filled('kelas_id')) {
            $query->where('kelas_id', $request->input('kelas_id'));
        }

        if ($request->filled('jenis_kelamin')) {
            $query->where('jenis_kelamin', $request->input('jenis_kelamin'));
        }

        $siswa = $query->orderBy('nama')
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Admin/Siswa/Index', [
            'siswa'      => $siswa->through(fn($s) => [
                'id'            => $s->id,
                'nis'           => $s->nis,
                'nama'          => $s->nama,
                'jenis_kelamin' => $s->jenis_kelamin,
                'kelas'         => $s->kelasInfo ? "{$s->kelasInfo->nama_kelas} {$s->kelasInfo->jurusan}" : '-',
            ]),
            'kelas_list' => Kelas::all(['id', 'nama_kelas', 'jurusan']),
            'filters'    => $request->only(['search', 'kelas_id', 'jenis_kelamin']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Siswa/Create', [
            'kelas_list' => Kelas::all(['id', 'nama_kelas', 'jurusan']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nis'           => 'required|string|unique:students,nis',
            'nisn'          => 'nullable|string|unique:students,nisn',
            'nama'          => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'kelas_id'      => 'required|exists:kelas,id',
        ]);

        $kelas = Kelas::findOrFail($request->kelas_id);

        Student::create([
            'nis'           => $request->nis,
            'nisn'          => $request->nisn,
            'nama'          => $request->nama,
            'jenis_kelamin' => $request->jenis_kelamin,
            'kelas_id'      => $request->kelas_id,
            'kelas'         => $kelas->nama_kelas,
            'jurusan'       => $kelas->jurusan,
        ]);

        return redirect()->route('admin.siswa.index')
            ->with('success', 'Data siswa berhasil ditambahkan!');
    }

    public function edit(Student $siswa)
    {
        return Inertia::render('Admin/Siswa/Edit', [
            'siswa'      => $siswa->only('id', 'nis', 'nisn', 'nama', 'jenis_kelamin', 'kelas_id'),
            'kelas_list' => Kelas::all(['id', 'nama_kelas', 'jurusan']),
        ]);
    }

    public function update(Request $request, Student $siswa)
    {
        $request->validate([
            'nis'           => 'required|string|unique:students,nis,' . $siswa->id,
            'nisn'          => 'nullable|string|unique:students,nisn,' . $siswa->id,
            'nama'          => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'kelas_id'      => 'required|exists:kelas,id',
        ]);

        $kelas = Kelas::findOrFail($request->kelas_id);

        $siswa->update([
            'nis'           => $request->nis,
            'nisn'          => $request->nisn,
            'nama'          => $request->nama,
            'jenis_kelamin' => $request->jenis_kelamin,
            'kelas_id'      => $request->kelas_id,
            'kelas'         => $kelas->nama_kelas,
            'jurusan'       => $kelas->jurusan,
        ]);

        return redirect()->route('admin.siswa.index')
            ->with('success', 'Data siswa berhasil diperbarui!');
    }

    public function destroy(Student $siswa)
    {
        $siswa->delete();
        return back()->with('success', 'Data siswa berhasil dihapus.');
    }

    /* ─────────────── Export & Import ─────────────── */

    public function exportExcel()
    {
        $siswa = Student::with('kelasInfo')->orderBy('nama')->get();
        $rows  = $siswa->map(fn ($s, $i) => [
            $i + 1,
            $s->nis,
            $s->nisn ?? '-',
            $s->nama,
            $s->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan',
            $s->kelasInfo ? "{$s->kelasInfo->nama_kelas} {$s->kelasInfo->jurusan}" : '-',
        ])->toArray();

        return Excel::download(
            new SimpleExport($rows, ['No', 'NIS', 'NISN', 'Nama Siswa', 'Jenis Kelamin', 'Kelas']),
            'Data_Siswa_' . now()->format('Ymd') . '.xlsx'
        );
    }

    public function exportPdf()
    {
        $siswa = Student::with('kelasInfo')->orderBy('nama')->get();
        $pdf   = Pdf::loadView('exports.siswa_pdf', compact('siswa'))
            ->setPaper('a4', 'portrait');
        return $pdf->download('Data_Siswa_' . now()->format('Ymd') . '.pdf');
    }

    public function importExcel(Request $request)
    {
        $request->validate(['file' => 'required|file|mimes:xlsx,xls,csv|max:4096']);

        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($request->file('file')->getRealPath());
        $rows        = $spreadsheet->getActiveSheet()->toArray(null, true, true, false);

        $imported = 0;
        foreach ($rows as $i => $row) {
            if ($i === 0) continue;
            [$nis, $nisn, $nama, $jk, $namaKelas, $jurusan] = array_pad(array_values($row), 6, null);
            if (empty($nis) || empty($nama)) continue;

            $jkVal  = strtoupper(substr(trim((string)$jk), 0, 1));
            if (!in_array($jkVal, ['L','P'])) $jkVal = 'L';

            $kelas = ($namaKelas && $jurusan)
                ? Kelas::where('nama_kelas', trim($namaKelas))->where('jurusan', trim($jurusan))->first()
                : null;

            Student::updateOrCreate(
                ['nis' => trim((string)$nis)],
                [
                    'nisn'          => $nisn ? trim((string)$nisn) : null,
                    'nama'          => trim($nama),
                    'jenis_kelamin' => $jkVal,
                    'kelas_id'      => $kelas?->id,
                    'kelas'         => $kelas?->nama_kelas,
                    'jurusan'       => $kelas?->jurusan,
                ]
            );
            $imported++;
        }

        return redirect()->route('admin.siswa.index')
            ->with('success', "{$imported} siswa berhasil diimpor.");
    }
}
