import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function DaftarSiswa({ auth, siswa }) {
    const { delete: destroy } = useForm();

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm('Yakin hapus data ini?')) {
            destroy(route('students.destroy', id));
        }
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Daftar Siswa" />

            <section className="p-5">
                <div className="bg-primary p-2 rounded-lg shadow-md border-b-[5px] border-secondary relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white opacity-[0.03] rounded-full blur-2xl"></div>
                        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white rounded-full opacity-40 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full"></div>
                        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-30 transform rotate-45"></div>
                        <div className="absolute bottom-8 left-12 w-3 h-3 border-2 border-white/20 rounded-full"></div>
                    </div>

                    <div className="relative z-10 px-4 py-8 md:px-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="w-full md:w-2/3 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                                Daftar Siswa<br />
                            </h2>
                            <p className="text-gray-200 text-sm md:text-base max-w-md leading-relaxed">
                                Manajemen informasi siswa yang dikelompokkan secara otomatis berdasarkan rumpun kelas dan spesialisasi jurusan.
                            </p>
                        </div>

                        <div className="hidden md:flex w-1/3 justify-end items-center pr-6">
                            <div className="relative bg-white rounded-lg shadow-2xl w-28 h-36 border-t-[14px] border-gray-200 flex flex-col justify-center px-4 gap-3.5 transform -rotate-3">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-4 bg-gray-300 rounded-full border-[3px] border-white shadow-sm"></div>

                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                        <i className="fa-solid fa-folder text-[10px] text-primary"></i>
                                    </div>
                                    <div className="h-1.5 w-10 bg-gray-300 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                        <i className="fa-solid fa-folder text-[10px] text-primary"></i>
                                    </div>
                                    <div className="h-1.5 w-12 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {Object.keys(siswa || {}).length > 0 ? (
                Object.entries(siswa).map(([namaKelas, daftarJurusan]) => (
                    <section key={namaKelas} className="p-5">
                        <div className="border-l-[5px] border-secondary rounded-lg bg-secondary/10 py-3 px-4 mb-4">
                            <h2 className="font-black text-text text-xl tracking-wide uppercase">Kelas: {namaKelas}</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {Object.entries(daftarJurusan).map(([namaJurusan, listSiswa]) => (
                                <div key={namaJurusan} className="bg-white rounded-lg shadow-md border-t-[4px] border-primary overflow-hidden flex flex-col justify-between">
                                    <div>
                                        <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                                            <h3 className="font-bold text-text text-sm md:text-base tracking-tight text-primary">
                                                <i className="fa-solid fa-graduation-cap mr-1.5 text-secondary"></i> {namaJurusan}
                                            </h3>
                                            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-semibold shrink-0">
                                                {listSiswa.length} Siswa
                                            </span>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs tracking-wider uppercase">
                                                        <th className="py-2.5 px-4 w-12 text-center">No</th>
                                                        <th className="py-2.5 px-4">Nama Lengkap</th>
                                                        <th className="py-2.5 px-4">NISN</th>
                                                        <th className="py-2.5 px-4 w-20 text-center">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50 text-sm text-text">
                                                    {listSiswa.map((s, index) => (
                                                        <tr key={s.id} className="hover:bg-gray-50/40 transition">
                                                            <td className="py-2 px-4 text-center text-xs font-medium text-gray-400">
                                                                {index + 1}
                                                            </td>
                                                            <td className="py-2 px-4 font-bold text-text truncate max-w-[180px]">
                                                                {s.nama}
                                                            </td>
                                                            <td className="py-2 px-4 font-mono text-xs text-gray-500">
                                                                {s.nisn || '-'}
                                                            </td>
                                                            <td className="py-2 px-4 text-center">
                                                                <div className="flex items-center justify-center gap-1.5">
                                                                    <form onSubmit={(e) => handleDelete(e, s.id)}>
                                                                        <button type="submit"
                                                                            className="p-1.5 bg-danger/20 hover:bg-danger/40 text-danger rounded transition" title="Hapus Siswa">
                                                                            <i className="fa-solid fa-trash text-[10px]"></i>
                                                                        </button>
                                                                    </form>
                                                                    <Link href={route('students.edit', s.id)} className="p-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded transition" title="Edit Siswa">
                                                                        <i className="fa-solid fa-pen text-[10px]"></i>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))
            ) : (
                <section className="p-5">
                    <div className="bg-white rounded-lg shadow-md border-t-[5px] border-primary p-12 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <i className="fa-solid fa-folder-open text-4xl text-gray-300"></i>
                            <span className="font-medium">Belum ada data siswa yang dikelompokkan.</span>
                        </div>
                    </div>
                </section>
            )}
        </DashboardLayout>
    );
}
