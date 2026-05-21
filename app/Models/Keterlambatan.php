<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Keterlambatan extends Model
{
    protected $table = 'keterlambatan';

    protected $fillable = [
        'siswa_id', 'tanggal', 'jam_datang',
        'alasan', 'catatan', 'sanksi', 'guru_piket_id',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'siswa_id');
    }

    public function guruPiket(): BelongsTo
    {
        return $this->belongsTo(User::class, 'guru_piket_id');
    }
}
