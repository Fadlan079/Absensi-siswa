@extends('layouts.dashboard')

@section('title', 'Dashboard')

@section('content')
<section class="p-5">
    <div class="bg-primary p-2 rounded-lg shadow-md border-b-[5px] border-secondary relative overflow-hidden">

    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute -top-16 -right-16 w-64 h-64 bg-white opacity-[0.03] rounded-full blur-2xl"></div>
        <div class="absolute top-1/4 right-1/3 w-2 h-2 bg-white rounded-full opacity-40 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
        <div class="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full"></div>
        <div class="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-30 transform rotate-45"></div>
        <div class="absolute bottom-8 left-12 w-3 h-3 border-2 border-white/20 rounded-full"></div>
    </div>

    <div class="relative z-10 px-4 py-8 md:px-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-8">

        <div class="w-full md:w-2/3 space-y-4">
            <h2 class="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                Sistem Manajemen <br>
                <span class="text-secondary">Presensi Kelas</span>
            </h2>
            <p class="text-gray-200 text-sm md:text-base max-w-md leading-relaxed">
                Memudahkan pengguna mencatat kehadiran siswa tanpa perlu menggunakan kertas.
            </p>
        </div>

        <div class="hidden md:flex w-1/3 justify-end items-center pr-6">
            <div class="relative bg-white rounded-lg shadow-2xl w-28 h-36 border-t-[14px] border-gray-200 flex flex-col justify-center px-4 gap-3.5 transform rotate-3">

                <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-4 bg-gray-300 rounded-full border-[3px] border-white shadow-sm"></div>

                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded border-2 border-text flex items-center justify-center">
                        <i class="fa-solid fa-check text-[10px] text-text"></i>
                    </div>
                    <div class="h-1.5 w-12 bg-gray-300 rounded"></div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded border-2 border-text flex items-center justify-center">
                        <i class="fa-solid fa-check text-[10px] text-text"></i>
                    </div>
                    <div class="h-1.5 w-16 bg-gray-300 rounded"></div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded border-2 border-gray-300"></div>
                    <div class="h-1.5 w-10 bg-gray-200 rounded"></div>
                </div>

                <div class="absolute -right-6 -bottom-4 bg-secondary text-text w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-[4px] border-primary transform -rotate-6 transition hover:scale-110 cursor-default">
                    <i class="fa-solid fa-check text-2xl font-black"></i>
                </div>
            </div>
        </div>

    </div>
</div>
</section>

<section class="p-5">
    <div class="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3 border-l-[5px] border-secondary rounded-lg bg-secondary/10 py-3 px-4">
        <h2 class="font-bold text-text text-lg whitespace-nowrap">Pilih Kelas</h2>

        <form action="" class="flex items-center gap-2 w-full md:w-auto">
            <input type="search"
                class="w-full md:w-72 p-2.5 rounded border border-gray-300 bg-white text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                placeholder="Masukkan nama kelas...">
            <button type="submit"
                    class="bg-primary hover:bg-primary-light text-white px-4 py-2.5 rounded transition shadow-sm shrink-0 flex items-center justify-center">
                <i class="fa-solid fa-search text-sm"></i>
            </button>
        </form>
    </div>
</section>

<section class="p-4 sm:p-5">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        @foreach ($class as $c)
        <a href="{{ route('attendance.create', ['kelas' => $c->kelas, 'jurusan' => $c->jurusan]) }}"
           class="flex flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border-l-[5px] border-secondary min-w-0 gap-3">

            <div class="flex-shrink-0 flex items-center justify-center bg-primary text-white shadow-lg rounded-full w-12 h-12">
                <i class="fa-solid fa-user text-lg"></i>
            </div>

            <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <h3 class="text-text font-bold text-base sm:text-lg truncate">{{ $c->kelas }}</h3>
                    <h3 class="text-text font-bold text-base sm:text-lg truncate">{{ $c->jurusan }}</h3>
                </div>
                <p class="text-gray-500 text-xs sm:text-sm truncate">{{ $c->total }} siswa</p>
            </div>

            <div class="flex-shrink-0 pl-1">
                <i class="fa-solid fa-chevron-right text-primary text-lg sm:text-xl"></i>
            </div>
        </a>
        @endforeach
    </div>
</section>
@endsection
