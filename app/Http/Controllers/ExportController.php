<?php

namespace App\Http\Controllers;

use App\Exports\RekapBulananExport;
use App\Exports\RekapSemesterExport;
use App\Models\Kelas;
use App\Models\PresensiHarian;
use App\Models\PresensiHarianDetail;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    /**
     * Export rekap bulanan ke Excel
     */
    public function rekapBulananExcel(Request $request)
    {
        $kelasId = $request->input('kelas_id');
        $bulan   = (int) $request->input('bulan', Carbon::now()->month);
        $tahun   = (int) $request->input('tahun', Carbon::now()->year);

        $kelas   = Kelas::findOrFail($kelasId);
        $bulanList = ['', 'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        $namaFile = "Rekap_{$kelas->nama_kelas}{$kelas->jurusan}_{$bulanList[$bulan]}{$tahun}.xlsx";

        return Excel::download(new RekapBulananExport($kelasId, $bulan, $tahun), $namaFile);
    }

    /**
     * Export rekap bulanan ke PDF
     */
    public function rekapBulananPdf(Request $request)
    {
        $kelasId = $request->input('kelas_id');
        $bulan   = (int) $request->input('bulan', Carbon::now()->month);
        $tahun   = (int) $request->input('tahun', Carbon::now()->year);

        $kelas   = Kelas::findOrFail($kelasId);
        $bulanList = ['', 'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

        $presensiIds = PresensiHarian::where('kelas_id', $kelasId)
            ->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun)
            ->pluck('id');

        $rekap = Student::where('kelas_id', $kelasId)->orderBy('nama')->get()->map(function ($s, $i) use ($presensiIds) {
            $detail = PresensiHarianDetail::where('siswa_id', $s->id)->whereIn('presensi_id', $presensiIds)->get();
            $hadir = $detail->where('status', 'hadir')->count();
            $total = $detail->count();
            return [
                'no'    => $i + 1,
                'nama'  => $s->nama,
                'nis'   => $s->nis,
                'hadir' => $hadir,
                'sakit' => $detail->where('status', 'sakit')->count(),
                'izin'  => $detail->where('status', 'izin')->count(),
                'alpha' => $detail->where('status', 'alpha')->count(),
                'total' => $total,
                'persen'=> $total > 0 ? round(($hadir / $total) * 100, 1) : 0,
            ];
        });

        $totalHari = PresensiHarian::where('kelas_id', $kelasId)
            ->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun)->count();

        $pdf = Pdf::loadView('exports.rekap-bulanan', [
            'kelas'      => $kelas,
            'rekap'      => $rekap,
            'bulan_nama' => $bulanList[$bulan],
            'tahun'      => $tahun,
            'total_hari' => $totalHari,
        ])->setPaper('a4', 'landscape');

        $namaFile = "Rekap_{$kelas->nama_kelas}{$kelas->jurusan}_{$bulanList[$bulan]}{$tahun}.pdf";
        return $pdf->download($namaFile);
    }

    /**
     * Export rekap semester ke Excel
     */
    public function rekapSemesterExcel(Request $request)
    {
        $kelasId = $request->input('kelas_id');
        $now = Carbon::now();
        $semester = (int) $request->input('semester', $now->month >= 7 ? 1 : 2);
        $tahun = (int) $request->input('tahun', $now->year);

        $kelas = Kelas::findOrFail($kelasId);
        $namaFile = "Rekap_Semester_{$semester}_{$kelas->nama_kelas}{$kelas->jurusan}_{$tahun}.xlsx";

        return Excel::download(new RekapSemesterExport($kelasId, $semester, $tahun), $namaFile);
    }

    /**
     * Export rekap semester ke PDF
     */
    public function rekapSemesterPdf(Request $request)
    {
        $kelasId = $request->input('kelas_id');
        $now = Carbon::now();
        $semester = (int) $request->input('semester', $now->month >= 7 ? 1 : 2);
        $tahun = (int) $request->input('tahun', $now->year);

        $kelas = Kelas::findOrFail($kelasId);

        $bulanRange = $semester == 1
            ? [7, 8, 9, 10, 11, 12]
            : [1, 2, 3, 4, 5, 6];

        $presensiIds = PresensiHarian::where('kelas_id', $kelasId)
            ->whereYear('tanggal', $tahun)
            ->whereIn(DB::raw('MONTH(tanggal)'), $bulanRange)
            ->pluck('id');

        $rekap = Student::where('kelas_id', $kelasId)->orderBy('nama')->get()->map(function ($s, $i) use ($presensiIds) {
            $detail = PresensiHarianDetail::where('siswa_id', $s->id)->whereIn('presensi_id', $presensiIds)->get();
            $hadir = $detail->where('status', 'hadir')->count();
            $total = $detail->count();
            return [
                'no'    => $i + 1,
                'nama'  => $s->nama,
                'nis'   => $s->nis,
                'hadir' => $hadir,
                'sakit' => $detail->where('status', 'sakit')->count(),
                'izin'  => $detail->where('status', 'izin')->count(),
                'alpha' => $detail->where('status', 'alpha')->count(),
                'total' => $total,
            ];
        });

        $pdf = Pdf::loadView('exports.rekap-semester', [
            'kelas'    => $kelas,
            'rekap'    => $rekap,
            'semester' => $semester,
            'tahun'    => $tahun,
        ])->setPaper('a4', 'landscape');

        $namaFile = "Rekap_Semester_{$semester}_{$kelas->nama_kelas}{$kelas->jurusan}_{$tahun}.pdf";
        return $pdf->download($namaFile);
    }
}
