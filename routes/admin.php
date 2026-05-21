<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\KelasController;
use App\Http\Controllers\Admin\MapelController;
use App\Http\Controllers\Admin\SiswaController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// ── Export & Import (must be declared BEFORE resource routes) ─────────────────
Route::get('users/export/excel', [UserController::class,  'exportExcel'])->name('users.export.excel');
Route::get('users/export/pdf',   [UserController::class,  'exportPdf']  )->name('users.export.pdf');
Route::post('users/import',      [UserController::class,  'importExcel'])->name('users.import');

Route::get('kelas/export/excel', [KelasController::class, 'exportExcel'])->name('kelas.export.excel');
Route::get('kelas/export/pdf',   [KelasController::class, 'exportPdf']  )->name('kelas.export.pdf');
Route::post('kelas/import',      [KelasController::class, 'importExcel'])->name('kelas.import');

Route::get('mapel/export/excel', [MapelController::class, 'exportExcel'])->name('mapel.export.excel');
Route::get('mapel/export/pdf',   [MapelController::class, 'exportPdf']  )->name('mapel.export.pdf');
Route::post('mapel/import',      [MapelController::class, 'importExcel'])->name('mapel.import');

Route::get('siswa/export/excel', [SiswaController::class, 'exportExcel'])->name('siswa.export.excel');
Route::get('siswa/export/pdf',   [SiswaController::class, 'exportPdf']  )->name('siswa.export.pdf');
Route::post('siswa/import',      [SiswaController::class, 'importExcel'])->name('siswa.import');

// ── Resource routes ────────────────────────────────────────────────────────────
Route::resource('users', UserController::class);
Route::resource('kelas', KelasController::class);
Route::resource('mapel', MapelController::class);
Route::resource('siswa', SiswaController::class);
