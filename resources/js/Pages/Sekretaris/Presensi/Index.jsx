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

            <section className="px-5 pb-2 flex justify-between items-center">
                <h3 className="font-bold text-text border-l-4 border-secondary pl-3">Daftar Presensi</h3>
                <Link href={route('sekretaris.presensi.create')}
                    className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition shadow-sm">
                    <i className="fa-solid fa-plus"></i>
                    Isi Presensi
                </Link>
            </section>

            <section className="px-5 pb-5">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Tanggal</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">H</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">S</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">I</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">A</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center hidden sm:table-cell">Total</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riwayat.data.map((p, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-medium text-text">{p.tanggal}</td>
                                    <td className="px-4 py-3 text-center font-semibold text-green-600">{p.hadir}</td>
                                    <td className="px-4 py-3 text-center font-semibold text-blue-600">{p.sakit}</td>
                                    <td className="px-4 py-3 text-center font-semibold text-yellow-600">{p.izin}</td>
                                    <td className="px-4 py-3 text-center font-semibold text-red-500">{p.alpha}</td>
                                    <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">{p.total}</td>
                                    <td className="px-4 py-3 text-center">
                                        <Link href={route('sekretaris.presensi.show', p.id)}
                                            className="text-primary hover:underline text-xs font-semibold">
                                            Lihat
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {riwayat.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                                        Belum ada data presensi. <Link href={route('sekretaris.presensi.create')} className="text-primary font-semibold hover:underline">Isi sekarang →</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {riwayat.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-4 border-t">
                            {riwayat.links.map((link, i) => (
                                <Link key={i} href={link.url || '#'}
                                    className={`px-3 py-1 rounded text-sm ${link.active ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </DashboardLayout>
    );
}
