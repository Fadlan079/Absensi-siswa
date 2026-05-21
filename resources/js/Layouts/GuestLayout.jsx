import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex text-text bg-bg font-sans antialiased">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary opacity-90"></div>
                
                {/* Decorative circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center px-12 text-white">
                    <Link href="/" className="inline-block mb-8">
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 mx-auto shadow-2xl transform transition hover:scale-105">
                            <img src="/logo.png" alt="Portal Presensi" className="w-full h-full object-contain" />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Portal Presensi</h1>
                    <p className="text-lg text-white/80 font-medium max-w-md mx-auto leading-relaxed">
                        Sistem pencatatan kehadiran siswa digital yang cepat, aman, dan tanpa kertas.
                    </p>
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
