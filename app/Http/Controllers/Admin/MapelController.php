<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mapel;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapelController extends Controller
{
    public function index()
    {
        $mapel = Mapel::with('guru')
            ->orderBy('nama_mapel')
            ->get()
            ->map(fn($m) => [
                'id'         => $m->id,
                'kode_mapel' => $m->kode_mapel,
                'nama_mapel' => $m->nama_mapel,
                'guru'       => $m->guru?->name ?? '-',
            ]);

        return Inertia::render('Admin/Mapel/Index', [
            'mapel_list' => $mapel,
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
}
