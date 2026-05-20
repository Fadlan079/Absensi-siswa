import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function DashboardLayout({ user, header, children }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage().props;

    return (
        <div className="flex h-screen w-full font-sans antialiased bg-bg text-text overflow-hidden">
            <aside className={`w-64 bg-primary h-screen flex flex-col shadow-2xl shrink-0 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 absolute md:relative top-0 left-0 z-40`}>
                <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
                    <div className="w-9 h-9 rounded flex items-center justify-center text-primary font-black text-lg mr-3 shadow-sm bg-white">
                        <img src="/logo2.png" alt="Logo" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-sm tracking-wide uppercase leading-tight">SMKTI Airlangga</span>
                        <span className="text-secondary text-xs font-semibold">Sistem Presensi</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    <Link href={user.role === 'admin' ? "/admin/dashboard" : "/teacher/dashboard"} 
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition border-l-4 ${url.includes('dashboard') ? 'bg-white/10 text-secondary font-bold border-secondary' : 'text-gray-400 font-medium border-transparent hover:bg-white/10 hover:text-secondary'}`}>
                        <i className="fa-solid fa-house w-5 text-center text-lg"></i>
                        <span className="text-sm">Home</span>
                    </Link>

                    {user.role === 'guru' && (
                        <Link href="/teacher/daftar-siswa" 
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition border-l-4 ${url.startsWith('/teacher/daftar-siswa') ? 'bg-white/10 text-secondary font-bold border-secondary' : 'text-gray-400 font-medium border-transparent hover:bg-white/10 hover:text-secondary'}`}>
                            <i className="fa-solid fa-user w-5 text-center text-lg"></i>
                            <span className="text-sm">Daftar Siswa</span>
                        </Link>
                    )}
                </nav>

                <div className="p-4 border-t border-white/10 bg-primary-light/10 shrink-0">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold">
                            {(user.name || 'G').substring(0, 1)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{user.name || 'Nama Guru'}</p>
                            <p className="text-xs text-secondary truncate">{user.role || 'Role'}</p>
                        </div>
                    </div>

                    <Link href={route('logout')} method="post" as="button"
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-danger/80 hover:bg-danger text-white rounded font-bold transition text-sm shadow-sm">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Keluar
                    </Link>
                </div>
            </aside>

            <main className="flex-1 h-screen overflow-y-auto bg-bg relative">
                <div className="md:hidden flex items-center justify-between bg-white px-4 h-16 border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded flex items-center justify-center text-primary font-bold text-sm bg-primary/10">
                            <img src="/logo.png" alt="Logo" />
                        </div>
                        <span className="font-bold text-primary">Sistem Presensi</span>
                    </div>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-text hover:text-primary p-2">
                        <i className="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>

                {flash?.error && (
                    <div className="mt-4 mx-4 md:mx-8 flex items-center gap-3 p-4 rounded-lg bg-primary border-l-4 border-secondary shadow-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-secondary opacity-5 pointer-events-none"></div>
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 z-10">
                            <i className="fa-solid fa-triangle-exclamation text-secondary text-lg"></i>
                        </div>
                        <div className="flex-1 z-10">
                            <p className="text-white text-sm font-medium">{flash.error}</p>
                        </div>
                    </div>
                )}

                {flash?.success && (
                    <div className="mt-4 mx-4 md:mx-8 flex items-center gap-3 p-4 rounded-lg bg-primary border-l-4 border-secondary shadow-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-secondary opacity-5 pointer-events-none"></div>
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 z-10">
                            <i className="fa-solid fa-circle-check text-secondary text-lg"></i>
                        </div>
                        <div className="flex-1 z-10">
                            <h4 className="text-secondary font-bold text-xs uppercase tracking-wider mb-0.5">Berhasil</h4>
                            <p className="text-white text-sm font-medium">{flash.success}</p>
                        </div>
                    </div>
                )}

                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
