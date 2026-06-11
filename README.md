# Sistem Manajemen Absensi Siswa (Presensi-Siswa)

Aplikasi web Sistem Manajemen Absensi Siswa berbasis Laravel & Inertia.js (React) yang dirancang untuk mendigitalisasi, mempermudah, dan mengintegrasikan proses pencatatan serta pelaporan kehadiran siswa secara terstruktur dan efisien.

---

## 📌 Tentang Proyek
Proyek ini adalah aplikasi web **Sistem Manajemen Absensi Siswa** berbasis Laravel dan Inertia.js (React) yang dirancang untuk mempermudah proses bisnis pencatatan kehadiran di sekolah secara terintegrasi. Website ini bertujuan membantu pihak sekolah—mulai dari sekretaris kelas dalam mencatat kehadiran harian, guru mata pelajaran untuk kehadiran jam kelas, guru piket untuk mencatat keterlambatan, wali kelas untuk rekapitulasi periodik, hingga kepala sekolah dalam memantau statistik kehadiran—serta administrator dalam mengelola seluruh master data. 

Sistem ini menggunakan **MySQL** sebagai basis data dan dirancang agar efisien, terstruktur, dan siap digunakan dalam skala operasional sekolah nyata.

---

## 🌟 Fitur Utama
1. **Multi-Role Authentication & Dashboard Khusus**:
   - **Admin**: Mengelola data pengguna (akun), kelas, mata pelajaran, dan siswa (CRUD dengan import & export).
   - **Kepala Sekolah**: Memantau statistik kehadiran sekolah secara menyeluruh melalui dashboard analitik dan melihat ranking kehadiran kelas/siswa.
   - **Wali Kelas**: Memantau kehadiran siswa di kelasnya serta mengunduh rekapitulasi presensi bulanan dan semester.
   - **Sekretaris Kelas**: Melakukan pencatatan dan pembaruan presensi harian kelas secara praktis.
   - **Guru Mata Pelajaran**: Melakukan pencatatan presensi siswa pada jam pelajaran yang diampu.
   - **Guru Piket**: Mencatat dan mengelola data keterlambatan siswa harian.
2. **Pencatatan Presensi Terintegrasi**: Presensi harian (untuk kelas) dan presensi mata pelajaran saling terhubung guna meminimalkan ketidaksesuaian data.
3. **Pencatatan Keterlambatan**: Mempermudah guru piket mencatat siswa yang terlambat masuk sekolah.
4. **Ekspor & Impor Data Fleksibel**:
   - Impor master data (User, Kelas, Mapel, Siswa) dari file Excel.
   - Ekspor rekap absensi bulanan dan semester ke format **Excel** dan **PDF**.
5. **Sistem Notifikasi Real-time**: Pengguna mendapatkan pemberitahuan langsung mengenai pembaruan atau catatan penting di dalam sistem.
6. **Portal Informasi Publik**: Menyediakan akses bagi publik/orang tua untuk melihat informasi umum terkait kehadiran sekolah.

---

## 🛠️ Teknologi & Pustaka yang Digunakan
- **Backend**: Laravel (PHP ^8.3, Laravel ^13.8)
- **Frontend**: React (JS/JSX), Inertia.js, Tailwind CSS v4
- **Database**: MySQL
- **Ekspor/Impor Pustaka**:
  - `maatwebsite/excel` (Import/Export Excel)
  - `barryvdh/laravel-dompdf` (PDF Generation)
  - `tightenco/ziggy` (Routing Laravel di React)

---

## 🚀 Cara Instalasi & Menjalankan Proyek
1. Clone repositori ini ke komputer Anda.
2. Pastikan PHP >= 8.3, Composer, Node.js, dan MySQL telah terinstal.
3. Jalankan perintah instalasi otomatis (jika menggunakan custom script setup):
   ```bash
   composer run setup
   ```
   *Atau lakukan secara manual:*
   ```bash
   # Install dependensi PHP
   composer install
   
   # Salin file konfigurasi env
   cp .env.example .env
   
   # Generate Application Key
   php artisan key:generate
   
   # Konfigurasikan DB_DATABASE, DB_USERNAME, DB_PASSWORD di file .env
   # Jalankan migrasi database beserta seeder
   php artisan migrate --seed
   
   # Install dependensi Node.js
   npm install
   
   # Jalankan build frontend
   npm run build
   ```
4. Jalankan server lokal:
   ```bash
   composer run dev
   ```
   *Atau jalankan server secara manual:*
   ```bash
   php artisan serve
   npm run dev
   ```
