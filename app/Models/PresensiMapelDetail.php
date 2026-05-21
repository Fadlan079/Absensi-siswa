<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PresensiMapelDetail extends Model
{
    protected $table = 'presensi_mapel_detail';

    protected $fillable = ['presensi_mapel_id', 'siswa_id', 'status'];

    public function presensiMapel(): BelongsTo
    {
        return $this->belongsTo(PresensiMapel::class, 'presensi_mapel_id');
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'siswa_id');
    }
}
