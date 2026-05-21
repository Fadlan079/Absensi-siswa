@extends('layouts.app')

@section('title', 'Portal Presensi')

@section('content')
<nav class="border-b border-secondary bg-white sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 flex items-center justify-center rounded text-secondary text-xl font-bold">
                    <img src="logo.png" alt="Portal Presensi">
                </div>
                <div>
                    <h1 class="text-primary font-bold text-lg leading-tight uppercase tracking-wide">Portal Presensi</h1>
                    <p class="text-muted text-xs font-medium uppercase tracking-widest">Sistem Presensi</p>
                </div>
            </div>

            <div class="hidden md:flex space-x-8">
                <a href="#beranda" class="text-text font-semibold hover:text-primary transition">Beranda</a>
                <a href="#alur" class="text-muted font-semibold hover:text-primary transition">Cara Penggunaan</a>
            </div>

            <div class="hidden md:flex">
                <a href="/login" class="bg-primary text-white px-5 py-2.5 rounded font-semibold hover:bg-primary-light transition flex items-center gap-2">
                    Masuk <i class="fa-solid fa-arrow-right text-sm"></i>
                </a>
            </div>
        </div>
    </div>
</nav>

<section id="beranda" class="py-16 md:py-24 bg-bg relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div class="space-y-6">
                <h2 class="text-4xl md:text-5xl font-bold text-text leading-tight tracking-tight">
                    Presensi Kelas <br>
                    <span class="text-primary">Lebih Cepat,</span> <br>
                    Tanpa Kertas.
                </h2>
                <p class="text-muted text-lg font-medium max-w-lg leading-relaxed border-l-4 border-secondary pl-4">
                    Sistem pencatatan kehadiran siswa harian. Dirancang khusus untuk mempermudah tugas Bapak/Ibu Guru dan Wali Kelas dalam merekap absensi.
                </p>

                <div class="flex gap-4 pt-4">
                    <a href="/login" class="bg-secondary text-text px-6 py-3 rounded font-bold hover:bg-warning transition shadow-sm border border-yellow-400">
                        Buka Form Presensi
                    </a>
                </div>
            </div>

            <div class="hidden lg:block relative">
                <div class="absolute -inset-4 bg-primary/5 rounded-2xl transform rotate-2"></div>

                <div class="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md shadow-xl relative z-10 mx-auto">
                    <div class="flex justify-between items-end mb-5 pb-4 border-b border-gray-100">
                        <div>
                            <div class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Mata Pelajaran</div>
                            <div class="font-bold text-primary text-lg">Dasar Dasar PPLG</div>
                        </div>
                        <div class="text-right">
                            <div class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Kelas</div>
                            <div class="font-bold text-text text-lg">XI PPLG</div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 bg-bg rounded border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">1</div>
                                <span class="font-semibold text-text text-sm">Achmad Fattah Safaraz</span>
                            </div>
                            <div class="flex gap-1.5">
                                <div class="w-7 h-7 rounded bg-success text-white flex items-center justify-center shadow-sm text-xs"><i class="fa-solid fa-check"></i></div>
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">S</div>
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">I</div>
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">A</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-red-50 rounded border border-red-100">
                            <div class="flex items-center gap-3">
                                <div class="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">2</div>
                                <span class="font-semibold text-text text-sm">Nathan Andik A Dilma</span>
                            </div>
                            <div class="flex gap-1.5">
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs"><i class="fa-solid fa-check"></i></div>
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">S</div>
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">I</div>
                                <div class="w-7 h-7 rounded bg-danger text-white flex items-center justify-center shadow-sm text-xs">A</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-bg rounded border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">3</div>
                                <span class="font-semibold text-text text-sm">Farrel Azzam Kahupati</span>
                            </div>
                            <div class="flex gap-1.5">
                                <div class="w-7 h-7 rounded bg-success text-white flex items-center justify-center shadow-sm text-xs"><i class="fa-solid fa-check"></i></div>
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">S</div>
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">I</div>
                                <div class="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">A</div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 pt-4 border-t border-gray-100">
                        <button class="w-full bg-primary text-white font-semibold py-2.5 rounded text-sm">
                            Simpan Data Kehadiran
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="alur" class="py-20 bg-white border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
            <h2 class="text-2xl font-bold text-text mb-2">Cara Kerja Sistem</h2>
            <p class="text-muted">Proses pengisian presensi dirancang sesederhana mungkin untuk efisiensi waktu.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="p-6 bg-bg rounded-lg border border-gray-100">
                <div class="w-10 h-10 bg-secondary text-text font-bold text-lg flex items-center justify-center rounded mb-4">
                    1
                </div>
                <h3 class="text-lg font-bold text-primary mb-2">Login</h3>
                <p class="text-muted text-sm leading-relaxed">
                    Masuk ke sistem menggunakan akun yang terdaftar.
                </p>
            </div>

            <div class="p-6 bg-bg rounded-lg border border-gray-100">
                <div class="w-10 h-10 bg-secondary text-text font-bold text-lg flex items-center justify-center rounded mb-4">
                    2
                </div>
                <h3 class="text-lg font-bold text-primary mb-2">Pilih Kelas & Tipe Presensi</h3>
                <p class="text-muted text-sm leading-relaxed">
                    Pilih kelas serta jenis presensi: harian atau per mata pelajaran.
                </p>
            </div>

            <div class="p-6 bg-bg rounded-lg border border-gray-100">
                <div class="w-10 h-10 bg-secondary text-text font-bold text-lg flex items-center justify-center rounded mb-4">
                    3
                </div>
                <h3 class="text-lg font-bold text-primary mb-2">Isi & Simpan Absensi</h3>
                <p class="text-muted text-sm leading-relaxed">
                    Tandai kehadiran siswa sesuai kondisi, lalu simpan data.
                </p>
            </div>

        </div>
    </div>
</section>

<footer class="border-t border-secondary bg-white p-5 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div class="flex items-center gap-3 text-primary font-bold tracking-wide">
            <img src="logo.png" alt="" class="w-10 h-10">
            PORTAL <span class="text-secondary">PRESENSI</span>
        </div>
        <div class="text-gray-500">
            &copy; {{ date('Y') }} Hak Cipta Dilindungi.
        </div>
    </div>
</footer>
@endsection
