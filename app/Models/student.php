<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class student extends Model
{    protected $fillable = [
        "nisn",
        "nama",
        "kelas",
        "jurusan"
    ];

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }
}
