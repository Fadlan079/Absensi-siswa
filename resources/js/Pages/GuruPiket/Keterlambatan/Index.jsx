import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function KeterlambatanIndex({ auth, riwayat }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Riwayat Keterlambatan" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-6 text-white shadow-md border-b-4 border-secondary">
                    <p className="text-white/70 text-sm">Guru Piket</p>
                    <h2 className="text-2xl font-bold">Riwayat Keterlambatan</h2>
                </div>
            </section>

            <section className="px-5 pb-2 flex justify-between items-center">
                <h3 className="font-bold text-text border-l-4 border-secondary pl-3">Semua Data</h3>
                <Link href={route('guru_piket.keterlambatan.create')}
                    className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition shadow-sm">
                    <i className="fa-solid fa-plus"></i> Tambah
                </Link>
            </section>

            <section className="px-5 pb-5">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Siswa</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left hidden sm:table-cell">Kelas</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Tanggal</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Jam Datang</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left hidden md:table-cell">Alasan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riwayat.data.map((k, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-semibold text-text">{k.siswa}</td>
                                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{k.kelas}</td>
                                    <td className="px-4 py-3 text-gray-600">{k.tanggal}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">{k.jam_datang}</span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{k.alasan || '-'}</td>
                                </tr>
                            ))}
                            {riwayat.data.length === 0 && (
                                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">Belum ada data keterlambatan</td></tr>
                            )}
                        </tbody>
                    </table>
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
