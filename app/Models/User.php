<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'kelas_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // ─── Role Helpers ──────────────────────────────────────────

    public function isAdmin(): bool            { return $this->role === 'admin'; }
    public function isKepalaSekolah(): bool     { return $this->role === 'kepala_sekolah'; }
    public function isWaliKelas(): bool         { return $this->role === 'wali_kelas'; }
    public function isSekretaris(): bool        { return $this->role === 'sekretaris'; }
    public function isGuruMapel(): bool         { return $this->role === 'guru_mapel'; }
    public function isGuruPiket(): bool         { return $this->role === 'guru_piket'; }

    public function getDashboardRouteAttribute(): string
    {
        return match($this->role) {
            'admin'           => 'admin.dashboard',
            'kepala_sekolah'  => 'kepala_sekolah.dashboard',
            'wali_kelas'      => 'wali_kelas.dashboard',
            'sekretaris'      => 'sekretaris.dashboard',
            'guru_mapel'      => 'guru_mapel.dashboard',
            'guru_piket'      => 'guru_piket.dashboard',
            default           => 'dashboard',
        };
    }

    public function getRoleLabelAttribute(): string
    {
        return match($this->role) {
            'admin'           => 'Administrator',
            'kepala_sekolah'  => 'Kepala Sekolah',
            'wali_kelas'      => 'Wali Kelas',
            'sekretaris'      => 'Sekretaris Kelas',
            'guru_mapel'      => 'Guru Mata Pelajaran',
            'guru_piket'      => 'Guru Piket',
            default           => 'Pengguna',
        };
    }

    // ─── Relationships ──────────────────────────────────────────

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    /** Kelas yang di-wali oleh user ini */
    public function kelasWali(): HasMany
    {
        return $this->hasMany(Kelas::class, 'wali_kelas_id');
    }

    /** Mapel yang diajar oleh user ini */
    public function mapel(): HasMany
    {
        return $this->hasMany(Mapel::class, 'guru_id');
    }

    public function notifikasi(): HasMany
    {
        return $this->hasMany(Notifikasi::class, 'user_id');
    }

    public function notifikasiBelumDibaca(): HasMany
    {
        return $this->hasMany(Notifikasi::class, 'user_id')->where('is_read', false);
    }
}
