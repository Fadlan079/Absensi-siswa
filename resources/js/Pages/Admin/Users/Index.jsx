import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';

const roleLabel = {
    admin: 'Admin', kepala_sekolah: 'Kepala Sekolah',
    wali_kelas: 'Wali Kelas', sekretaris: 'Sekretaris',
    guru_mapel: 'Guru Mapel', guru_piket: 'Guru Piket',
};
const roleColor = {
    admin: 'bg-primary/10 text-primary',
    kepala_sekolah: 'bg-blue-100 text-blue-700',
    wali_kelas: 'bg-green-100 text-green-700',
    sekretaris: 'bg-yellow-100 text-yellow-700',
    guru_mapel: 'bg-purple-100 text-purple-700',
    guru_piket: 'bg-orange-100 text-orange-700',
};

export default function UsersIndex({ auth, users }) {
    const hapus = (id, name) => {
        if (confirm(`Hapus pengguna "${name}"?`)) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Kelola Pengguna" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <p className="text-white/70 text-xs">Administrator</p>
                        <h2 className="text-xl font-bold">Kelola Pengguna</h2>
                        <p className="text-white/70 text-sm mt-0.5">{users.total} pengguna terdaftar</p>
                    </div>
                    <Link href={route('admin.users.create')}
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
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Nama</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left hidden sm:table-cell">Email</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Role</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left hidden md:table-cell">Kelas</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((u) => (
                                <tr key={u.id} className="border-b hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-semibold text-text">{u.name}</td>
                                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell text-xs">{u.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleColor[u.role] || 'bg-gray-100 text-gray-600'}`}>
                                            {roleLabel[u.role] || u.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{u.kelas || '-'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link href={route('admin.users.edit', u.id)}
                                                className="text-xs font-semibold text-blue-600 hover:underline">Edit</Link>
                                            <button onClick={() => hapus(u.id, u.name)}
                                                className="text-xs font-semibold text-red-500 hover:underline">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-4 border-t">
                            {users.links.map((link, i) => (
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
