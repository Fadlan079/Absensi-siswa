<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Kelas</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 10px; color: #1a1a1a; }
        .header { text-align: center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #1E4C89; }
        .header h1 { font-size: 13px; font-weight: bold; text-transform: uppercase; }
        .header h2 { font-size: 11px; font-weight: bold; margin-top: 3px; }
        .header p  { font-size: 9px; color: #555; margin-top: 2px; }
        .doc-title { text-align: center; font-size: 11px; font-weight: bold; text-transform: uppercase;
                     letter-spacing: 1px; margin: 10px 0 8px 0; color: #1E4C89; }
        table.data { width: 100%; border-collapse: collapse; }
        table.data th { background: #1E4C89; color: #fff; padding: 6px 8px; font-size: 9px;
                        text-align: center; border: 1px solid #1E4C89; text-transform: uppercase; }
        table.data td { padding: 5px 8px; border: 1px solid #ccc; font-size: 9px; vertical-align: middle; }
        table.data tr:nth-child(even) td { background: #f8f9fc; }
        .no { text-align: center; width: 25px; color: #555; }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .count { text-align: center; font-weight: bold; color: #1E4C89; }
        .footer { margin-top: 16px; font-size: 8px; color: #aaa; text-align: center;
                  border-top: 1px solid #eee; padding-top: 6px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Portal Presensi</h1>
        <h2>SMK TI Airlangga Samarinda</h2>
        <p>Daftar Kelas Aktif — Tahun Ajaran 2025/2026</p>
    </div>
    <div class="doc-title">Data Kelas — {{ now()->isoFormat('D MMMM Y') }}</div>

    <table class="data">
        <thead>
            <tr>
                <th>No</th>
                <th>Kelas</th>
                <th>Jurusan</th>
                <th>Wali Kelas</th>
                <th>Jml Siswa</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($kelas as $i => $k)
            <tr>
                <td class="no">{{ $i + 1 }}</td>
                <td class="bold">{{ $k->nama_kelas }}</td>
                <td>{{ $k->jurusan }}</td>
                <td>{{ $k->waliKelas?->name ?? '-' }}</td>
                <td class="count">{{ $k->siswa_count }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Portal Presensi — Dicetak: {{ now()->isoFormat('D MMMM Y, HH:mm') }} &nbsp;|&nbsp; Total: {{ count($kelas) }} kelas
    </div>
</body>
</html>
