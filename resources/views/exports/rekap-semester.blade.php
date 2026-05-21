<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Rekap Presensi Semester</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 10px; color: #1a1a1a; }
        .header { text-align: center; margin-bottom: 16px; }
        .header h1 { font-size: 14px; font-weight: bold; text-transform: uppercase; }
        .header p { font-size: 10px; color: #555; margin-top: 2px; }
        .info { margin-bottom: 12px; }
        .info table { width: 100%; }
        .info td { padding: 2px 6px; font-size: 10px; }
        .info td:first-child { font-weight: bold; width: 120px; }
        table.data { width: 100%; border-collapse: collapse; margin-top: 8px; }
        table.data th { background: #1E4C89; color: #fff; padding: 5px 6px; font-size: 9px; text-align: center; border: 1px solid #1E4C89; }
        table.data td { padding: 4px 6px; border: 1px solid #ddd; font-size: 9px; }
        table.data tr:nth-child(even) td { background: #f5f8ff; }
        table.data td.nama { text-align: left; }
        table.data td.center { text-align: center; }
        .kritis { color: #dc2626; font-weight: bold; }
        .baik { color: #16a34a; }
        .footer { margin-top: 20px; text-align: right; font-size: 9px; color: #888; }
        .ttd { margin-top: 30px; display: flex; justify-content: flex-end; }
        .ttd-box { text-align: center; }
        .ttd-box .garis { margin-top: 40px; border-top: 1px solid #333; padding-top: 4px; font-size: 9px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Portal Presensi</h1>
        <p>Rekap Presensi Harian — Semester {{ $semester }} Tahun {{ $tahun }}</p>
        <p>Kelas {{ $kelas->nama_kelas }} {{ $kelas->jurusan }}</p>
    </div>

    <div class="info">
        <table>
            <tr><td>Kelas</td><td>: {{ $kelas->nama_kelas }} {{ $kelas->jurusan }}</td></tr>
            <tr><td>Periode</td><td>: Semester {{ $semester }} / {{ $tahun }} ({{ $semester == 1 ? 'Juli - Desember' : 'Januari - Juni' }})</td></tr>
            <tr><td>Jumlah Siswa</td><td>: {{ $rekap->count() }} siswa</td></tr>
        </table>
    </div>

    <table class="data">
        <thead>
            <tr>
                <th>No</th>
                <th>NIS</th>
                <th>Nama Siswa</th>
                <th>Hadir</th>
                <th>Sakit</th>
                <th>Izin</th>
                <th>Alpha</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($rekap as $s)
            <tr>
                <td class="center">{{ $s['no'] }}</td>
                <td class="center">{{ $s['nis'] }}</td>
                <td class="nama">{{ $s['nama'] }}</td>
                <td class="center {{ $s['hadir'] > 0 ? 'baik' : '' }}">{{ $s['hadir'] }}</td>
                <td class="center">{{ $s['sakit'] }}</td>
                <td class="center">{{ $s['izin'] }}</td>
                <td class="center {{ $s['alpha'] >= 10 ? 'kritis' : '' }}">{{ $s['alpha'] }}</td>
                <td class="center">{{ $s['total'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="ttd">
        <div class="ttd-box">
            <p>Wali Kelas,</p>
            <div class="garis">
                {{ $kelas->waliKelas?->name ?? '............................' }}
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Dicetak: {{ now()->isoFormat('D MMMM Y, HH:mm') }}</p>
    </div>
</body>
</html>
