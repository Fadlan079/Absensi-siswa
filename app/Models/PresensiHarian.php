<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PresensiHarian extends Model
{
    protected $table = 'presensi_harian';

    protected $fillable = ['kelas_id', 'tanggal', 'created_by'];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function pembuat(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function detail(): HasMany
    {
        return $this->hasMany(PresensiHarianDetail::class, 'presensi_id');
    }

    public function getSummaryAttribute(): array
    {
        return [
            'hadir' => $this->detail()->where('status', 'hadir')->count(),
            'sakit' => $this->detail()->where('status', 'sakit')->count(),
            'izin'  => $this->detail()->where('status', 'izin')->count(),
            'alpha' => $this->detail()->where('status', 'alpha')->count(),
        ];
    }
}
