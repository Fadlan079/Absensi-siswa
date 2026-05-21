import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function PresensiMapelIndex({ auth, riwayat }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Riwayat Presensi Mapel" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <p className="text-white/70 text-xs">Guru Mata Pelajaran</p>
                        <h2 className="text-xl font-bold">Riwayat Presensi</h2>
                    </div>
                    <Link href={route('guru_mapel.presensi.create')}
                        className="bg-secondary text-primary font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-secondary/90 transition flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Input
                    </Link>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Mapel</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left hidden sm:table-cell">Kelas</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Tanggal</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Jam ke-</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Hadir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riwayat.data.map((p, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-semibold text-text">{p.mapel}</td>
                                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{p.kelas}</td>
                                    <td className="px-4 py-3 text-gray-500">{p.tanggal}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{p.jam_ke}</span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`text-xs font-semibold ${p.hadir === p.total ? 'text-green-600' : 'text-orange-500'}`}>
                                            {p.hadir}/{p.total}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {riwayat.data.length === 0 && (
                                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                                    Belum ada riwayat presensi. <Link href={route('guru_mapel.presensi.create')} className="text-primary font-semibold hover:underline">Input sekarang →</Link>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardLayout>
    );
}
