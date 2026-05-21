import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Portal Presensi" />
            
            <div className="font-sans antialiased text-text bg-bg">
                <nav className="border-b border-secondary bg-white sticky top-0 z-50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center rounded text-secondary text-xl font-bold">
                                    <img src="/logo.png" alt="Portal Presensi" />
                                </div>
                                <div>
                                    <h1 className="text-primary font-bold text-lg leading-tight uppercase tracking-wide">Portal Presensi</h1>
                                    <p className="text-muted text-xs font-medium uppercase tracking-widest">Sistem Presensi</p>
                                </div>
                            </div>

                            <div className="hidden md:flex space-x-8">
                                <a href="#beranda" className="text-text font-semibold hover:text-primary transition">Beranda</a>
                                <a href="#fitur" className="text-muted font-semibold hover:text-primary transition">Keunggulan</a>
                                <a href="#alur" className="text-muted font-semibold hover:text-primary transition">Cara Penggunaan</a>
                                <Link href={route('public.portal')} className="text-primary font-bold hover:text-primary-dark transition flex items-center gap-2">
                                    <i className="fa-solid fa-ranking-star"></i> Pusat Informasi
                                </Link>
                            </div>

                            <div className="hidden md:flex">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="bg-primary text-white px-5 py-2.5 rounded font-semibold hover:bg-primary-light transition flex items-center gap-2">
                                        Dashboard <i className="fa-solid fa-arrow-right text-sm"></i>
                                    </Link>
                                ) : (
                                    <Link href={route('login')} className="bg-primary text-white px-5 py-2.5 rounded font-semibold hover:bg-primary-light transition flex items-center gap-2">
                                        Masuk <i className="fa-solid fa-arrow-right text-sm"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <section id="beranda" className="py-16 md:py-24 bg-bg relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-bold text-text leading-tight tracking-tight">
                                    Presensi Kelas <br />
                                    <span className="text-primary">Lebih Cepat,</span> <br />
                                    Tanpa Kertas.
                                </h2>
                                <p className="text-muted text-lg font-medium max-w-lg leading-relaxed border-l-4 border-secondary pl-4">
                                    Sistem pencatatan kehadiran siswa harian. Dirancang khusus untuk mempermudah tugas Bapak/Ibu Guru dan Wali Kelas dalam merekap absensi.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href={route('login')} className="bg-secondary text-text px-6 py-3 rounded font-bold hover:bg-warning transition shadow-sm border border-yellow-400 text-center">
                                        Buka Form Presensi
                                    </Link>
                                    <Link href={route('public.portal')} className="bg-white text-primary px-6 py-3 rounded font-bold hover:bg-gray-50 transition shadow-sm border border-gray-200 flex items-center justify-center gap-2 text-center">
                                        <i className="fa-solid fa-trophy text-amber-500"></i> Lihat Leaderboard
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden lg:block relative">
                                <div className="absolute -inset-4 bg-primary/5 rounded-2xl transform rotate-2"></div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md shadow-md relative z-10 mx-auto">
                                    <div className="flex justify-between items-end mb-5 pb-4 border-b border-gray-100">
                                        <div>
                                            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Mata Pelajaran</div>
                                            <div className="font-bold text-primary text-lg">Dasar Dasar PPLG</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Kelas</div>
                                            <div className="font-bold text-text text-lg">XI PPLG</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-bg rounded border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">1</div>
                                                <span className="font-semibold text-text text-sm">Aditya Wijaya</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-7 h-7 rounded bg-success text-white flex items-center justify-center shadow-sm text-xs"><i className="fa-solid fa-check"></i></div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">S</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">I</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">A</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded border border-yellow-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">2</div>
                                                <span className="font-semibold text-text text-sm">Indah Permatasari</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs"><i className="fa-solid fa-check"></i></div>
                                                <div className="w-7 h-7 rounded bg-warning text-muted flex items-center justify-center border border-gray-200 text-xs">S</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">I</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center shadow-sm text-xs">A</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-bg rounded border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">3</div>
                                                <span className="font-semibold text-text text-sm">Rizky Ramadhan</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-7 h-7 rounded bg-success text-white flex items-center justify-center shadow-sm text-xs"><i className="fa-solid fa-check"></i></div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">S</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">I</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">A</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-4 border-t border-gray-100">
                                        <button className="w-full bg-primary text-white font-semibold py-2.5 rounded text-sm">
                                            Simpan Data Kehadiran
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="fitur" className="py-24 bg-white relative border-t border-gray-100 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-24">
                            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Lebih Baik dari Manual</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-6">Kenapa Memilih Sistem Kami?</h2>
                            <p className="text-muted text-lg max-w-3xl mx-auto">Tinggalkan buku absensi kertas yang mudah rusak. Beralih ke sistem digital yang aman, cepat, dan otomatis merekap semua data Anda.</p>
                        </div>

                        <div className="space-y-32">
                            {/* Feature 1 */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-6">
                                        <i className="fa-solid fa-bolt"></i>
                                    </div>
                                    <h3 className="text-3xl font-bold text-text mb-4">Pengisian Presensi <span className="text-primary">Super Cepat</span></h3>
                                    <p className="text-muted text-lg leading-relaxed mb-6">
                                        Hemat waktu berharga Anda di kelas. Hanya dengan beberapa klik, data kehadiran seluruh siswa langsung tersimpan secara <strong>real-time</strong> ke dalam server. Tidak perlu lagi memanggil nama satu per satu dan mencatat di kertas.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-text font-medium"><i className="fa-solid fa-check text-success"></i> Sinkronisasi seketika saat disimpan</li>
                                        <li className="flex items-center gap-3 text-text font-medium"><i className="fa-solid fa-check text-success"></i> Status lengkap (Hadir, Sakit, Izin, Alpa)</li>
                                        <li className="flex items-center gap-3 text-text font-medium"><i className="fa-solid fa-check text-success"></i> Tampilan super cepat dan bebas lelet</li>
                                    </ul>
                                </div>
                                <div className="relative group perspective">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl transform rotate-3 scale-105 blur-lg group-hover:rotate-6 transition-all duration-500 pointer-events-none"></div>
                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 relative z-10 transition-transform duration-500 hover:-translate-y-2">
                                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                                            <div className="font-bold text-text">Daftar Hadir Hari Ini</div>
                                            <div className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-bold animate-pulse">Tersimpan Live!</div>
                                        </div>
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-bg rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs"><i className="fa-solid fa-user"></i></div>
                                                        <div className="w-20 sm:w-32 h-3 bg-gray-200 rounded"></div>
                                                    </div>
                                                    <div className="flex gap-1 sm:gap-2">
                                                        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs transition-colors ${i === 1 ? 'bg-success text-white shadow-md shadow-success/30' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-100'}`}><i className="fa-solid fa-check"></i></div>
                                                        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-colors ${i === 2 ? 'bg-warning text-white shadow-md shadow-warning/30' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-100'}`}>S</div>
                                                        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-colors ${i === 3 ? 'bg-info text-white shadow-md shadow-info/30' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-100'}`}>I</div>
                                                        <div className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold bg-white border border-gray-200 text-gray-400 hover:bg-gray-100 transition-colors">A</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div className="order-2 lg:order-1 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-l from-warning/10 to-danger/10 rounded-3xl transform -rotate-3 scale-105 blur-lg group-hover:-rotate-6 transition-all duration-500 pointer-events-none"></div>
                                    
                                    {/* Background Card */}
                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-5 sm:p-6 relative z-10 transform sm:-translate-x-4 sm:translate-y-4 opacity-90 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2 sm:group-hover:-translate-x-6 sm:group-hover:translate-y-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary"><i className="fa-solid fa-chalkboard-user"></i></div>
                                            <div>
                                                <div className="font-bold text-text">Dashboard Guru Mapel</div>
                                                <div className="text-xs text-muted">Hanya mengelola kelas saat jam mengajar</div>
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                                        <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                                    </div>

                                    {/* Foreground Card */}
                                    <div className="bg-white border border-primary/20 rounded-2xl shadow-lg p-5 sm:p-6 relative z-20 transform translate-x-2 -translate-y-2 sm:translate-x-4 sm:-translate-y-4 transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4 sm:group-hover:translate-x-6 sm:group-hover:-translate-y-6 mt-4 sm:mt-0">
                                        <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">Akses Penuh Wali Kelas</div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary"><i className="fa-solid fa-user-tie"></i></div>
                                            <div>
                                                <div className="font-bold text-text text-lg">Dashboard Wali Kelas</div>
                                                <div className="text-xs text-muted">Memantau & mengelola seluruh rekap anak didik</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-4 bg-bg rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                                                <i className="fa-solid fa-users text-primary text-2xl"></i>
                                                <span className="text-xs font-bold text-text">Data Siswa</span>
                                            </div>
                                            <div className="p-4 bg-bg rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 hover:border-secondary/50 transition-colors">
                                                <i className="fa-solid fa-chart-bar text-secondary text-2xl"></i>
                                                <span className="text-xs font-bold text-text">Rekap Harian</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2">
                                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-2xl mb-6">
                                        <i className="fa-solid fa-users-gear"></i>
                                    </div>
                                    <h3 className="text-3xl font-bold text-text mb-4">Peran Berbeda, <span className="text-secondary">Fokus Berbeda</span></h3>
                                    <p className="text-muted text-lg leading-relaxed mb-6">
                                        Sistem ini mengenali siapa penggunanya. Hak akses secara cerdas dipisahkan antara Guru Mata Pelajaran dan Wali Kelas demi menjaga privasi dan kerapian data antar kelas.
                                    </p>
                                    <ul className="space-y-5">
                                        <li className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
                                            <div className="mt-1"><div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><i className="fa-solid fa-chalkboard-user"></i></div></div>
                                            <div>
                                                <strong className="text-text block mb-1">Guru Mata Pelajaran</strong>
                                                <span className="text-muted text-sm leading-relaxed block mt-1">Fokus mengisi kehadiran siswa hanya pada kelas dan jam pelajaran yang sedang ia ajarkan. Cepat tanpa melihat data kelas lain.</span>
                                            </div>
                                        </li>
                                        <li className="flex gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:shadow-md transition-shadow relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full transform translate-x-8 -translate-y-8 pointer-events-none"></div>
                                            <div className="mt-1"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary relative z-10"><i className="fa-solid fa-user-tie"></i></div></div>
                                            <div className="relative z-10">
                                                <strong className="text-primary block mb-1">Wali Kelas</strong>
                                                <span className="text-muted text-sm leading-relaxed block mt-1">Memiliki hak khusus untuk melihat rekapitulasi harian kelasnya, mengedit, dan memantau kehadiran anak didiknya secara penuh.</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <div className="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center text-success text-2xl mb-6">
                                        <i className="fa-solid fa-file-invoice"></i>
                                    </div>
                                    <h3 className="text-3xl font-bold text-text mb-4">Rekap & Histori <span className="text-success">Otomatis Terpusat</span></h3>
                                    <p className="text-muted text-lg leading-relaxed mb-6">
                                        Lupakan lembur di akhir bulan hanya untuk merekap absen! Sistem secara otomatis menghitung total kehadiran setiap harinya. Semua histori tersimpan dan terenkripsi super aman.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform cursor-default">
                                            <div className="text-3xl text-primary mb-3"><i className="fa-solid fa-cloud-arrow-down"></i></div>
                                            <div className="font-bold text-text text-md mb-1">Export Laporan</div>
                                            <div className="text-sm text-muted">Unduh rekap data rapi kapan saja dibutuhkan.</div>
                                        </div>
                                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform cursor-default">
                                            <div className="text-3xl text-secondary mb-3"><i className="fa-solid fa-clock-rotate-left"></i></div>
                                            <div className="font-bold text-text text-md mb-1">Histori Abadi</div>
                                            <div className="text-sm text-muted">Lacak riwayat kehadiran di tanggal lampau dengan mudah.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-primary/10 rounded-3xl transform rotate-3 scale-105 blur-lg group-hover:scale-110 transition-all duration-500 pointer-events-none"></div>
                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-5 sm:p-6 relative z-10 transition-transform duration-500">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                            <div>
                                                <div className="font-bold text-text text-lg">Laporan Bulanan Kehadiran</div>
                                                <div className="text-xs text-muted font-semibold uppercase tracking-wider mt-1">Kelas XI PPLG - Bulan Ini</div>
                                            </div>
                                            <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors p-3 rounded-xl border border-primary/20 flex items-center gap-2 font-bold text-sm cursor-default">
                                                <i className="fa-solid fa-download"></i> Unduh
                                            </button>
                                        </div>
                                        
                                        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                            <div className="bg-bg grid grid-cols-6 p-2 sm:p-3 border-b border-gray-100 text-xs font-bold text-muted uppercase tracking-wider">
                                                <div className="col-span-2">Nama Siswa</div>
                                                <div className="text-center text-success">H</div>
                                                <div className="text-center text-warning">S</div>
                                                <div className="text-center text-info">I</div>
                                                <div className="text-center text-danger">A</div>
                                            </div>
                                            {[
                                                { name: "Achmad Fattah", h: 20, s: 1, i: 0, a: 0 },
                                                { name: "Nathan Andik", h: 18, s: 0, i: 2, a: 1 },
                                                { name: "Farrel Azzam", h: 21, s: 0, i: 0, a: 0 },
                                            ].map((s, idx) => (
                                                <div key={idx} className="grid grid-cols-6 p-2 sm:p-3 border-b border-gray-50 text-xs sm:text-sm items-center hover:bg-gray-50 transition-colors">
                                                    <div className="col-span-2 font-semibold text-text">{s.name}</div>
                                                    <div className="text-center font-black text-success">{s.h}</div>
                                                    <div className="text-center font-black text-warning">{s.s}</div>
                                                    <div className="text-center font-black text-info">{s.i}</div>
                                                    <div className="text-center font-black text-danger">{s.a}</div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm font-medium border-t border-gray-100 pt-5">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-lg border border-success/20">
                                                <i className="fa-solid fa-shield-halved"></i> Data Terenkripsi & Aman
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200">
                                                <i className="fa-solid fa-leaf"></i> 100% Bebas Kertas
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="alur" className="py-16 lg:py-24 bg-white relative overflow-hidden border-t border-gray-100">
                    {/* Background Decorations */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    <div className="absolute -left-20 top-40 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -right-20 bottom-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-10 md:mb-20">
                            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Alur Sistem</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-text mb-4">Cara Kerja Portal Presensi</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">Proses pengisian presensi dirancang sesederhana mungkin dengan alur yang intuitif.</p>
                        </div>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 transform -translate-x-1/2"></div>

                            <div className="space-y-16 md:space-y-24">
                                {/* Step 1 */}
                                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                    <div className="w-full md:w-5/12 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto md:ml-auto md:mr-0">1</div>
                                        <h3 className="text-2xl font-bold text-text mb-3">Login Sistem</h3>
                                        <p className="text-muted leading-relaxed">Akses portal menggunakan email dan password terdaftar. Sistem diamankan dengan enkripsi standar industri.</p>
                                    </div>
                                    <div className="hidden md:flex w-2/12 justify-center relative">
                                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow ring-1 ring-gray-200 z-10"></div>
                                    </div>
                                    <div className="w-full md:w-5/12">
                                        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            {/* Login Mockup */}
                                            <div className="space-y-4">
                                                <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-6"></div>
                                                <div className="space-y-2">
                                                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                                    <div className="h-10 w-full bg-gray-50 border border-gray-200 rounded flex items-center px-3"><div className="h-3 w-32 bg-gray-300 rounded"></div></div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                                    <div className="h-10 w-full bg-gray-50 border border-gray-200 rounded flex items-center px-3"><div className="h-3 w-24 bg-gray-300 rounded"></div></div>
                                                </div>
                                                <div className="h-10 w-full bg-primary rounded mt-4 flex items-center justify-center"><div className="h-3 w-16 bg-white/50 rounded"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full">
                                    <div className="w-full md:w-5/12 mb-8 md:mb-0 md:pl-12 text-center md:text-left">
                                        <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto md:mr-auto md:ml-0">2</div>
                                        <h3 className="text-2xl font-bold text-text mb-3">Pilih Kelas & Mapel</h3>
                                        <p className="text-muted leading-relaxed">Pilih kelas yang sedang Anda ajar melalui dashboard interaktif. Wali kelas mendapat akses ekstra untuk rekap harian.</p>
                                    </div>
                                    <div className="hidden md:flex w-2/12 justify-center relative">
                                        <div className="w-4 h-4 bg-secondary rounded-full border-4 border-white shadow ring-1 ring-gray-200 z-10"></div>
                                    </div>
                                    <div className="w-full md:w-5/12">
                                        <div className="bg-bg border border-gray-100 rounded-2xl shadow-lg p-5">
                                            {/* Dashboard Mockup */}
                                            <div className="flex gap-4 mb-4">
                                                <div className="w-10 h-10 bg-white rounded-full border border-gray-200"></div>
                                                <div className="flex-1 space-y-2 py-1">
                                                    <div className="h-3 w-32 bg-gray-300 rounded"></div>
                                                    <div className="h-2 w-24 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                                    <div className="h-8 w-8 bg-primary/10 rounded mb-2"></div>
                                                    <div className="h-2 w-16 bg-gray-300 rounded mb-1"></div>
                                                    <div className="h-2 w-10 bg-gray-200 rounded"></div>
                                                </div>
                                                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                                    <div className="h-8 w-8 bg-secondary/10 rounded mb-2"></div>
                                                    <div className="h-2 w-20 bg-gray-300 rounded mb-1"></div>
                                                    <div className="h-2 w-12 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                    <div className="w-full md:w-5/12 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                                        <div className="w-12 h-12 bg-success/10 text-success rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto md:ml-auto md:mr-0">3</div>
                                        <h3 className="text-2xl font-bold text-text mb-3">Isi Kehadiran</h3>
                                        <p className="text-muted leading-relaxed">Tandai status kehadiran siswa (Hadir, Sakit, Izin, Alpa) dengan sekali klik. Sistem otomatis menyimpan perubahan Anda.</p>
                                    </div>
                                    <div className="hidden md:flex w-2/12 justify-center relative">
                                        <div className="w-4 h-4 bg-success rounded-full border-4 border-white shadow ring-1 ring-gray-200 z-10"></div>
                                    </div>
                                    <div className="w-full md:w-5/12">
                                        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-5">
                                            {/* Presensi Mockup */}
                                            <div className="space-y-3">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className="flex justify-between items-center p-2 bg-bg rounded border border-gray-50">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                                                            <div className="h-2 w-16 sm:w-24 bg-gray-300 rounded"></div>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <div className={`w-5 h-5 rounded flex items-center justify-center ${i===1 ? 'bg-success' : 'bg-gray-200'}`}></div>
                                                            <div className={`w-5 h-5 rounded flex items-center justify-center ${i===2 ? 'bg-warning' : 'bg-gray-200'}`}></div>
                                                            <div className={`w-5 h-5 rounded flex items-center justify-center ${i===3 ? 'bg-info' : 'bg-gray-200'}`}></div>
                                                            <div className="w-5 h-5 rounded bg-gray-200"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="h-8 w-full bg-primary rounded mt-4"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full">
                                    <div className="w-full md:w-5/12 mb-8 md:mb-0 md:pl-12 text-center md:text-left">
                                        <div className="w-12 h-12 bg-info/10 text-info rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto md:mr-auto md:ml-0">4</div>
                                        <h3 className="text-2xl font-bold text-text mb-3">Rekap Otomatis</h3>
                                        <p className="text-muted leading-relaxed">Data yang telah disimpan otomatis direkap menjadi laporan harian dan bulanan yang rapi, siap untuk diunduh.</p>
                                    </div>
                                    <div className="hidden md:flex w-2/12 justify-center relative">
                                        <div className="w-4 h-4 bg-info rounded-full border-4 border-white shadow ring-1 ring-gray-200 z-10"></div>
                                    </div>
                                    <div className="w-full md:w-5/12">
                                        <div className="bg-bg border border-gray-100 rounded-2xl shadow-lg p-5">
                                            {/* Laporan Mockup */}
                                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                                                <div className="h-3 w-24 bg-gray-300 rounded"></div>
                                                <div className="h-6 w-16 bg-primary/20 rounded"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <div className="h-2 w-20 bg-gray-300 rounded"></div>
                                                    <div className="flex gap-2"><div className="h-2 w-4 bg-success rounded"></div><div className="h-2 w-4 bg-danger rounded"></div></div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="h-2 w-24 bg-gray-300 rounded"></div>
                                                    <div className="flex gap-2"><div className="h-2 w-4 bg-success rounded"></div><div className="h-2 w-4 bg-gray-300 rounded"></div></div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="h-2 w-16 bg-gray-300 rounded"></div>
                                                    <div className="flex gap-2"><div className="h-2 w-4 bg-success rounded"></div><div className="h-2 w-4 bg-warning rounded"></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-3 text-primary font-bold tracking-wide mb-4">
                                    <img src="/logo.png" alt="" className="w-10 h-10" />
                                    PORTAL <span className="text-secondary">PRESENSI</span>
                                </div>
                                <p className="text-muted text-sm leading-relaxed mb-6 max-w-sm">
                                    Portal presensi digital untuk mempermudah pencatatan kehadiran siswa secara real-time. Efisien, cepat, dan 100% bebas kertas.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-text mb-4">Tautan Cepat</h4>
                                <ul className="space-y-2 text-sm text-muted">
                                    <li><Link href={route('login')} className="hover:text-primary transition-colors">Login Sistem</Link></li>
                                    <li><Link href={route('public.portal')} className="hover:text-primary transition-colors">Portal Leaderboard</Link></li>
                                    <li><a href="#fitur" className="hover:text-primary transition-colors">Fitur Unggulan</a></li>
                                    <li><a href="#alur" className="hover:text-primary transition-colors">Cara Kerja</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-text mb-4">Hubungi Kami</h4>
                                <ul className="space-y-3 text-sm text-muted">
                                    <li className="flex gap-3">
                                        <i className="fa-solid fa-location-dot mt-1 text-gray-400"></i>
                                        <span>Jl. Pahlawan No.2A, Dadi Mulya, Samarinda Ulu, Samarinda, Kaltim 75123</span>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <i className="fa-solid fa-envelope text-gray-400"></i>
                                        <span>info@portalpresensi.com</span>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <i className="fa-solid fa-phone text-gray-400"></i>
                                        <span>(0541) 741160</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                            <div className="text-gray-500">
                                &copy; {new Date().getFullYear()} Portal Presensi. Hak Cipta Dilindungi.
                            </div>
                            <div className="text-gray-400 text-xs flex gap-4">
                                <a href="#" className="hover:text-gray-600">Kebijakan Privasi</a>
                                <a href="#" className="hover:text-gray-600">Syarat Ketentuan</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
