<?php

namespace App\Http\Controllers\Admin;

use App\Exports\SimpleExport;
use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class KelasController extends Controller
{
    public function index(Request $request)
    {
        $query = Kelas::with(['waliKelas', 'siswa'])
            ->withCount('siswa');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama_kelas', 'like', "%{$search}%")
                  ->orWhere('jurusan', 'like', "%{$search}%");
            });
        }

        if ($request->filled('wali_kelas_id')) {
            $query->where('wali_kelas_id', $request->input('wali_kelas_id'));
        }

        $kelas = $query->orderBy('nama_kelas')
            ->get()
            ->map(fn($k) => [
                'id'          => $k->id,
                'nama_kelas'  => $k->nama_kelas,
                'jurusan'     => $k->jurusan,
                'wali_kelas'  => $k->waliKelas?->name ?? '-',
                'total_siswa' => $k->siswa_count,
            ]);

        return Inertia::render('Admin/Kelas/Index', [
            'kelas_list' => $kelas,
            'wali_kelas_list' => User::where('role', 'wali_kelas')->orderBy('name')->get(['id', 'name']),
            'filters'    => $request->only(['search', 'wali_kelas_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kelas/Create', [
            'guru_list' => User::whereIn('role', ['wali_kelas'])->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kelas'   => 'required|string|max:10',
            'jurusan'      => 'required|string|max:20',
            'wali_kelas_id'=> 'nullable|exists:users,id',
        ]);

        Kelas::create($request->only('nama_kelas', 'jurusan', 'wali_kelas_id'));

        return redirect()->route('admin.kelas.index')
            ->with('success', 'Kelas berhasil ditambahkan!');
    }

    public function edit(Kelas $kela)
    {
        return Inertia::render('Admin/Kelas/Edit', [
            'kelas'     => $kela->only('id', 'nama_kelas', 'jurusan', 'wali_kelas_id'),
            'guru_list' => User::whereIn('role', ['wali_kelas'])->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Kelas $kela)
    {
        $request->validate([
            'nama_kelas'   => 'required|string|max:10',
            'jurusan'      => 'required|string|max:20',
            'wali_kelas_id'=> 'nullable|exists:users,id',
        ]);

        $kela->update($request->only('nama_kelas', 'jurusan', 'wali_kelas_id'));

        return redirect()->route('admin.kelas.index')
            ->with('success', 'Kelas berhasil diperbarui!');
    }

    public function destroy(Kelas $kela)
    {
        if ($kela->siswa()->count() > 0) {
            return back()->with('error', 'Kelas tidak bisa dihapus karena masih memiliki siswa.');
        }
        $kela->delete();
        return back()->with('success', 'Kelas berhasil dihapus.');
    }

    /* ─────────────── Export & Import ─────────────── */

    public function exportExcel()
    {
        $kelas = Kelas::with(['waliKelas'])->withCount('siswa')->orderBy('nama_kelas')->get();
        $rows  = $kelas->map(fn ($k, $i) => [
            $i + 1,
            $k->nama_kelas,
            $k->jurusan,
            $k->waliKelas?->name ?? '-',
            $k->siswa_count,
        ])->toArray();

        return Excel::download(
            new SimpleExport($rows, ['No', 'Nama Kelas', 'Jurusan', 'Wali Kelas', 'Jumlah Siswa']),
            'Data_Kelas_' . now()->format('Ymd') . '.xlsx'
        );
    }

    public function exportPdf()
    {
        $kelas = Kelas::with('waliKelas')->withCount('siswa')->orderBy('nama_kelas')->get();
        $pdf   = Pdf::loadView('exports.kelas_pdf', compact('kelas'))
            ->setPaper('a4', 'portrait');
        return $pdf->download('Data_Kelas_' . now()->format('Ymd') . '.pdf');
    }

    public function importExcel(Request $request)
    {
        $request->validate(['file' => 'required|file|mimes:xlsx,xls,csv|max:4096']);

        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($request->file('file')->getRealPath());
        $rows        = $spreadsheet->getActiveSheet()->toArray(null, true, true, false);

        $imported = 0;
        foreach ($rows as $i => $row) {
            if ($i === 0) continue;
            [$namaKelas, $jurusan, $waliNama] = array_pad(array_values($row), 3, null);
            if (empty($namaKelas) || empty($jurusan)) continue;

            $wali = $waliNama ? User::where('role', 'wali_kelas')->where('name', trim($waliNama))->first() : null;

            Kelas::updateOrCreate(
                ['nama_kelas' => trim($namaKelas), 'jurusan' => trim($jurusan)],
                ['wali_kelas_id' => $wali?->id]
            );
            $imported++;
        }

        return redirect()->route('admin.kelas.index')
            ->with('success', "{$imported} kelas berhasil diimpor.");
    }
}
