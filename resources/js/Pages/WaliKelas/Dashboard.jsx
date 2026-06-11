import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import DonutChart from '@/Components/Charts/DonutChart';
import GroupedBarChart from '@/Components/Charts/GroupedBarChart';

export default function WaliKelasDashboard({ auth, kelas, statistik, presensi_recent }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Dashboard Wali Kelas" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-6 text-white shadow-md border-b-4 border-secondary">
                    <p className="text-white/70 text-sm">Wali Kelas</p>
                    <h2 className="text-2xl font-bold">{kelas ? kelas.nama : 'Belum ditugaskan ke kelas'}</h2>
                    <p className="text-white/70 text-sm mt-1">Monitoring Kehadiran Kelas</p>
                </div>
            </section>

            {statistik && (
                <section className="px-5 pb-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Stat Cards */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-3 h-fit">
                            {[
                                { label: 'Hadir', value: statistik.hadir, color: 'bg-green-100/80 text-green-700 border-green-200' },
                                { label: 'Sakit', value: statistik.sakit, color: 'bg-blue-100/80 text-blue-700 border-blue-200' },
                                { label: 'Izin', value: statistik.izin, color: 'bg-yellow-100/80 text-yellow-700 border-yellow-200' },
                                { label: 'Alpha', value: statistik.alpha, color: 'bg-red-100/80 text-red-700 border-red-200' },
                            ].map((s, i) => (
                                <div key={i} className={`rounded-2xl border p-5 text-center shadow-sm backdrop-blur-sm ${s.color}`}>
                                    <p className="text-3xl font-black">{s.value}</p>
                                    <p className="text-xs font-bold mt-1 uppercase tracking-wider">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        {/* Donut Chart Visual */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-center items-center">
                            <h3 className="text-sm font-bold text-text text-center w-full pb-3 border-b border-gray-100 mb-2">Visualisasi Kehadiran</h3>
                            <DonutChart data={[
                                { label: 'Hadir', value: statistik.hadir, color: 'var(--color-success, #22C55E)' },
                                { label: 'Sakit', value: statistik.sakit, color: 'var(--color-primary-light, #1D4ED8)' },
                                { label: 'Izin', value: statistik.izin, color: 'var(--color-warning, #FACC15)' },
                                { label: 'Alpha', value: statistik.alpha, color: 'var(--color-danger, #EF4444)' }
                            ]} />
                        </div>
                    </div>
                </section>
            )}

            <section className="px-5 pb-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Grouped Bar Chart */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
                        <div className="mb-4 border-b border-gray-100 pb-3">
                            <h3 className="text-sm font-bold text-text">Perbandingan Kehadiran vs Alpha</h3>
                            <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">Tren presensi 10 sesi terakhir</p>
                        </div>
                        <div className="w-full flex-1 flex items-center justify-center">
                            <GroupedBarChart data={presensi_recent} />
                        </div>
                    </div>

                    {/* Recent Presensi Table */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-text">Riwayat Presensi Terbaru</h3>
                                <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Daftar presensi kelas yang baru dilakukan</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto -mx-6">
                            <table className="w-full text-sm min-w-[550px] border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/70 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-left tracking-wider">Tanggal</th>
                                        <th className="px-6 py-4 text-xs font-bold text-success uppercase text-center tracking-wider">Hadir</th>
                                        <th className="px-6 py-4 text-xs font-bold text-danger uppercase text-center tracking-wider">Alpha</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center tracking-wider">Total</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-left tracking-wider hidden sm:table-cell">Oleh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {presensi_recent.map((p, i) => (
                                        <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-text">{p.tanggal}</td>
                                            <td className="px-6 py-4 text-center text-green-600 font-extrabold text-base">{p.hadir}</td>
                                            <td className="px-6 py-4 text-center text-red-500 font-extrabold text-base">{p.alpha}</td>
                                            <td className="px-6 py-4 text-center text-gray-500 font-semibold">{p.total}</td>
                                            <td className="px-6 py-4 text-gray-400 font-semibold text-xs hidden sm:table-cell">{p.oleh}</td>
                                        </tr>
                                    ))}
                                    {presensi_recent.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">
                                                Belum ada data presensi
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
