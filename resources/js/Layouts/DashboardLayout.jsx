import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Definisi menu sidebar per role
const menuPerRole = {
    admin: [
        { href: () => route('admin.dashboard'), icon: 'fa-house', label: 'Dashboard', match: '/admin/dashboard' },
        { href: () => route('admin.users.index'), icon: 'fa-users-gear', label: 'Kelola User', match: '/admin/users' },
        { href: () => route('admin.kelas.index'), icon: 'fa-chalkboard', label: 'Kelola Kelas', match: '/admin/kelas' },
        { href: () => route('admin.mapel.index'), icon: 'fa-book-open', label: 'Kelola Mapel', match: '/admin/mapel' },
        { href: () => route('admin.siswa.index'), icon: 'fa-user-graduate', label: 'Data Siswa', match: '/admin/siswa' },
    ],
    kepala_sekolah: [
        { href: () => route('kepala_sekolah.dashboard'), icon: 'fa-chart-line', label: 'Dashboard', match: '/kepala-sekolah/dashboard' },
        { href: () => route('kepala_sekolah.ranking'), icon: 'fa-trophy', label: 'Ranking Disiplin', match: '/kepala-sekolah/ranking' },
    ],
    wali_kelas: [
        { href: () => route('wali_kelas.dashboard'), icon: 'fa-house', label: 'Dashboard', match: '/wali-kelas/dashboard' },
        { href: () => route('wali_kelas.rekap.bulanan'), icon: 'fa-calendar-check', label: 'Rekap Bulanan', match: '/wali-kelas/rekap/bulanan' },
        { href: () => route('wali_kelas.rekap.semester'), icon: 'fa-calendar-days', label: 'Rekap Semester', match: '/wali-kelas/rekap/semester' },
    ],
    sekretaris: [
        { href: () => route('sekretaris.dashboard'), icon: 'fa-house', label: 'Dashboard', match: '/sekretaris/dashboard' },
        { href: () => route('sekretaris.presensi.create'), icon: 'fa-clipboard-list', label: 'Isi Presensi', match: '/sekretaris/presensi/create' },
        { href: () => route('sekretaris.presensi.index'), icon: 'fa-clock-rotate-left', label: 'Riwayat Presensi', match: '/sekretaris/presensi' },
    ],
    guru_mapel: [
        { href: () => route('guru_mapel.dashboard'), icon: 'fa-house', label: 'Dashboard', match: '/guru-mapel/dashboard' },
        { href: () => route('guru_mapel.presensi.create'), icon: 'fa-clipboard-list', label: 'Input Presensi', match: '/guru-mapel/presensi/create' },
        { href: () => route('guru_mapel.presensi.index'), icon: 'fa-clock-rotate-left', label: 'Riwayat Presensi', match: '/guru-mapel/presensi' },
        { href: () => route('guru_piket.keterlambatan.create'), icon: 'fa-user-clock', label: 'Input Keterlambatan', match: '/guru-piket/keterlambatan/create' },
        { href: () => route('guru_piket.keterlambatan.index'), icon: 'fa-clock-rotate-left', label: 'Riwayat Terlambat', match: '/guru-piket/keterlambatan' },
    ],
    guru_piket: [
        { href: () => route('guru_piket.dashboard'), icon: 'fa-house', label: 'Dashboard', match: '/guru-piket/dashboard' },
        { href: () => route('guru_piket.keterlambatan.create'), icon: 'fa-user-clock', label: 'Input Keterlambatan', match: '/guru-piket/keterlambatan/create' },
        { href: () => route('guru_piket.keterlambatan.index'), icon: 'fa-clock-rotate-left', label: 'Riwayat Terlambat', match: '/guru-piket/keterlambatan' },
    ],
};

const roleLabelMap = {
    admin: 'Administrator',
    kepala_sekolah: 'Kepala Sekolah',
    wali_kelas: 'Wali Kelas',
    sekretaris: 'Sekretaris',
    guru_mapel: 'Guru Mapel',
    guru_piket: 'Guru Piket',
};

export default function DashboardLayout({ user, children }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash, unread_notifications } = usePage().props;

    const menus = menuPerRole[user.role] ?? [];

    const isActive = (matchPath) => url.startsWith(matchPath);

    return (
        <div className="flex h-screen w-full font-sans antialiased bg-bg text-text overflow-hidden">
            {/* Overlay mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-primary h-screen flex flex-col shadow-2xl shrink-0 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative top-0 left-0 z-40`}>
                {/* Logo */}
                <div className="h-20 flex items-center px-5 border-b border-white/10 shrink-0">
                    <div className="w-9 h-9 rounded flex items-center justify-center mr-3 bg-white shadow-sm overflow-hidden">
                        <img src="/logo2.png" alt="Logo" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-white font-bold text-sm tracking-wide uppercase leading-tight">Portal Presensi</span>
                        <span className="text-secondary text-xs font-semibold">Sistem Presensi</span>
                    </div>
                </div>

                {/* Role Badge */}
                <div className="px-5 py-3 border-b border-white/10">
                    <span className="bg-secondary/20 text-secondary text-xs font-bold px-3 py-1 rounded-full border border-secondary/30">
                        {roleLabelMap[user.role] ?? user.role}
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {menus.map((menu, i) => {
                        let href = '#';
                        try { href = menu.href(); } catch (_) {}
                        const active = isActive(menu.match);
                        return (
                            <Link key={i} href={href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition border-l-4 text-sm ${active
                                    ? 'bg-white/10 text-secondary font-bold border-secondary'
                                    : 'text-gray-300 font-medium border-transparent hover:bg-white/10 hover:text-white hover:border-white/30'
                                }`}>
                                <i className={`fa-solid ${menu.icon} w-4 text-center`}></i>
                                <span>{menu.label}</span>
                            </Link>
                        );
                    })}

                    {/* Global Menus — Profil & Notifikasi */}
                    <div className="pt-3 mt-3 border-t border-white/10 space-y-0.5">
                        <Link href={route('notifikasi.index')}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition border-l-4 text-sm ${isActive('/notifikasi')
                                ? 'bg-white/10 text-secondary font-bold border-secondary'
                                : 'text-gray-300 font-medium border-transparent hover:bg-white/10 hover:text-white hover:border-white/30'
                            }`}>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-bell w-4 text-center relative">
                                    {unread_notifications > 0 && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-primary"></span>
                                    )}
                                </i>
                                <span>Notifikasi</span>
                            </div>
                            {unread_notifications > 0 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {unread_notifications}
                                </span>
                            )}
                        </Link>
                        
                        <Link href={route('profile.edit')}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition border-l-4 text-sm ${isActive('/profile')
                                ? 'bg-white/10 text-secondary font-bold border-secondary'
                                : 'text-gray-300 font-medium border-transparent hover:bg-white/10 hover:text-white hover:border-white/30'
                            }`}>
                            <i className="fa-solid fa-user-gear w-4 text-center"></i>
                            <span>Profil Saya</span>
                        </Link>
                    </div>
                </nav>

                {/* User & Logout */}
                <div className="p-4 border-t border-white/10 shrink-0">
                    <div className="flex items-center gap-3 px-1 mb-3">
                        <div className="w-9 h-9 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {(user.name || 'U').substring(0, 1).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    <Link href={route('logout')} method="post" as="button"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg font-semibold transition text-sm">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Keluar
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 h-screen overflow-y-auto bg-bg relative md:ml-0">
                {/* Topbar Mobile */}
                <div className="md:hidden flex items-center justify-between bg-white px-4 h-14 border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
                        <span className="font-bold text-primary text-sm">Portal Presensi</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={route('notifikasi.index')} className="text-gray-400 hover:text-primary relative p-1 mt-1 mr-1">
                            <i className="fa-solid fa-bell text-lg"></i>
                            {unread_notifications > 0 && (
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            )}
                        </Link>
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-text hover:text-primary p-1">
                            <i className="fa-solid fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.error && (
                    <div className="mx-4 mt-4 flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 border-l-4 border-l-red-500">
                        <i className="fa-solid fa-circle-xmark text-red-500 text-lg"></i>
                        <p className="text-red-700 text-sm font-medium">{flash.error}</p>
                    </div>
                )}
                {flash?.success && (
                    <div className="mx-4 mt-4 flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 border-l-4 border-l-green-500">
                        <i className="fa-solid fa-circle-check text-green-500 text-lg"></i>
                        <p className="text-green-700 text-sm font-medium">{flash.success}</p>
                    </div>
                )}

                {/* Content */}
                <div>{children}</div>
            </main>
        </div>
    );
}
