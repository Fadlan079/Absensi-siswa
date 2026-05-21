import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function KelasIndex({ auth, kelas_list }) {
    const hapus = (id, nama) => {
        if (confirm(`Hapus kelas "${nama}"?`)) router.delete(route('admin.kelas.destroy', id));
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Kelola Kelas" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <p className="text-white/70 text-xs">Administrator</p>
                        <h2 className="text-xl font-bold">Kelola Kelas</h2>
                        <p className="text-white/70 text-sm mt-0.5">{kelas_list.length} kelas terdaftar</p>
                    </div>
                    <Link href={route('admin.kelas.create')}
                        className="bg-secondary text-primary font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-secondary/90 transition flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Tambah
                    </Link>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kelas_list.map((k) => (
                        <div key={k.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <i className="fa-solid fa-chalkboard text-primary text-lg"></i>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={route('admin.kelas.edit', k.id)} className="text-xs font-semibold text-blue-600 hover:underline">Edit</Link>
                                    <button onClick={() => hapus(k.id, `${k.nama_kelas} ${k.jurusan}`)} className="text-xs font-semibold text-red-500 hover:underline">Hapus</button>
                                </div>
                            </div>
                            <h3 className="font-bold text-text text-lg">{k.nama_kelas} <span className="text-primary">{k.jurusan}</span></h3>
                            <p className="text-xs text-gray-500 mt-1"><i className="fa-solid fa-user-tie mr-1"></i>{k.wali_kelas}</p>
                            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-xs text-gray-400">{k.total_siswa} siswa</span>
                                <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">Kelas {k.nama_kelas}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </DashboardLayout>
    );
}
