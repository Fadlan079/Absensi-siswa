import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Portal Presensi - SMKTI Airlangga" />
            
            <div className="font-sans antialiased text-text bg-bg">
                <nav className="border-b border-secondary bg-white sticky top-0 z-50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center rounded text-secondary text-xl font-bold">
                                    <img src="/logo.png" alt="SMKTI AIRLANGGA SAMARINDA" />
                                </div>
                                <div>
                                    <h1 className="text-primary font-bold text-lg leading-tight uppercase tracking-wide">SMKTI Airlangga</h1>
                                    <p className="text-muted text-xs font-medium uppercase tracking-widest">Sistem Presensi</p>
                                </div>
                            </div>

                            <div className="hidden md:flex space-x-8">
                                <a href="#beranda" className="text-text font-semibold hover:text-primary transition">Beranda</a>
                                <a href="#alur" className="text-muted font-semibold hover:text-primary transition">Cara Penggunaan</a>
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

                                <div className="flex gap-4 pt-4">
                                    <Link href={route('login')} className="bg-secondary text-text px-6 py-3 rounded font-bold hover:bg-warning transition shadow-sm border border-yellow-400">
                                        Buka Form Presensi
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden lg:block relative">
                                <div className="absolute -inset-4 bg-primary/5 rounded-2xl transform rotate-2"></div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md shadow-xl relative z-10 mx-auto">
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
                                                <span className="font-semibold text-text text-sm">Achmad Fattah Safaraz</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-7 h-7 rounded bg-success text-white flex items-center justify-center shadow-sm text-xs"><i className="fa-solid fa-check"></i></div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">S</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">I</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">A</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-red-50 rounded border border-red-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">2</div>
                                                <span className="font-semibold text-text text-sm">Nathan Andik A Dilma</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs"><i className="fa-solid fa-check"></i></div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">S</div>
                                                <div className="w-7 h-7 rounded bg-white text-muted flex items-center justify-center border border-gray-200 text-xs">I</div>
                                                <div className="w-7 h-7 rounded bg-danger text-white flex items-center justify-center shadow-sm text-xs">A</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-bg rounded border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">3</div>
                                                <span className="font-semibold text-text text-sm">Farrel Azzam Kahupati</span>
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

                <section id="alur" className="py-20 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-text mb-2">Cara Kerja Sistem</h2>
                            <p className="text-muted">Proses pengisian presensi dirancang sesederhana mungkin untuk efisiensi waktu.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div className="p-6 bg-bg rounded-lg border border-gray-100">
                                <div className="w-10 h-10 bg-secondary text-text font-bold text-lg flex items-center justify-center rounded mb-4">
                                    1
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-2">Login</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    Masuk ke sistem menggunakan akun yang terdaftar.
                                </p>
                            </div>

                            <div className="p-6 bg-bg rounded-lg border border-gray-100">
                                <div className="w-10 h-10 bg-secondary text-text font-bold text-lg flex items-center justify-center rounded mb-4">
                                    2
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-2">Pilih Kelas & Tipe Presensi</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    Pilih kelas serta jenis presensi: harian atau per mata pelajaran.
                                </p>
                            </div>

                            <div className="p-6 bg-bg rounded-lg border border-gray-100">
                                <div className="w-10 h-10 bg-secondary text-text font-bold text-lg flex items-center justify-center rounded mb-4">
                                    3
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-2">Isi & Simpan Absensi</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    Tandai kehadiran siswa sesuai kondisi, lalu simpan data.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                <footer className="border-t border-secondary bg-white p-5 z-50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <div className="flex items-center gap-3 text-primary font-bold tracking-wide">
                            <img src="/logo.png" alt="" className="w-10 h-10" />
                            SMKTI <span className="text-secondary">AIRLANGGA</span> SAMARINDA
                        </div>
                        <div className="text-gray-500">
                            &copy; {new Date().getFullYear()} Hak Cipta Dilindungi.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
