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
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-text text-base">Statistik Kehadiran Bulan Ini (per Kelas)</h2>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Rank</th>
                                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Kelas</th>
                                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden sm:table-cell">Total Siswa</th>
                                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Hadir</th>
                                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">% Hadir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statistik_kelas.map((k, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-4 py-3">
                                        {i === 0 && <span className="text-yellow-500 font-bold">🏆 1</span>}
                                        {i === 1 && <span className="text-gray-400 font-bold">🥈 2</span>}
                                        {i === 2 && <span className="text-orange-400 font-bold">🥉 3</span>}
                                        {i > 2 && <span className="text-gray-500 font-medium">{i + 1}</span>}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-text">{k.kelas}</td>
                                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{k.total_siswa} siswa</td>
                                    <td className="px-4 py-3 text-gray-700">{k.hadir}</td>
                                    <td className="px-4 py-3">
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
                                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Belum ada data presensi bulan ini</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-3 text-right">
                    <Link href={route('kepala_sekolah.ranking')} className="text-primary text-sm font-semibold hover:underline">
                        Lihat Ranking Lengkap →
                    </Link>
                </div>
            </section>
        </DashboardLayout>
    );
}
