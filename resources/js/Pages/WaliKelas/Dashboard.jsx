import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Hadir', value: statistik.hadir, color: 'bg-green-100 text-green-700 border-green-200' },
                            { label: 'Sakit', value: statistik.sakit, color: 'bg-blue-100 text-blue-700 border-blue-200' },
                            { label: 'Izin', value: statistik.izin, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                            { label: 'Alpha', value: statistik.alpha, color: 'bg-red-100 text-red-700 border-red-200' },
                        ].map((s, i) => (
                            <div key={i} className={`rounded-xl border p-4 text-center ${s.color}`}>
                                <p className="text-2xl font-bold">{s.value}</p>
                                <p className="text-xs font-semibold mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="px-5 pb-5 mt-2">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-base">Riwayat Presensi Terbaru</h2>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Tanggal</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Hadir</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Alpha</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Total</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left hidden sm:table-cell">Oleh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presensi_recent.map((p, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-medium">{p.tanggal}</td>
                                    <td className="px-4 py-3 text-center text-green-600 font-semibold">{p.hadir}</td>
                                    <td className="px-4 py-3 text-center text-red-500 font-semibold">{p.alpha}</td>
                                    <td className="px-4 py-3 text-center text-gray-500">{p.total}</td>
                                    <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{p.oleh}</td>
                                </tr>
                            ))}
                            {presensi_recent.length === 0 && (
                                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">Belum ada data presensi</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardLayout>
    );
}
