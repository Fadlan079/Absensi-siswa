import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const statusConfig = {
    hadir: { label: 'Hadir', color: 'bg-green-100 text-green-700 border-green-200' },
    sakit: { label: 'Sakit', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    izin:  { label: 'Izin',  color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    alpha: { label: 'Alpha', color: 'bg-red-100 text-red-700 border-red-200' },
};

export default function PresensiIndex({ auth, kelas, riwayat }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Riwayat Presensi" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-6 text-white shadow-md border-b-4 border-secondary">
                    <p className="text-white/70 text-sm">Sekretaris Kelas</p>
                    <h2 className="text-2xl font-bold">{kelas.nama}</h2>
                    <p className="text-white/70 text-sm mt-1">Riwayat Presensi Harian</p>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-text">Daftar Presensi</h3>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Riwayat Pengisian Presensi Harian</p>
                        </div>
                        <Link href={route('sekretaris.presensi.create')}
                            className="flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary/95 transition shadow-sm self-start sm:self-auto">
                            <i className="fa-solid fa-plus"></i> Isi Presensi
                        </Link>
                    </div>

                    <div className="overflow-x-auto -mx-6">
                        <table className="w-full text-sm min-w-[550px] border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-gray-100">
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase text-left tracking-wider">Tanggal</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-success uppercase text-center tracking-wider">H</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-blue-600 uppercase text-center tracking-wider">S</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-warning uppercase text-center tracking-wider">I</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-danger uppercase text-center tracking-wider">A</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase text-center tracking-wider hidden sm:table-cell">Total</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase text-center tracking-wider">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riwayat.data.map((p, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-text">{p.tanggal}</td>
                                        <td className="px-6 py-4 text-center font-black text-success text-base">{p.hadir}</td>
                                        <td className="px-6 py-4 text-center font-black text-blue-600 text-base">{p.sakit}</td>
                                        <td className="px-6 py-4 text-center font-black text-warning text-base">{p.izin}</td>
                                        <td className="px-6 py-4 text-center font-black text-danger text-base">{p.alpha}</td>
                                        <td className="px-6 py-4 text-center text-gray-500 font-semibold hidden sm:table-cell">{p.total}</td>
                                        <td className="px-6 py-4 text-center">
                                            <Link href={route('sekretaris.presensi.show', p.id)}
                                                className="text-blue-600 hover:text-blue-800 text-xs font-bold transition">
                                                Lihat
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {riwayat.data.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium">
                                            Belum ada data presensi. <Link href={route('sekretaris.presensi.create')} className="text-primary font-semibold hover:underline">Isi sekarang →</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {riwayat.last_page > 1 && (
                        <div className="flex justify-center gap-2 pt-6 mt-2 border-t border-gray-100">
                            {riwayat.links.map((link, i) => (
                                <Link key={i} href={link.url || '#'}
                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${link.active ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </DashboardLayout>
    );
}
