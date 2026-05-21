import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function SiswaIndex({ auth, siswa, kelas_list }) {
    const hapus = (id, nama) => {
        if (confirm(`Hapus siswa "${nama}"?`)) {
            router.delete(route('admin.siswa.destroy', id));
        }
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Data Siswa" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <p className="text-white/70 text-xs">Administrator</p>
                        <h2 className="text-xl font-bold">Data Siswa</h2>
                        <p className="text-white/70 text-sm mt-0.5">{siswa.total} siswa terdaftar</p>
                    </div>
                    <Link href={route('admin.siswa.create')}
                        className="bg-secondary text-primary font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-secondary/90 transition shadow-sm flex items-center gap-2">
                        <i className="fa-solid fa-user-plus"></i> Tambah
                    </Link>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">NIS</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Nama</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">JK</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Kelas</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siswa.data.map((s) => (
                                <tr key={s.id} className="border-b hover:bg-gray-50/50">
                                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{s.nis}</td>
                                    <td className="px-4 py-3 font-semibold text-text">{s.nama}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.jenis_kelamin === 'L' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-600'}`}>
                                            {s.jenis_kelamin === 'L' ? '♂' : '♀'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 text-xs">{s.kelas}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link href={route('admin.siswa.edit', s.id)} className="text-xs font-semibold text-blue-600 hover:underline">Edit</Link>
                                            <button onClick={() => hapus(s.id, s.nama)} className="text-xs font-semibold text-red-500 hover:underline">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {siswa.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-4 border-t">
                            {siswa.links.map((link, i) => (
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
