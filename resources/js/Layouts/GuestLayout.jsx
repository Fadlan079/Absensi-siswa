import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex text-text bg-bg font-sans antialiased">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden p-16">
                {/* Background glow and modern grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-light),var(--color-primary))]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Decorative neon blobs */}
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary-light/30 rounded-full blur-[100px]"></div>
                
                <div className="relative z-10 w-full max-w-lg flex flex-col items-start text-left text-white">
                    {/* Brand header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/" className="group">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-2.5 shadow-xl border border-white/20 transform transition duration-300 group-hover:scale-105 group-hover:bg-white/20">
                                <img src="/logo.png" alt="Portal Presensi" className="w-full h-full object-contain filter drop-shadow-sm" />
                            </div>
                        </Link>
                        <div>
                            <span className="text-secondary font-extrabold text-[10px] uppercase tracking-widest">Sistem Presensi</span>
                            <h1 className="text-xl font-black tracking-tight text-white mt-0.5">Portal Presensi</h1>
                        </div>
                    </div>
                    
                    <h2 className="text-4xl font-extrabold mb-5 tracking-tight leading-tight">
                        Pencatatan Kehadiran <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-300">
                            Modern & Efisien.
                        </span>
                    </h2>
                    
                    <p className="text-white/70 font-medium mb-10 leading-relaxed text-sm">
                        Sistem pencatatan kehadiran siswa digital yang cepat, aman, dan terintegrasi secara real-time untuk mempermudah rekapitulasi data.
                    </p>

                    {/* Premium Glassmorphic Stats Mockup */}
                    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Aktivitas Hari Ini</span>
                            </div>
                            <span className="text-[10px] font-extrabold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/25">
                                Real-time
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/5 rounded-xl p-4 transition hover:bg-white/10 duration-200">
                                <div className="text-[10px] text-white/50 font-semibold mb-1">Rata-rata Kehadiran</div>
                                <div className="text-2xl font-black text-white flex items-baseline gap-1">
                                    98.4%
                                    <span className="text-[10px] text-success font-bold"><i className="fa-solid fa-arrow-up"></i> 1.2%</span>
                                </div>
                            </div>
                            
                            <div className="bg-white/5 border border-white/5 rounded-xl p-4 transition hover:bg-white/10 duration-200">
                                <div className="text-[10px] text-white/50 font-semibold mb-1">Kelas Aktif</div>
                                <div className="text-2xl font-black text-white">
                                    12 Kelas
                                </div>
                            </div>
                        </div>

                        {/* Recent Presensi Mockup Line */}
                        <div className="space-y-2.5 pt-2">
                            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg text-xs font-medium">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-[10px] font-bold">AW</div>
                                    <span className="text-white/80 font-bold text-[11px]">Aditya Wijaya</span>
                                </div>
                                <span className="text-success font-semibold bg-success/15 px-2 py-0.5 rounded text-[9px] border border-success/20">
                                    Hadir Tepat Waktu
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg text-xs font-medium">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-[10px] font-bold">IP</div>
                                    <span className="text-white/80 font-bold text-[11px]">Indah Permatasari</span>
                                </div>
                                <span className="text-warning font-semibold bg-warning/15 px-2 py-0.5 rounded text-[9px] border border-warning/20">
                                    Sakit (Surat Dokter)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative overflow-hidden">
                {/* Mobile Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl lg:hidden pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl lg:hidden pointer-events-none"></div>

                {/* Mobile Logo */}
                <div className="w-full max-w-md lg:hidden mb-8 flex flex-col items-center text-center relative z-10">
                    <Link href="/" className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center p-2 mb-4">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </Link>
                    <h2 className="font-bold text-primary text-2xl tracking-tight">Portal Presensi</h2>
                    <p className="text-muted text-sm mt-1">Portal Presensi Digital</p>
                </div>

                <div className="w-full max-w-md bg-white/80 backdrop-blur-sm lg:bg-white lg:backdrop-blur-none rounded-3xl lg:rounded-2xl shadow-xl lg:shadow-none border border-gray-100 lg:border-none p-8 relative z-10">
                    {children}
                </div>
                
                <div className="mt-8 w-full max-w-md border-t border-gray-100 pt-6 text-center relative z-10">
                    <div className="flex justify-center items-center gap-6 mb-4 text-xs font-semibold text-gray-500">
                        <Link 
                            href="/" 
                            className="hover:text-primary transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                        >
                            <i className="fa-solid fa-house"></i>
                            Beranda
                        </Link>
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                        <Link 
                            href={route('public.portal')} 
                            className="hover:text-primary transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                        >
                            <i className="fa-solid fa-ranking-star"></i>
                            Pusat Informasi
                        </Link>
                    </div>
                    
                    <div className="text-[11px] text-gray-400 font-medium">
                        &copy; {new Date().getFullYear()} Portal Presensi. All rights reserved.
                        <p className="mt-1 text-gray-400/80">
                            Sistem Presensi Digital &bull; Cepat, Aman & Transparan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
