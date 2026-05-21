<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PresensiMapel extends Model
{
    protected $table = 'presensi_mapel';

    protected $fillable = ['mapel_id', 'kelas_id', 'tanggal', 'jam_ke', 'guru_id'];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function mapel(): BelongsTo
    {
        return $this->belongsTo(Mapel::class, 'mapel_id');
    }

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function guru(): BelongsTo
    {
        return $this->belongsTo(User::class, 'guru_id');
    }

    public function detail(): HasMany
    {
        return $this->hasMany(PresensiMapelDetail::class, 'presensi_mapel_id');
    }
}
