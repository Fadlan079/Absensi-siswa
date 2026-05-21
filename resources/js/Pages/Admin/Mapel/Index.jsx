import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function MapelIndex({ auth, mapel_list }) {
    const hapus = (id, nama) => {
        if (confirm(`Hapus mapel "${nama}"?`)) router.delete(route('admin.mapel.destroy', id));
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Kelola Mapel" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <p className="text-white/70 text-xs">Administrator</p>
                        <h2 className="text-xl font-bold">Kelola Mata Pelajaran</h2>
                        <p className="text-white/70 text-sm mt-0.5">{mapel_list.length} mata pelajaran</p>
                    </div>
                    <Link href={route('admin.mapel.create')}
                        className="bg-secondary text-primary font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-secondary/90 transition flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Tambah
                    </Link>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Kode</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Nama Mapel</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left hidden sm:table-cell">Guru</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mapel_list.map((m) => (
                                <tr key={m.id} className="border-b hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{m.kode_mapel}</td>
                                    <td className="px-4 py-3 font-semibold text-text">{m.nama_mapel}</td>
                                    <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{m.guru}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-3">
                                            <Link href={route('admin.mapel.edit', m.id)} className="text-xs font-semibold text-blue-600 hover:underline">Edit</Link>
                                            <button onClick={() => hapus(m.id, m.nama_mapel)} className="text-xs font-semibold text-red-500 hover:underline">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {mapel_list.length === 0 && (
                                <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">Belum ada mata pelajaran</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardLayout>
    );
}
