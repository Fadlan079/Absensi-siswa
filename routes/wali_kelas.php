<?php

use App\Http\Controllers\WaliKelas\DashboardController;
use App\Http\Controllers\WaliKelas\RekapController;
use App\Http\Controllers\WaliKelas\SiswaController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/siswa', [SiswaController::class, 'index'])->name('siswa.index');
Route::get('/rekap/bulanan', [RekapController::class, 'bulanan'])->name('rekap.bulanan');
Route::get('/rekap/semester', [RekapController::class, 'semester'])->name('rekap.semester');
