<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $class = Student::select('kelas','jurusan', DB::raw('count(*) as total'))->groupBy('kelas','jurusan')->get();
        return inertia('Teacher/Dashboard', ['class' => $class]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        $siswa = Student::select('kelas', 'jurusan', 'nama', 'nisn','id')->get()->groupBy(['kelas', 'jurusan']);
        return inertia('Admin/Student/DaftarSiswa', ['siswa' => $siswa]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return inertia('Admin/Student/Edit', ['student' => $student]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $request->validate([
            'nisn' => 'required',
            'nama' => 'required',
            'kelas' => 'required',
            'jurusan' => 'required',
        ]);

    $student->update([
        'nisn' => $request->nisn,
        'nama' => $request->nama,
        'kelas' => $request->kelas,
        'jurusan' => $request->jurusan,
    ]);

    return redirect()->route('teacher.daftar-siswa')
        ->with('success', 'Data siswa berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('teacher.daftar-siswa')
            ->with('success', 'Data siswa berhasil dihapus');
    }
}
