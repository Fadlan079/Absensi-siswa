<?php

use App\Http\Controllers\Sekretaris\DashboardController;
use App\Http\Controllers\Sekretaris\PresensiHarianController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/presensi/create', [PresensiHarianController::class, 'create'])->name('presensi.create');
Route::post('/presensi', [PresensiHarianController::class, 'store'])->name('presensi.store');
Route::get('/presensi', [PresensiHarianController::class, 'index'])->name('presensi.index');
Route::get('/presensi/{id}', [PresensiHarianController::class, 'show'])->name('presensi.show');
Route::get('/presensi/{id}/edit', [PresensiHarianController::class, 'edit'])->name('presensi.edit');
Route::put('/presensi/{id}', [PresensiHarianController::class, 'update'])->name('presensi.update');
