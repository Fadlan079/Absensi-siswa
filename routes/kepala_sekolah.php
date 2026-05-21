<?php

use App\Http\Controllers\KepalaSekolah\DashboardController;
use App\Http\Controllers\KepalaSekolah\RankingController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/ranking', [RankingController::class, 'index'])->name('ranking');
