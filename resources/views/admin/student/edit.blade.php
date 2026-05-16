@extends('layouts.dashboard')
@section('title', 'Edit Data Siswa')

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

        <div class="relative z-10 px-4 py-6 md:px-8 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="w-full md:w-2/3 space-y-2">
                <h2 class="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
                    Ubah Informasi <br>
                    <span class="text-secondary">Profil Siswa</span>
                </h2>
                <p class="text-gray-200 text-xs md:text-sm max-w-md leading-relaxed">
                    Pastikan NISN dan nama lengkap diisi sesuai dengan dokumen administrasi resmi sekolah.
                </p>
            </div>
        </div>
    </div>
</section>

<section class="p-5 pt-0">
    <div class="bg-white rounded-lg shadow-md border-t-[5px] border-primary max-w-2xl mx-auto">

        <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-secondary/10 text-primary flex items-center justify-center shadow-inner">
                <i class="fa-solid fa-user-gear text-sm"></i>
            </div>
            <div>
                <h3 class="font-bold text-text text-base">Formulir Pembaruan Data</h3>
                <p class="text-xs text-gray-400">ID Siswa: #{{ $student->id }}</p>
            </div>
        </div>

        <form action="{{ route('students.update', $student->id) }}" method="POST" class="p-6 space-y-5">
            @csrf
            @method('PUT')

            <div class="space-y-1.5">
                <label for="nisn" class="block font-bold text-sm text-text">
                    NISN <span class="text-red-500">*</span>
                </label>
                <input type="text"
                       name="nisn"
                       id="nisn"
                       value="{{ old('nisn', $student->nisn) }}"
                       class="w-full p-2.5 rounded border @error('nisn') border-red-500 focus:ring-red-500/20 focus:border-red-500 @else border-gray-300 focus:ring-primary/20 focus:border-primary @enderror bg-white text-sm text-text focus:outline-none focus:ring-4 transition font-mono"
                       placeholder="Masukkan 10 digit NISN..."
                       required>
                @error('nisn')
                    <p class="text-xs text-red-500 font-semibold mt-1"><i class="fa-solid fa-circle-exclamation mr-1"></i>{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-1.5">
                <label for="nama" class="block font-bold text-sm text-text">
                    Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input type="text"
                       name="nama"
                       id="nama"
                       value="{{ old('nama', $student->nama) }}"
                       class="w-full p-2.5 rounded border @error('nama') border-red-500 focus:ring-red-500/20 focus:border-red-500 @else border-gray-300 focus:ring-primary/20 focus:border-primary @enderror bg-white text-sm text-text focus:outline-none focus:ring-4 transition"
                       placeholder="Masukkan nama lengkap siswa..."
                       required>
                @error('nama')
                    <p class="text-xs text-red-500 font-semibold mt-1"><i class="fa-solid fa-circle-exclamation mr-1"></i>{{ $message }}</p>
                @enderror
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                    <label for="kelas" class="block font-bold text-sm text-text">
                        Kelas <span class="text-red-500">*</span>
                    </label>
                    <input type="text"
                           name="kelas"
                           id="kelas"
                           value="{{ old('kelas', $student->kelas) }}"
                           class="w-full p-2.5 rounded border @error('kelas') border-red-500 focus:ring-red-500/20 focus:border-red-500 @else border-gray-300 focus:ring-primary/20 focus:border-primary @enderror bg-white text-sm text-text focus:outline-none focus:ring-4 transition uppercase"
                           placeholder="Contoh: XII, XI, X..."
                           required>
                    @error('kelas')
                        <p class="text-xs text-red-500 font-semibold mt-1"><i class="fa-solid fa-circle-exclamation mr-1"></i>{{ $message }}</p>
                    @enderror
                </div>

                <div class="space-y-1.5">
                    <label for="jurusan" class="block font-bold text-sm text-text">
                        Kompetensi Keahlian (Jurusan) <span class="text-red-500">*</span>
                    </label>
                    <select name="jurusan"
                            id="jurusan"
                            class="w-full p-2.5 rounded border @error('jurusan') border-red-500 focus:ring-red-500/20 focus:border-red-500 @else border-gray-300 focus:ring-primary/20 focus:border-primary @enderror bg-white text-sm text-text focus:outline-none focus:ring-4 transition cursor-pointer"
                            required>
                        <option value="" disabled>-- Pilih Jurusan --</option>
                        @foreach(['PPLG', 'TJKT', 'DKV', 'MPLB'] as $jrs)
                            <option value="{{ $jrs }}" {{ old('jurusan', $student->jurusan) == $jrs ? 'selected' : '' }}>
                                {{ $jrs }}
                            </option>
                        @endforeach
                    </select>
                    @error('jurusan')
                        <p class="text-xs text-red-500 font-semibold mt-1"><i class="fa-solid fa-circle-exclamation mr-1"></i>{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <a href="{{ url()->previous() }}"
                   class="px-4 py-2.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-text font-semibold text-sm transition shadow-sm">
                    Batal
                </a>
                <button type="submit"
                        class="px-5 py-2.5 rounded bg-primary hover:bg-primary-light text-white font-bold text-sm transition shadow-md flex items-center gap-2">
                    <i class="fa-solid fa-floppy-disk text-xs"></i> Simpan Perubahan
                </button>
            </div>
        </form>

    </div>
</section>
@endsection
