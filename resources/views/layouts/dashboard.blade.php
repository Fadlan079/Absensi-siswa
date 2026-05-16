<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Absensi Siswa') }} - @yield('title')</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700,800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="icon" type="image/svg+xml" href="{{ asset('logo.png') }}">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-bg text-text overflow-hidden">

    <div class="flex h-screen w-full">

        <aside class="w-64 bg-primary h-screen flex flex-col shadow-2xl shrink-0 transition-transform transform -translate-x-full md:translate-x-0 absolute md:relative top-0 left-0 z-40">

            <div class="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
                <div class="w-9 h-9 rounded flex items-center justify-center text-primary font-black text-lg mr-3 shadow-sm">
                    <img src="{{ asset('logo2.png') }}" alt="">
                </div>
                <div class="flex flex-col">
                    <span class="text-white font-bold text-sm tracking-wide uppercase leading-tight">SMKTI Airlangga</span>
                    <span class="text-secondary text-xs font-semibold">Sistem Presensi</span>
                </div>
            </div>

            <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <a href="/dashboard" class="flex items-center gap-3 px-4 py-3 bg-white/10 text-secondary rounded-lg font-bold transition border-l-4 border-secondary">
                    <i class="fa-solid fa-house w-5 text-center text-lg"></i>
                    <span class="text-sm">Home</span>
                </a>
            </nav>

            <div class="p-4 border-t border-white/10 bg-primary-light/10 shrink-0">
                <div class="flex items-center gap-3 px-2 mb-4">
                    <div class="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold">
                        {{ substr(Auth::user()->name ?? 'G', 0, 1) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-white truncate">{{ Auth::user()->name ?? 'Nama Guru' }}</p>
                        <p class="text-xs text-secondary truncate">{{ Auth::user()->role ?? 'Role' }}</p>
                    </div>
                </div>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-danger/80 hover:bg-danger text-white rounded font-bold transition text-sm shadow-sm">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i> Keluar
                    </button>
                </form>
            </div>
        </aside>

        <main class="flex-1 h-screen overflow-y-auto bg-bg relative">

            <div class="md:hidden flex items-center justify-between bg-white px-4 h-16 border-b border-gray-200 sticky top-0 z-30">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded flex items-center justify-center text-primary font-bold text-sm">
                        <img src="{{ asset('logo.png') }}" alt="">
                    </div>
                    <span class="font-bold text-primary">Sistem Presensi</span>
                </div>
                <button id="mobile-menu-btn" class="text-text hover:text-primary p-2">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
            </div>

            @if(session('error'))
                <div class="mt-4 mx-4 md:mx-8 flex items-center gap-3 p-4 rounded-lg bg-primary border-l-4 border-secondary shadow-md relative overflow-hidden">
                    <div class="absolute inset-0 bg-secondary opacity-5 pointer-events-none"></div>
                    <div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 z-10">
                        <i class="fa-solid fa-triangle-exclamation text-secondary text-lg"></i>
                    </div>
                    <div class="flex-1 z-10">
                        <p class="text-white text-sm font-medium">{{ session('error') }}</p>
                    </div>
                    <button type="button" onclick="this.parentElement.remove()" class="text-white/60 hover:text-secondary transition-colors z-10 p-2">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
            @endif

            @if(session('success'))
                <div class="mt-4 mx-4 md:mx-8 flex items-center gap-3 p-4 rounded-lg bg-primary border-l-4 border-secondary shadow-md relative overflow-hidden">
                    <div class="absolute inset-0 bg-secondary opacity-5 pointer-events-none"></div>
                    <div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 z-10">
                        <i class="fa-solid fa-circle-check text-secondary text-lg"></i>
                    </div>
                    <div class="flex-1 z-10">
                        <h4 class="text-secondary font-bold text-xs uppercase tracking-wider mb-0.5">Berhasil</h4>
                        <p class="text-white text-sm font-medium">{{ session('success') }}</p>
                    </div>
                    <button type="button" onclick="this.parentElement.remove()" class="text-white/60 hover:text-secondary transition-colors z-10 p-2">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
            @endif

            <main class="p-4 md:p-8">
                @yield('content')
            </main>
        </main>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const btn = document.getElementById('mobile-menu-btn');
            const sidebar = document.querySelector('aside');

            if(btn && sidebar) {
                btn.addEventListener('click', () => {
                    sidebar.classList.toggle('-translate-x-full');
                });
            }
        });
    </script>
</body>
</html>
