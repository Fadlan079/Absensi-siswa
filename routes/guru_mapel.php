<?php

use App\Http\Controllers\GuruMapel\DashboardController;
use App\Http\Controllers\GuruMapel\PresensiMapelController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/presensi/create', [PresensiMapelController::class, 'create'])->name('presensi.create');
Route::post('/presensi', [PresensiMapelController::class, 'store'])->name('presensi.store');
Route::get('/presensi', [PresensiMapelController::class, 'index'])->name('presensi.index');
