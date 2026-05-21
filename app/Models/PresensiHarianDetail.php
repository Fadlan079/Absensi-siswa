<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PresensiHarianDetail extends Model
{
    protected $table = 'presensi_harian_detail';

    protected $fillable = ['presensi_id', 'siswa_id', 'status', 'catatan'];

    public function presensiHarian(): BelongsTo
    {
        return $this->belongsTo(PresensiHarian::class, 'presensi_id');
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'siswa_id');
    }
}
