<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Student;

class Kelas extends Model
{
    protected $table = 'kelas';

    protected $fillable = ['nama_kelas', 'jurusan', 'wali_kelas_id'];

    public function waliKelas(): BelongsTo
    {
        return $this->belongsTo(User::class, 'wali_kelas_id');
    }

    public function siswa(): HasMany
    {
        return $this->hasMany(Student::class, 'kelas_id');
    }

    public function presensiHarian(): HasMany
    {
        return $this->hasMany(PresensiHarian::class, 'kelas_id');
    }

    public function presensiMapel(): HasMany
    {
        return $this->hasMany(PresensiMapel::class, 'kelas_id');
    }

    public function getNamaLengkapAttribute(): string
    {
        return "{$this->nama_kelas} {$this->jurusan}";
    }
}
