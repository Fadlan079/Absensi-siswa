<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─── Guest ──────────────────────────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'      => Route::has('login'),
        'canRegister'   => Route::has('register'),
        'laravelVersion'=> Application::VERSION,
        'phpVersion'    => PHP_VERSION,
    ]);
});

Route::get('/portal-informasi', [\App\Http\Controllers\PublicInfoController::class, 'index'])->name('public.portal');

// ─── Authenticated ──────────────────────────────────────────────────────────
Route::middleware(['auth'])->group(function () {

    // Redirect ke dashboard sesuai role
    Route::get('/dashboard', function () {
        $route = auth()->user()->dashboard_route;
        return redirect()->route($route);
    })->name('dashboard');

    // ── Admin ────────────────────────────────────────────────
    Route::middleware('role:admin')
        ->prefix('admin')
        ->name('admin.')
        ->group(base_path('routes/admin.php'));

    // ── Kepala Sekolah ───────────────────────────────────────
    Route::middleware('role:kepala_sekolah,admin')
        ->prefix('kepala-sekolah')
        ->name('kepala_sekolah.')
        ->group(base_path('routes/kepala_sekolah.php'));

    // ── Wali Kelas ───────────────────────────────────────────
    Route::middleware('role:wali_kelas,admin')
        ->prefix('wali-kelas')
        ->name('wali_kelas.')
        ->group(base_path('routes/wali_kelas.php'));

    // ── Sekretaris Kelas ─────────────────────────────────────
    Route::middleware('role:sekretaris,wali_kelas,admin')
        ->prefix('sekretaris')
        ->name('sekretaris.')
        ->group(base_path('routes/sekretaris.php'));

    // ── Guru Mapel ───────────────────────────────────────────
    Route::middleware('role:guru_mapel,admin')
        ->prefix('guru-mapel')
        ->name('guru_mapel.')
        ->group(base_path('routes/guru_mapel.php'));

    // ── Guru Piket (Diakses oleh Guru Mapel juga) ────────────
    Route::middleware('role:guru_piket,guru_mapel,admin')
        ->prefix('guru-piket')
        ->name('guru_piket.')
        ->group(base_path('routes/guru_piket.php'));

    // ── Profile (Semua role) ─────────────────────────────────
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ── Export Excel / PDF ───────────────────────────────────
    Route::middleware('role:wali_kelas,kepala_sekolah,admin')->prefix('export')->name('export.')->group(function () {
        Route::get('/rekap-bulanan/excel', [ExportController::class, 'rekapBulananExcel'])->name('rekap.excel');
        Route::get('/rekap-bulanan/pdf',   [ExportController::class, 'rekapBulananPdf'])->name('rekap.pdf');
        Route::get('/rekap-semester/excel', [ExportController::class, 'rekapSemesterExcel'])->name('semester.excel');
        Route::get('/rekap-semester/pdf',   [ExportController::class, 'rekapSemesterPdf'])->name('semester.pdf');
    });

    // ── Notifikasi (Semua Role) ──────────────────────────────
    Route::get('/notifikasi', [\App\Http\Controllers\NotifikasiController::class, 'index'])->name('notifikasi.index');
    Route::post('/notifikasi/{id}/read', [\App\Http\Controllers\NotifikasiController::class, 'markAsRead'])->name('notifikasi.read');
    Route::post('/notifikasi/read-all', [\App\Http\Controllers\NotifikasiController::class, 'markAllAsRead'])->name('notifikasi.readAll');
});

require __DIR__.'/auth.php';
