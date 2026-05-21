<?php

use App\Http\Controllers\GuruPiket\DashboardController;
use App\Http\Controllers\GuruPiket\KeterlambatanController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/keterlambatan/create', [KeterlambatanController::class, 'create'])->name('keterlambatan.create');
Route::post('/keterlambatan', [KeterlambatanController::class, 'store'])->name('keterlambatan.store');
Route::get('/keterlambatan', [KeterlambatanController::class, 'index'])->name('keterlambatan.index');
