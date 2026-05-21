<?php

namespace App\Http\Controllers\Admin;

use App\Exports\SimpleExport;
use App\Http\Controllers\Controller;
use App\Models\Mapel;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class MapelController extends Controller
{
    public function index(Request $request)
    {
        $query = Mapel::with('guru');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama_mapel', 'like', "%{$search}%")
                  ->orWhere('kode_mapel', 'like', "%{$search}%");
            });
        }

        if ($request->filled('guru_id')) {
            $query->where('guru_id', $request->input('guru_id'));
        }

        $mapel = $query->orderBy('nama_mapel')
            ->get()
            ->map(fn($m) => [
                'id'         => $m->id,
                'kode_mapel' => $m->kode_mapel,
                'nama_mapel' => $m->nama_mapel,
                'guru'       => $m->guru?->name ?? '-',
            ]);

        return Inertia::render('Admin/Mapel/Index', [
            'mapel_list' => $mapel,
            'guru_list'  => User::where('role', 'guru_mapel')->orderBy('name')->get(['id', 'name']),
            'filters'    => $request->only(['search', 'guru_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Mapel/Create', [
            'guru_list' => User::where('role', 'guru_mapel')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_mapel' => 'required|string|max:10|unique:mapel,kode_mapel',
            'nama_mapel' => 'required|string|max:100',
            'guru_id'    => 'nullable|exists:users,id',
        ]);

        Mapel::create($request->only('kode_mapel', 'nama_mapel', 'guru_id'));

        return redirect()->route('admin.mapel.index')
            ->with('success', 'Mata pelajaran berhasil ditambahkan!');
    }

    public function edit(Mapel $mapel)
    {
        return Inertia::render('Admin/Mapel/Edit', [
            'mapel'     => $mapel->only('id', 'kode_mapel', 'nama_mapel', 'guru_id'),
            'guru_list' => User::where('role', 'guru_mapel')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Mapel $mapel)
    {
        $request->validate([
            'kode_mapel' => 'required|string|max:10|unique:mapel,kode_mapel,' . $mapel->id,
            'nama_mapel' => 'required|string|max:100',
            'guru_id'    => 'nullable|exists:users,id',
        ]);

        $mapel->update($request->only('kode_mapel', 'nama_mapel', 'guru_id'));

        return redirect()->route('admin.mapel.index')
            ->with('success', 'Mata pelajaran berhasil diperbarui!');
    }

    public function destroy(Mapel $mapel)
    {
        $mapel->delete();
        return back()->with('success', 'Mata pelajaran berhasil dihapus.');
    }

    /* ─────────────── Export & Import ─────────────── */

    public function exportExcel()
    {
        $mapel = Mapel::with('guru')->orderBy('kode_mapel')->get();
        $rows  = $mapel->map(fn ($m, $i) => [
            $i + 1,
            $m->kode_mapel,
            $m->nama_mapel,
            $m->guru?->name ?? '-',
        ])->toArray();

        return Excel::download(
            new SimpleExport($rows, ['No', 'Kode Mapel', 'Nama Mata Pelajaran', 'Guru Pengampu']),
            'Data_Mapel_' . now()->format('Ymd') . '.xlsx'
        );
    }

    public function exportPdf()
    {
        $mapel = Mapel::with('guru')->orderBy('kode_mapel')->get()
            ->map(fn ($m) => [
                'kode_mapel' => $m->kode_mapel,
                'nama_mapel' => $m->nama_mapel,
                'guru'       => $m->guru?->name ?? '-',
            ])->values()->toArray();

        $pdf = Pdf::loadView('exports.mapel_pdf', compact('mapel'))
            ->setPaper('a4', 'portrait');

        return $pdf->download('Kode_Mapel_' . now()->format('Ymd') . '.pdf');
    }

    public function importExcel(Request $request)
    {
        $request->validate(['file' => 'required|file|mimes:xlsx,xls,csv|max:4096']);

        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($request->file('file')->getRealPath());
        $rows        = $spreadsheet->getActiveSheet()->toArray(null, true, true, false);

        $imported = 0;
        foreach ($rows as $i => $row) {
            if ($i === 0) continue; // skip heading row
            [$kode, $nama, $guruName] = array_pad(array_values($row), 3, null);
            if (empty($kode) || empty($nama)) continue;

            $guru = $guruName ? User::where('role', 'guru_mapel')->where('name', trim($guruName))->first() : null;

            Mapel::updateOrCreate(
                ['kode_mapel' => trim($kode)],
                [
                    'nama_mapel' => trim($nama),
                    'guru_id'    => $guru?->id,
                ]
            );
            $imported++;
        }

        return redirect()->route('admin.mapel.index')
            ->with('success', "{$imported} mata pelajaran berhasil diimpor.");
    }
}
