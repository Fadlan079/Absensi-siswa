import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import AreaChart from '@/Components/Charts/AreaChart';
import DonutChart from '@/Components/Charts/DonutChart';
import HorizontalBarChart from '@/Components/Charts/HorizontalBarChart';

export default function KepalaSekolahDashboard({ auth, statistik_kelas, kelas_belum_absen, grafik_harian, rekap_sekolah, tanggal }) {
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

            {/* Row 1: AreaChart (Trend) & DonutChart (Breakdown) */}
            <section className="px-5 pb-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Trend Line Chart (takes 2 cols on lg) */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-text">Tren Kehadiran Harian (30 Hari Terakhir)</h3>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Rata-rata persentase kehadiran seluruh kelas dari hari ke hari</p>
                        </div>
                        <div className="w-full">
                            <AreaChart data={grafik_harian} />
                        </div>
                    </div>
                    {/* Overall Donut Chart (takes 1 col on lg) */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between items-center">
                        <div className="w-full mb-4 border-b border-gray-100 pb-3">
                            <h3 className="text-sm font-bold text-text text-center lg:text-left">Distribusi Kehadiran Sekolah</h3>
                            <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5 text-center lg:text-left">Persentase status kehadiran bulan ini</p>
                        </div>
                        <div className="w-full flex-1 flex items-center justify-center">
                            {rekap_sekolah && (
                                <DonutChart data={[
                                    { label: 'Hadir', value: rekap_sekolah.hadir, color: 'var(--color-success, #22C55E)' },
                                    { label: 'Sakit', value: rekap_sekolah.sakit, color: 'var(--color-primary-light, #1D4ED8)' },
                                    { label: 'Izin', value: rekap_sekolah.izin, color: 'var(--color-warning, #FACC15)' },
                                    { label: 'Alpha', value: rekap_sekolah.alpha, color: 'var(--color-danger, #EF4444)' }
                                ]} />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Row 2: Horizontal Bar Chart (Comparison) & Rankings Table */}
            <section className="px-5 pb-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Horizontal Bar Chart (takes 1 col on lg) */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="mb-6 border-b border-gray-100 pb-3">
                            <h3 className="text-sm font-bold text-text">Visualisasi Performa Kelas</h3>
                            <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">Perbandingan persentase kehadiran antar kelas</p>
                        </div>
                        <HorizontalBarChart data={statistik_kelas} />
                    </div>

                    {/* Rankings Table (takes 2 cols on lg) */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
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
                </div>
            </section>
        </DashboardLayout>
    );
}
