<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::with(['waliKelas', 'siswa'])
            ->withCount('siswa')
            ->orderBy('nama_kelas')
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
}
