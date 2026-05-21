import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const roleLabel = {
    admin: 'Administrator',
    kepala_sekolah: 'Kepala Sekolah',
    wali_kelas: 'Wali Kelas',
    sekretaris: 'Sekretaris',
    guru_mapel: 'Guru Mapel',
    guru_piket: 'Guru Piket',
};

const roleBadgeColor = {
    admin: 'bg-primary text-white',
    kepala_sekolah: 'bg-blue-600 text-white',
    wali_kelas: 'bg-green-600 text-white',
    sekretaris: 'bg-yellow-500 text-white',
    guru_mapel: 'bg-purple-600 text-white',
    guru_piket: 'bg-orange-500 text-white',
};

function StatCard({ icon, label, value, color = 'bg-primary', sub }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition">
            <div className={`${color} text-white rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                <i className={`fa-solid ${icon} text-xl`}></i>
            </div>
            <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-text mt-0.5">{value}</p>
                {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

export default function AdminDashboard({ auth, stats, daftar_belum_absen, user_terbaru }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Dashboard Admin" />

            {/* Header */}
            <section className="p-5">
                <div className="bg-primary rounded-xl p-6 text-white relative overflow-hidden shadow-md border-b-4 border-secondary">
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="admin-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <circle cx="3" cy="3" r="2" fill="currentColor"></circle>
                                </pattern>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#admin-pattern)"></rect>
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <p className="text-white/70 text-sm font-medium">Selamat Datang,</p>
                        <h2 className="text-2xl font-bold mt-0.5">{auth.user.name}</h2>
                        <p className="text-white/80 text-sm mt-1">Panel Administrasi Sistem Portal Presensi</p>
                    </div>
                </div>
            </section>

            {/* Stat Cards */}
            <section className="px-5 pb-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <StatCard icon="fa-users" label="Total Siswa" value={stats.total_siswa} color="bg-primary" />
                    <StatCard icon="fa-chalkboard" label="Total Kelas" value={stats.total_kelas} color="bg-blue-600" />
                    <StatCard icon="fa-user-tie" label="Total Guru" value={stats.total_guru} color="bg-green-600" />
                    <StatCard icon="fa-book" label="Mata Pelajaran" value={stats.total_mapel} color="bg-purple-600" />
                    <StatCard icon="fa-triangle-exclamation" label="Belum Absen" value={stats.kelas_belum_absen} color={stats.kelas_belum_absen > 0 ? "bg-red-500" : "bg-green-500"} sub="kelas hari ini" />
                </div>
            </section>

            {/* Alert Kelas Belum Absen */}
            {daftar_belum_absen.length > 0 && (
                <section className="px-5 py-3">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <i className="fa-solid fa-bell text-yellow-600"></i>
                            <h3 className="font-semibold text-yellow-800 text-sm">
                                {daftar_belum_absen.length} Kelas Belum Mengisi Presensi Hari Ini
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {daftar_belum_absen.map((k, i) => (
                                <span key={i} className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-300">
                                    {k.nama_kelas} {k.jurusan}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Quick Actions */}
            <section className="px-5 py-3">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-text text-base">Akses Cepat</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { href: route('admin.users.index'), icon: 'fa-user-plus', label: 'Kelola User', color: 'text-primary' },
                        { href: route('admin.kelas.index'), icon: 'fa-chalkboard', label: 'Kelola Kelas', color: 'text-blue-600' },
                        { href: route('admin.mapel.index'), icon: 'fa-book-open', label: 'Kelola Mapel', color: 'text-purple-600' },
                        { href: route('admin.siswa.index'), icon: 'fa-users', label: 'Data Siswa', color: 'text-green-600' },
                    ].map((item, i) => (
                        <Link key={i} href={item.href}
                            className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-primary/20 transition text-center">
                            <i className={`fa-solid ${item.icon} text-2xl ${item.color}`}></i>
                            <span className="text-xs font-semibold text-text">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* User Terbaru */}
            <section className="px-5 pb-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-text">Pengguna Terbaru</h3>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Daftar pengguna yang baru didaftarkan</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto -mx-6">
                        <table className="w-full text-sm min-w-[500px] border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-gray-100">
                                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user_terbaru.map((u) => (
                                    <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-text">{u.name}</td>
                                        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell text-xs">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleBadgeColor[u.role] || 'bg-gray-100 text-gray-700'}`}>
                                                {roleLabel[u.role] || u.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-4 mt-2 border-t border-gray-100 text-center">
                        <Link href={route('admin.users.index')} className="text-primary text-xs font-bold hover:underline inline-flex items-center gap-1">
                            Lihat Semua Pengguna <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
