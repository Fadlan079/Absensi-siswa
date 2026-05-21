import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function KepalaSekolahDashboard({ auth, statistik_kelas, kelas_belum_absen, grafik_harian, tanggal }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Dashboard Kepala Sekolah" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-6 text-white shadow-md border-b-4 border-secondary">
                    <p className="text-white/70 text-sm">Monitoring Kehadiran</p>
                    <h2 className="text-2xl font-bold mt-0.5">Dashboard Kepala Sekolah</h2>
                    <p className="text-white/70 text-sm mt-1">{tanggal}</p>
                </div>
            </section>

            {kelas_belum_absen.length > 0 && (
                <section className="px-5 pb-2">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <p className="font-semibold text-yellow-800 text-sm mb-2">
                            <i className="fa-solid fa-bell mr-2"></i>
                            {kelas_belum_absen.length} kelas belum mengisi presensi hari ini
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {kelas_belum_absen.map((k, i) => (
                                <span key={i} className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-300">{k.nama}</span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="px-5 pb-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-text">Statistik Kehadiran Bulan Ini (per Kelas)</h3>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Ranking persentase kehadiran seluruh kelas</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto -mx-6">
                        <table className="w-full text-sm min-w-[500px] border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-gray-100">
                                    <th className="text-left px-6 py-4.5 text-xs font-bold text-gray-500 uppercase tracking-wider w-20">Rank</th>
                                    <th className="text-left px-6 py-4.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Kelas</th>
                                    <th className="text-left px-6 py-4.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Total Siswa</th>
                                    <th className="text-left px-6 py-4.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Hadir</th>
                                    <th className="text-left px-6 py-4.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Persentase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statistik_kelas.map((k, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            {i === 0 && <span className="text-yellow-500 font-bold">🏆 1</span>}
                                            {i === 1 && <span className="text-gray-400 font-bold">🥈 2</span>}
                                            {i === 2 && <span className="text-orange-400 font-bold">🥉 3</span>}
                                            {i > 2 && <span className="text-gray-500 font-bold">{i + 1}</span>}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-text">{k.kelas}</td>
                                        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell font-semibold text-xs">{k.total_siswa} siswa</td>
                                        <td className="px-6 py-4 text-gray-700 font-semibold">{k.hadir}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-[80px]">
                                                    <div className="bg-primary h-2 rounded-full" style={{ width: `${k.persen}%` }}></div>
                                                </div>
                                                <span className={`text-xs font-bold ${k.persen >= 85 ? 'text-green-600' : k.persen >= 70 ? 'text-yellow-600' : 'text-red-500'}`}>
                                                    {k.persen}%
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {statistik_kelas.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">
                                            Belum ada data presensi bulan ini
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-4 mt-2 border-t border-gray-100 text-center">
                        <Link href={route('kepala_sekolah.ranking')} className="text-primary text-xs font-bold hover:underline inline-flex items-center gap-1">
                            Lihat Ranking Lengkap <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
