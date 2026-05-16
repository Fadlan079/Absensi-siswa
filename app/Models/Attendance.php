<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'student_id',
        'tipe',
        'mapel',
        'keterangan',
        'tanggal',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
