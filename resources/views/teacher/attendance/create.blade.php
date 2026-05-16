@extends('layouts.dashboard')

@section('title', 'Presensi Kelas')

@section('content')
<div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <nav class="flex mb-2" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 text-xs font-semibold uppercase tracking-wider">
                    <li class="text-muted">Presensi</li>
                    <li class="text-muted"><i class="fa-solid fa-chevron-right mx-2 text-[10px]"></i></li>
                    <li class="text-primary">{{ $kelas }} {{ $jurusan }}</li>
                </ol>
            </nav>
            <h1 class="text-2xl font-bold text-text">Daftar Kehadiran Siswa</h1>
            <p class="text-muted text-sm">Silahkan tandai kehadiran siswa sesuai dengan kondisi di kelas.</p>
        </div>

        <div class="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 bg-bg rounded-full flex items-center justify-center text-primary">
                <i class="fa-solid fa-calendar-day"></i>
            </div>
            <div>
                <p class="text-sm font-bold text-text">{{ date('d F Y') }}</p>
            </div>
        </div>
    </div>

    <form action="{{ route('attendance.store') }}" method="POST" class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        @csrf
        <input type="hidden" name="kelas" value="{{ $kelas }}">
        <input type="hidden" name="jurusan" value="{{ $jurusan }}">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-200">
                        <th class="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider w-16">No</th>
                        <th class="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Nama Siswa</th>
                        <th class="px-4 py-4 text-xs font-bold text-muted uppercase tracking-wider text-center">Hadir</th>
                        <th class="px-4 py-4 text-xs font-bold text-muted uppercase tracking-wider text-center">Sakit</th>
                        <th class="px-4 py-4 text-xs font-bold text-muted uppercase tracking-wider text-center">Izin</th>
                        <th class="px-4 py-4 text-xs font-bold text-muted uppercase tracking-wider text-center">Alpha</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @foreach ($students as $index => $s)
                    <tr class="hover:bg-bg/50 transition-colors group">
                        <td class="px-6 py-4 text-sm font-bold text-muted">{{ $index + 1 }}</td>
                        <td class="px-6 py-4">
                            <span class="text-sm font-bold text-text group-hover:text-primary transition-colors">{{ $s->nama }}</span>
                        </td>

                        <td class="px-4 py-4 text-center">
                            <label class="inline-flex items-center justify-center cursor-pointer group/radio">
                                <input type="radio" name="attendance[{{ $s->id }}]" value="Hadir" class="hidden peer" checked>
                                <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-success peer-checked:bg-success transition-all">
                                    <i class="fa-solid fa-check text-[10px] text-white opacity-0 peer-checked:opacity-100"></i>
                                </div>
                            </label>
                        </td>

                        <td class="px-4 py-4 text-center">
                            <label class="inline-flex items-center justify-center cursor-pointer">
                                <input type="radio" name="attendance[{{ $s->id }}]" value="Sakit" class="hidden peer">
                                <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all">
                                    <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                                </div>
                            </label>
                        </td>

                        <td class="px-4 py-4 text-center">
                            <label class="inline-flex items-center justify-center cursor-pointer">
                                <input type="radio" name="attendance[{{ $s->id }}]" value="Izin" class="hidden peer">
                                <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-warning peer-checked:bg-warning transition-all">
                                    <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                                </div>
                            </label>
                        </td>

                        <td class="px-4 py-4 text-center">
                            <label class="inline-flex items-center justify-center cursor-pointer">
                                <input type="radio" name="attendance[{{ $s->id }}]" value="Alpha" class="hidden peer">
                                <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-danger peer-checked:bg-danger transition-all">
                                    <i class="fa-solid fa-xmark text-[10px] text-white opacity-0 peer-checked:opacity-100"></i>
                                </div>
                            </label>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-xs font-semibold text-muted italic">
                Pastikan data sudah diperiksa sebelum menekan tombol simpan.
            </div>
            <button type="submit" class="w-full md:w-auto bg-primary hover:bg-primary-light text-white px-8 py-2.5 rounded font-bold shadow-md transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-floppy-disk"></i> Simpan Presensi
            </button>
        </div>
    </form>
</div>
@endsection
