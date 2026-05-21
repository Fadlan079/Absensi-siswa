<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Pengguna Sistem</title>
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
        table.data td { padding: 4px 7px; border: 1px solid #ccc; font-size: 9px; vertical-align: middle; }
        table.data tr:nth-child(even) td { background: #f8f9fc; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 10px; font-size: 8px; font-weight: bold; }
        .badge-admin      { background: #dbeafe; color: #1d4ed8; }
        .badge-kepala     { background: #dcfce7; color: #166534; }
        .badge-wali       { background: #fef9c3; color: #854d0e; }
        .badge-sekretaris { background: #fef3c7; color: #92400e; }
        .badge-guru_mapel { background: #f3e8ff; color: #6b21a8; }
        .badge-guru_piket { background: #ffedd5; color: #9a3412; }
        .no { text-align: center; width: 25px; }
        .center { text-align: center; }
        .footer { margin-top: 16px; font-size: 8px; color: #aaa; text-align: center;
                  border-top: 1px solid #eee; padding-top: 6px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Portal Presensi</h1>
        <h2>SMK TI Airlangga Samarinda</h2>
        <p>Daftar Akun Pengguna Sistem</p>
    </div>
    <div class="doc-title">Data Pengguna Sistem — {{ now()->isoFormat('D MMMM Y') }}</div>

    <table class="data">
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Peran</th>
                <th>Kelas</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($users as $i => $u)
            @php
                $roleLabel = [
                    'admin'          => 'Admin',
                    'kepala_sekolah' => 'Kepala Sekolah',
                    'wali_kelas'     => 'Wali Kelas',
                    'sekretaris'     => 'Sekretaris',
                    'guru_mapel'     => 'Guru Mapel',
                    'guru_piket'     => 'Guru Piket',
                ];
                $roleCls = [
                    'admin'          => 'badge-admin',
                    'kepala_sekolah' => 'badge-kepala',
                    'wali_kelas'     => 'badge-wali',
                    'sekretaris'     => 'badge-sekretaris',
                    'guru_mapel'     => 'badge-guru_mapel',
                    'guru_piket'     => 'badge-guru_piket',
                ];
            @endphp
            <tr>
                <td class="no">{{ $i + 1 }}</td>
                <td style="font-weight:bold">{{ $u->name }}</td>
                <td>{{ $u->email }}</td>
                <td class="center">
                    <span class="badge {{ $roleCls[$u->role] ?? 'badge-admin' }}">
                        {{ $roleLabel[$u->role] ?? $u->role }}
                    </span>
                </td>
                <td class="center">{{ $u->kelas ? $u->kelas->nama_kelas.' '.$u->kelas->jurusan : '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Portal Presensi — Dicetak: {{ now()->isoFormat('D MMMM Y, HH:mm') }} &nbsp;|&nbsp; Total: {{ count($users) }} pengguna
    </div>
</body>
</html>
