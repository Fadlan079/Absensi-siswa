<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mapel extends Model
{
    protected $table = 'mapel';

    protected $fillable = ['nama_mapel', 'kode_mapel', 'guru_id'];

    public function guru(): BelongsTo
    {
        return $this->belongsTo(User::class, 'guru_id');
    }

    public function presensiMapel(): HasMany
    {
        return $this->hasMany(PresensiMapel::class, 'mapel_id');
    }
}
