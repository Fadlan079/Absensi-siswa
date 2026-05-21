<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kode Mata Pelajaran dan Guru Pengajar</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 10px; color: #1a1a1a; }

        .school-header {
            text-align: center;
            margin-bottom: 14px;
            padding-bottom: 10px;
            border-bottom: 2px solid #1E4C89;
        }
        .school-header h1 {
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .school-header h2 {
            font-size: 11px;
            font-weight: bold;
            margin-top: 3px;
            text-transform: uppercase;
        }
        .school-header p { font-size: 9px; color: #444; margin-top: 2px; }

        .doc-title {
            text-align: center;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 12px 0 10px 0;
            color: #1E4C89;
        }

        table.data {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4px;
        }
        table.data th {
            background: #1E4C89;
            color: #fff;
            padding: 6px 8px;
            font-size: 9px;
            text-align: center;
            border: 1px solid #1E4C89;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        table.data td {
            padding: 5px 8px;
            border: 1px solid #ccc;
            font-size: 9px;
            vertical-align: middle;
        }
        table.data tr:nth-child(even) td { background: #f8f9fc; }
        table.data td.kode {
            text-align: center;
            font-weight: bold;
            font-size: 10px;
            color: #fff;
            width: 60px;
        }
        table.data td.no {
            text-align: center;
            color: #555;
            width: 30px;
        }
        table.data td.mapel { font-weight: bold; }
        table.data td.guru  { color: #444; }

        .signature-block {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 9px;
        }
        .sig-box { text-align: center; width: 200px; }
        .sig-box p.title { font-weight: bold; }
        .sig-box .name-line {
            margin-top: 45px;
            border-top: 1px solid #333;
            padding-top: 3px;
            font-weight: bold;
        }
        .sig-box .nip { font-size: 8px; color: #555; margin-top: 1px; }

        .place-date {
            text-align: right;
            font-size: 9px;
            margin-top: 16px;
            margin-bottom: 4px;
            color: #444;
        }

        .footer {
            margin-top: 18px;
            font-size: 8px;
            color: #aaa;
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 6px;
        }
    </style>
</head>
<body>

    {{-- School Header --}}
    <div class="school-header">
        <h1>Jadwal Pelajaran Semester Genap</h1>
        <h2>SMK TI Airlangga Samarinda</h2>
        <p>Tahun Ajaran 2025 / 2026</p>
    </div>

    <div class="doc-title">Kode Mata Pelajaran dan Guru Pengajar</div>

    <table class="data">
        <thead>
            <tr>
                <th>No</th>
                <th>Kode</th>
                <th>Mata Pelajaran</th>
                <th>Guru Pengajar</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($mapel as $i => $m)
                @php
                    // Extract numeric prefix from kode (e.g. "7A" → 7, "12B" → 12)
                    preg_match('/^(\d+)/i', $m['kode_mapel'] ?? '', $match);
                    $num = (int) ($match[1] ?? 0);
                    $colors = [
                        1  => '#C0392B', // red
                        2  => '#E74C3C', // light red
                        3  => '#E67E22', // orange
                        4  => '#F39C12', // amber
                        5  => '#27AE60', // green
                        6  => '#1ABC9C', // teal
                        7  => '#2980B9', // blue
                        8  => '#3498DB', // light blue
                        9  => '#8E44AD', // purple
                        10 => '#9B59B6', // light purple
                        11 => '#2C3E50', // dark navy
                        12 => '#16A085', // dark teal
                        13 => '#D35400', // burnt orange
                        14 => '#C0392B', // dark red
                        15 => '#7F8C8D', // gray
                        16 => '#2ECC71', // emerald
                        17 => '#1ABC9C', // mint
                        18 => '#E74C3C', // crimson
                    ];
                    $bg = $colors[$num] ?? '#555';
                @endphp
                <tr>
                    <td class="no">{{ $i + 1 }}</td>
                    <td class="kode" style="background-color: {{ $bg }};">{{ $m['kode_mapel'] }}</td>
                    <td class="mapel">{{ $m['nama_mapel'] }}</td>
                    <td class="guru">{{ $m['guru'] ?? '-' }}</td>
                </tr>
            @endforeach
            @if (count($mapel) === 0)
            <tr>
                <td colspan="4" style="text-align:center; padding: 16px; color:#999;">
                    Belum ada data mata pelajaran.
                </td>
            </tr>
            @endif
        </tbody>
    </table>

    {{-- Signatures --}}
    <div class="place-date">Samarinda, {{ now()->isoFormat('D MMMM Y') }}</div>

    <div class="signature-block">
        <div class="sig-box">
            <p class="title">Kepala Sekolah,</p>
            <div class="name-line">Muhammad Yani, S.Kom., M.T.I.</div>
        </div>
        <div class="sig-box">
            <p class="title">Waka. Kurikulum,</p>
            <div class="name-line">Dewi Septyani, S.Kom</div>
        </div>
    </div>

    <div class="footer">
        Portal Presensi — Dicetak: {{ now()->isoFormat('D MMMM Y, HH:mm') }}
    </div>

</body>
</html>
