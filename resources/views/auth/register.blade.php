@extends('layouts.app')

@section('title', 'Pendaftaran Akun - Portal Presensi')

@section('content')
<div class="min-h-screen flex flex-col justify-center items-center bg-bg px-4 py-12">

    <div class="w-full max-w-md border-t-4 border-primary bg-white px-8 py-10 shadow-xl rounded-b-xl border-x border-b border-gray-200">

        <div class="mb-8 text-center">
            <div class="mx-auto w-12 h-12 flex items-center justify-center rounded text-secondary text-2xl font-bold mb-3">
                <img src="logo.png" alt="">
            </div>
            <h2 class="text-xl font-bold text-text uppercase tracking-wide">Registrasi Akun</h2>
            <p class="text-sm text-muted font-medium mt-1">Sistem Presensi SMKTI Airlangga</p>
        </div>

        <form method="POST" action="{{ route('register') }}" class="space-y-5">
            @csrf

            <div>
                <label for="name" class="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Nama Lengkap
                </label>
                <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus autocomplete="name"
                       class="block w-full rounded border border-gray-300 bg-bg px-4 py-2.5 text-text focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary outline-none transition @error('name') border-danger ring-1 ring-danger @enderror"
                       placeholder="Masukkan nama lengkap Anda">

                @error('name')
                    <p class="mt-2 text-sm font-semibold text-danger">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="email" class="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Email Aktif
                </label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="username"
                       class="block w-full rounded border border-gray-300 bg-bg px-4 py-2.5 text-text focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary outline-none transition @error('email') border-danger ring-1 ring-danger @enderror"
                       placeholder="Masukkan alamat email">

                @error('email')
                    <p class="mt-2 text-sm font-semibold text-danger">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="password" class="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Kata Sandi Baru
                </label>
                <input id="password" type="password" name="password" required autocomplete="new-password"
                       class="block w-full rounded border border-gray-300 bg-bg px-4 py-2.5 text-text focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary outline-none transition @error('password') border-danger ring-1 ring-danger @enderror"
                       placeholder="Buat kata sandi yang kuat">

                @error('password')
                    <p class="mt-2 text-sm font-semibold text-danger">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="password_confirmation" class="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Konfirmasi Kata Sandi
                </label>
                <input id="password_confirmation" type="password" name="password_confirmation" required autocomplete="new-password"
                       class="block w-full rounded border border-gray-300 bg-bg px-4 py-2.5 text-text focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary outline-none transition @error('password_confirmation') border-danger ring-1 ring-danger @enderror"
                       placeholder="Ketik ulang kata sandi">

                @error('password_confirmation')
                    <p class="mt-2 text-sm font-semibold text-danger">{{ $message }}</p>
                @enderror
            </div>

            <div class="pt-6 border-t border-gray-100 mt-6 space-y-4">
                <button type="submit" class="w-full flex justify-center items-center gap-2 bg-primary text-white font-bold py-3 rounded hover:bg-primary-light transition shadow-md">
                    Daftarkan Akun
                </button>

                <div class="text-center">
                    <a href="{{ route('login') }}" class="text-sm font-bold text-muted hover:text-primary transition inline-block">
                        Sudah memiliki akun? <span class="text-primary underline decoration-2 underline-offset-4">Masuk Sekarang</span>
                    </a>
                </div>
            </div>
        </form>

        <div class="mt-8 text-center pt-6 border-t border-gray-50">
            <a href="/" class="text-xs font-bold text-muted hover:text-primary transition inline-flex items-center gap-1">
                <i class="fa-solid fa-arrow-left"></i> Kembali ke Beranda
            </a>
        </div>
    </div>
</div>
@endsection
