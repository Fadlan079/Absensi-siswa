<?php

namespace App\Http\Controllers;

use App\Models\student;
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
        return view('teacher.dashboard', compact('class'));
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
    public function show(student $student)
    {
        $siswa = Student::select('kelas', 'jurusan', 'nama', 'nisn','id')->get()->groupBy(['kelas', 'jurusan']);
        return view('admin.student.daftar-siswa', compact('siswa'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(student $student)
    {
        return view('admin.student.edit', compact('student'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, student $student)
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
    public function destroy(student $student)
    {
        $student->delete();

        return redirect()->route('teacher.daftar-siswa')
            ->with('success', 'Data siswa berhasil dihapus');
    }
}
