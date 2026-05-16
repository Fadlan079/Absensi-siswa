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
        return view('teacher.attendance.create', compact('students', 'kelas', 'jurusan'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'attendance' => 'required|array',
        ]);

        $today = Carbon::today()->toDateString();

        $alreadyExists = Attendance::whereDate('tanggal', $today)
            ->whereHas('student', function ($q) use ($request) {
                $q->where('kelas', $request->kelas)
                ->where('jurusan', $request->jurusan);
            })
            ->exists();

        if ($alreadyExists) {
            return redirect()->route('teacher.dashboard')->with('error', 'Absensi hari ini sudah dilakukan untuk kelas ini.');
        }

        $data = [];

        foreach ($request->attendance as $studentId => $status) {
            $data[] = [
                'student_id' => $studentId,
                'tipe' => 'harian',
                'mapel' => null,
                'keterangan' => $status,
                'tanggal' => now()->toDateString(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Attendance::insert($data);

        return redirect()->route('teacher.dashboard')->with('success', 'Absensi berhasil disimpan');
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
