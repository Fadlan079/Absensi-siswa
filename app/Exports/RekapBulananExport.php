<?php

namespace App\Exports;

use App\Models\Kelas;
use App\Models\PresensiHarian;
use App\Models\PresensiHarianDetail;
use App\Models\Student;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RekapBulananExport implements FromCollection, WithHeadings, WithTitle, ShouldAutoSize, WithStyles
{
    public function __construct(
        private int $kelas_id,
        private int $bulan,
        private int $tahun
    ) {}

    public function collection()
    {
        $kelas = Kelas::findOrFail($this->kelas_id);

        $presensiIds = PresensiHarian::where('kelas_id', $this->kelas_id)
            ->whereMonth('tanggal', $this->bulan)
            ->whereYear('tanggal', $this->tahun)
            ->pluck('id');

        return Student::where('kelas_id', $this->kelas_id)
            ->orderBy('nama')
            ->get()
            ->map(function ($s, $i) use ($presensiIds) {
                $detail = PresensiHarianDetail::where('siswa_id', $s->id)
                    ->whereIn('presensi_id', $presensiIds)->get();
                $hadir = $detail->where('status', 'hadir')->count();
                $total = $detail->count();
                return [
                    'No'     => $i + 1,
                    'NIS'    => $s->nis,
                    'Nama'   => $s->nama,
                    'JK'     => $s->jenis_kelamin,
                    'Hadir'  => $hadir,
                    'Sakit'  => $detail->where('status', 'sakit')->count(),
                    'Izin'   => $detail->where('status', 'izin')->count(),
                    'Alpha'  => $detail->where('status', 'alpha')->count(),
                    'Total'  => $total,
                    '%Hadir' => $total > 0 ? round(($hadir / $total) * 100, 1) . '%' : '0%',
                ];
            });
    }

    public function headings(): array
    {
        return ['No', 'NIS', 'Nama Siswa', 'JK', 'Hadir', 'Sakit', 'Izin', 'Alpha', 'Total Hari', '% Kehadiran'];
    }

    public function title(): string
    {
        $bulanList = ['', 'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        return "Rekap {$bulanList[$this->bulan]} {$this->tahun}";
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E4C89']], 'font' => ['color' => ['rgb' => 'FFFFFF'], 'bold' => true]],
        ];
    }
}
