<?php

use App\Models\Student;
use Illuminate\Support\Facades\Route;

// Endpoint untuk mengambil daftar siswa berdasarkan kelas
// Digunakan oleh form presensi mapel (GuruMapel)
Route::middleware(['auth'])->group(function () {
    Route::get('/siswa-by-kelas/{kelas_id}', function (int $kelas_id) {
        return Student::where('kelas_id', $kelas_id)
            ->orderBy('nama')
            ->get(['id', 'nis', 'nama', 'jenis_kelamin']);
    });
});
