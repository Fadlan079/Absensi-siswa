<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index()
    {
        $siswa = Student::with('kelasInfo')
            ->orderBy('nama')
            ->paginate(25);

        return Inertia::render('Admin/Siswa/Index', [
            'siswa'      => $siswa->through(fn($s) => [
                'id'            => $s->id,
                'nis'           => $s->nis,
                'nama'          => $s->nama,
                'jenis_kelamin' => $s->jenis_kelamin,
                'kelas'         => $s->kelasInfo ? "{$s->kelasInfo->nama_kelas} {$s->kelasInfo->jurusan}" : '-',
            ]),
            'kelas_list' => Kelas::all(['id', 'nama_kelas', 'jurusan']),
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
}
