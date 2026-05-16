@extends('layouts.app')

@section('title', 'Otorisasi Masuk - Portal Presensi')

@section('content')
<div class="min-h-screen flex flex-col justify-center items-center bg-bg px-4 py-8">

    <div class="w-full max-w-md border-t-4 border-primary bg-white px-8 py-10 shadow-xl rounded-b-xl border-x border-b border-gray-200">

        <div class="mb-8 text-center">
            <div class="mx-auto w-12 h-12 flex items-center justify-center rounded text-secondary text-2xl font-bold mb-3">
                <img src="logo.png" alt="">
            </div>
            <h2 class="text-xl font-bold text-text uppercase tracking-wide">Sistem Presensi</h2>
            <p class="text-sm text-muted font-medium mt-1">SMKTI Airlangga Samarinda</p>
        </div>

        @if (session('status'))
            <div class="mb-4 p-3 bg-success/10 border border-success/20 rounded text-sm font-semibold text-success text-center">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}" class="space-y-6">
            @csrf

            <div>
                <label for="email" class="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Email Terdaftar
                </label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus autocomplete="username"
                       class="block w-full rounded border border-gray-300 bg-bg px-4 py-2.5 text-text focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary outline-none transition @error('email') border-danger ring-1 ring-danger @enderror"
                       placeholder="Masukkan alamat email">

                @error('email')
                    <p class="mt-2 text-sm font-semibold text-danger">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="password" class="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Kata Sandi
                </label>
                <input id="password" type="password" name="password" required autocomplete="current-password"
                       class="block w-full rounded border border-gray-300 bg-bg px-4 py-2.5 text-text focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary outline-none transition @error('password') border-danger ring-1 ring-danger @enderror"
                       placeholder="Masukkan kata sandi">

                @error('password')
                    <p class="mt-2 text-sm font-semibold text-danger">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex items-center justify-between pt-2">
                <label for="remember_me" class="inline-flex items-center cursor-pointer">
                    <input id="remember_me" type="checkbox" name="remember"
                           class="w-4 h-4 rounded border-gray-300 text-primary shadow-sm focus:ring-primary cursor-pointer">
                    <span class="ms-2 text-sm font-semibold text-text">Ingat Sesi</span>
                </label>

                @if (Route::has('password.request'))
                    <a class="text-sm font-bold text-primary hover:text-primary-light transition" href="{{ route('password.request') }}">
                        Lupa Sandi?
                    </a>
                @endif
            </div>

            <div class="pt-4 border-t border-gray-100">
                <button type="submit" class="w-full flex justify-center items-center gap-2 bg-primary text-white font-bold py-3 rounded hover:bg-primary-light transition shadow-md">
                    Masuk Sekarang
                </button>
            </div>
        </form>

        <div class="flex flex-col items-center gap-6 mt-8 text-center pt-6 border-t border-gray-50">
            <a href="{{ route('register') }}" class="text-xs font-bold text-muted hover:text-primary transition inline-flex items-center gap-1 mb-2">
                Belum Punya Akun? Daftar Sekarang!
            </a>
            <a href="/" class="text-xs font-bold text-muted hover:text-primary transition inline-flex items-center gap-1 mb-2">
                <i class="fa-solid fa-arrow-left"></i> Kembali ke Beranda
            </a>
        </div>
    </div>
</div>
@endsection
