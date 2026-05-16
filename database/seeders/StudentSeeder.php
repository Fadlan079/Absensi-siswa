<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\student;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            ["nisn" => "24.2070.2530", "nama" => "ACHMAD FATTAH SAFARAZ", "kelas" => "XI", "jurusan" => "PPLG"],
            ["nisn" => "24.2070.2531", "nama" => "ADITYA NURKHALID INDRAWAN", "kelas" => "XI", "jurusan" => "PPLG"],
            ["nisn" => "24.2070.2532", "nama" => "BARA KAISAR FERNANDEZ", "kelas" => "XI", "jurusan" => "PPLG"],
            ["nisn" => "24.2070.2533", "nama" => "DANIEL ANGJAYA", "kelas" => "XI", "jurusan" => "PPLG"],
            ["nisn" => "24.2070.2534", "nama" => "FADLAN FIRDAUS", "kelas" => "XI", "jurusan" => "PPLG"],
            ["nisn" => "24.2070.2535", "nama" => "FAHRI NOOR ROYYAN", "kelas" => "XI", "jurusan" => "PPLG"],
            ["nisn" => "24.2070.2537", "nama" => "FARIS FATHURRAHMAN", "kelas" => "XI", "jurusan" => "PPLG"],
            ["nisn" => "24.2070.2538", "nama" => "FARREL AZAM KAHUPATI", "kelas" => "XI", "jurusan" => "PPLG"],

            ["nisn" => "24.2070.2540", "nama" => "FLINT REVEL SULISTIO", "kelas" => "XI", "jurusan" => "TJKT"],
            ["nisn" => "24.2070.2541", "nama" => "GLENN MARCHELLINO OKTAVIYANTO", "kelas" => "XI", "jurusan" => "TJKT"],
            ["nisn" => "24.2070.2542", "nama" => "IBNI ABIYYU", "kelas" => "XI", "jurusan" => "TJKT"],
            ["nisn" => "24.2070.2543", "nama" => "KEVIN HERMANSYAH", "kelas" => "XI", "jurusan" => "TJKT"],
            ["nisn" => "24.2070.2544", "nama" => "KEVIN WAHYU EKA PUTRA", "kelas" => "XI", "jurusan" => "TJKT"],
            ["nisn" => "24.2070.2545", "nama" => "LUQMAN AL HAKIM", "kelas" => "XI", "jurusan" => "TJKT"],
            ["nisn" => "24.2070.2547", "nama" => "MICHAEL HERDIRIVAL RAGHO ADO", "kelas" => "XI", "jurusan" => "TJKT"],

            ["nisn" => "24.2070.2548", "nama" => "MICHAEL SAMUEL SANTOSA", "kelas" => "XI", "jurusan" => "MPLB"],
            ["nisn" => "24.2070.2549", "nama" => "MUHAMMAD DANISH HIDAYAT", "kelas" => "XI", "jurusan" => "MPLB"],
            ["nisn" => "24.2070.2550", "nama" => "MUHAMMAD DZAKWAN", "kelas" => "XI", "jurusan" => "MPLB"],
            ["nisn" => "24.2070.2551", "nama" => "MUHAMMAD RAJAWALI SAPUTRA", "kelas" => "XI", "jurusan" => "MPLB"],
            ["nisn" => "24.2070.2553", "nama" => "NABIL FAUZAN MUTAWAKKIL", "kelas" => "XI", "jurusan" => "MPLB"],
            ["nisn" => "24.2070.2554", "nama" => "NATHAN ANDIKA DIL'MA", "kelas" => "XI", "jurusan" => "MPLB"],
            ["nisn" => "24.2070.2555", "nama" => "RADITYA RAKHA WARDHANA", "kelas" => "XI", "jurusan" => "MPLB"],

            ["nisn" => "24.2070.2556", "nama" => "RASYA AULIA RAHMAN FIRLY", "kelas" => "XI", "jurusan" => "DKV"],
            ["nisn" => "24.2070.2557", "nama" => "RAZIEF RAFTANSYAH", "kelas" => "XI", "jurusan" => "DKV"],
            ["nisn" => "24.2070.2558", "nama" => "REYVAN FATAHILLAH AL - AQSHO", "kelas" => "XI", "jurusan" => "DKV"],
            ["nisn" => "24.2070.2560", "nama" => "RICKY SUSANTO WIJAYA", "kelas" => "XI", "jurusan" => "DKV"],
            ["nisn" => "24.2070.2561", "nama" => "SYABIL ATARIAWAN", "kelas" => "XI", "jurusan" => "DKV"],
            ["nisn" => "24.2070.2562", "nama" => "TIARA DWI NUR AZIZAH", "kelas" => "XI", "jurusan" => "DKV"],
            ["nisn" => "24.2070.2564", "nama" => "WINKY TIO PRATAMA", "kelas" => "XI", "jurusan" => "DKV"],
        ];

        foreach ($students as $student) {
            \App\Models\Student::create($student);
        }
    }
}
