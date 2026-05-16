<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AttendanceController;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'admin') {
            return redirect('/admin/dashboard');
        }

        return redirect('/teacher/dashboard');
    })->name('dashboard');

    Route::get('/admin/dashboard', function () {
        return view('admin.dashboard');
    })->middleware('role:admin');

    Route::get('/teacher/dashboard', [StudentController::class, 'index'])
        ->middleware('role:guru')->name('teacher.dashboard');

    Route::get('/teacher/daftar-siswa', [StudentController::class, 'show'])
    ->middleware('role:guru')->name('teacher.daftar-siswa');

    Route::resource('students', StudentController::class);

    Route::get('/attendance/{kelas}/{jurusan}', [AttendanceController::class, 'create'])
    ->middleware(['role:guru'])
    ->name('attendance.create');

    Route::post('/attendance/store', [AttendanceController::class, 'store'])
    ->middleware(['auth', 'role:guru'])
    ->name('attendance.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
