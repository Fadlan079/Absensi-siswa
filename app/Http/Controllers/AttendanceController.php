<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Models\Student;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($kelas, $jurusan)
    {
        $students = Student::where('kelas', $kelas)->where('jurusan', $jurusan)->get();

        $today = now()->toDateString();

        $attendances = Attendance::whereDate('tanggal', $today)
            ->whereIn('student_id', $students->pluck('id'))
            ->get()
            ->keyBy('student_id');

        return inertia('Teacher/Attendance/Create', compact('students', 'kelas', 'jurusan', 'attendances'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'attendance' => 'required|array',
            'kelas' => 'required',
            'jurusan' => 'required',
        ]);

        $today = now()->toDateString();

        foreach ($request->attendance as $studentId => $status) {

            Attendance::updateOrCreate(
                [
                    'student_id' => $studentId,
                    'tanggal' => $today,
                ],
                [
                    'tipe' => 'harian',
                    'mapel' => null,
                    'keterangan' => $status,
                ]
            );
        }

        return redirect()->route('teacher.dashboard')
            ->with('success', 'Absensi berhasil disimpan / diperbarui');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}
