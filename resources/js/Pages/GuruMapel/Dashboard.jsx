import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function GuruMapelDashboard({ auth, mapels, recent_presensi }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Dashboard Guru Mapel" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-6 text-white shadow-md border-b-4 border-secondary">
                    <p className="text-white/70 text-sm">Guru Mata Pelajaran</p>
                    <h2 className="text-2xl font-bold">{auth.user.name}</h2>
                    <p className="text-white/70 text-sm mt-1">{mapels.length} mata pelajaran diajarkan</p>
                </div>
            </section>

            <section className="px-5 pb-3">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-base">Mata Pelajaran Saya</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {mapels.map((m, i) => (
                        <span key={i} className="bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full border border-primary/20">
                            <i className="fa-solid fa-book mr-2"></i>{m.nama}
                        </span>
                    ))}
                    {mapels.length === 0 && <p className="text-gray-400 text-sm">Belum ada mata pelajaran yang ditugaskan</p>}
                </div>
            </section>

            <section className="px-5 pb-3">
                <Link href={route('guru_mapel.presensi.create')}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition shadow-sm">
                    <i className="fa-solid fa-clipboard-list"></i>
                    Input Presensi Mapel
                </Link>
            </section>

            <section className="px-5 pb-5">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-base">Presensi Terbaru</h2>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Mapel</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Kelas</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Tanggal</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Jam ke-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent_presensi.map((p, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-medium">{p.mapel}</td>
                                    <td className="px-4 py-3 text-gray-500">{p.kelas}</td>
                                    <td className="px-4 py-3 text-gray-500">{p.tanggal}</td>
                                    <td className="px-4 py-3 text-center text-gray-500">{p.jam_ke}</td>
                                </tr>
                            ))}
                            {recent_presensi.length === 0 && (
                                <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">Belum ada riwayat presensi</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardLayout>
    );
}
