<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    protected $fillable = [
        'nis',
        'nisn',
        'nama',
        'jenis_kelamin',
        'kelas_id',
        'kelas',    // backward compat
        'jurusan',  // backward compat
    ];

    public function kelasInfo(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function presensiHarianDetail(): HasMany
    {
        return $this->hasMany(PresensiHarianDetail::class, 'siswa_id');
    }

    public function presensiMapelDetail(): HasMany
    {
        return $this->hasMany(PresensiMapelDetail::class, 'siswa_id');
    }

    public function keterlambatan(): HasMany
    {
        return $this->hasMany(Keterlambatan::class, 'siswa_id');
    }

    /**
     * Hitung persentase kehadiran harian siswa
     */
    public function persentaseKehadiran(): float
    {
        $total = $this->presensiHarianDetail()->count();
        if ($total === 0) return 0;

        $hadir = $this->presensiHarianDetail()->where('status', 'hadir')->count();
        return round(($hadir / $total) * 100, 1);
    }
}
