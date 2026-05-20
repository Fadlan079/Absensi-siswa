import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EditSiswa({ auth, student }) {
    const { data, setData, put, errors, processing } = useForm({
        nisn: student.nisn || '',
        nama: student.nama || '',
        kelas: student.kelas || '',
        jurusan: student.jurusan || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('students.update', student.id));
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Edit Data Siswa" />

            <section className="p-5">
                <div className="bg-primary p-2 rounded-lg shadow-md border-b-[5px] border-secondary relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white opacity-[0.03] rounded-full blur-2xl"></div>
                        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white rounded-full opacity-40 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full"></div>
                        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-30 transform rotate-45"></div>
                        <div className="absolute bottom-8 left-12 w-3 h-3 border-2 border-white/20 rounded-full"></div>
                    </div>

                    <div className="relative z-10 px-4 py-6 md:px-8 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="w-full md:w-2/3 space-y-2">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
                                Ubah Informasi <br />
                                <span className="text-secondary">Profil Siswa</span>
                            </h2>
                            <p className="text-gray-200 text-xs md:text-sm max-w-md leading-relaxed">
                                Pastikan NISN dan nama lengkap diisi sesuai dengan dokumen administrasi resmi sekolah.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5 pt-0">
                <div className="bg-white rounded-lg shadow-md border-t-[5px] border-primary max-w-2xl mx-auto">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 text-primary flex items-center justify-center shadow-inner">
                            <i className="fa-solid fa-user-gear text-sm"></i>
                        </div>
                        <div>
                            <h3 className="font-bold text-text text-base">Formulir Pembaruan Data</h3>
                            <p className="text-xs text-gray-400">ID Siswa: #{student.id}</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6 space-y-5">
                        <div className="space-y-1.5">
                            <label htmlFor="nisn" className="block font-bold text-sm text-text">
                                NISN <span className="text-red-500">*</span>
                            </label>
                            <input type="text"
                                id="nisn"
                                value={data.nisn}
                                onChange={(e) => setData('nisn', e.target.value)}
                                className={`w-full p-2.5 rounded border ${errors.nisn ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'} bg-white text-sm text-text focus:outline-none focus:ring-4 transition font-mono`}
                                placeholder="Masukkan 10 digit NISN..."
                                required />
                            {errors.nisn && (
                                <p className="text-xs text-red-500 font-semibold mt-1">
                                    <i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.nisn}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="nama" className="block font-bold text-sm text-text">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input type="text"
                                id="nama"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className={`w-full p-2.5 rounded border ${errors.nama ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'} bg-white text-sm text-text focus:outline-none focus:ring-4 transition`}
                                placeholder="Masukkan nama lengkap siswa..."
                                required />
                            {errors.nama && (
                                <p className="text-xs text-red-500 font-semibold mt-1">
                                    <i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.nama}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label htmlFor="kelas" className="block font-bold text-sm text-text">
                                    Kelas <span className="text-red-500">*</span>
                                </label>
                                <input type="text"
                                    id="kelas"
                                    value={data.kelas}
                                    onChange={(e) => setData('kelas', e.target.value)}
                                    className={`w-full p-2.5 rounded border ${errors.kelas ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'} bg-white text-sm text-text focus:outline-none focus:ring-4 transition uppercase`}
                                    placeholder="Contoh: XII, XI, X..."
                                    required />
                                {errors.kelas && (
                                    <p className="text-xs text-red-500 font-semibold mt-1">
                                        <i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.kelas}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="jurusan" className="block font-bold text-sm text-text">
                                    Kompetensi Keahlian (Jurusan) <span className="text-red-500">*</span>
                                </label>
                                <select id="jurusan"
                                    value={data.jurusan}
                                    onChange={(e) => setData('jurusan', e.target.value)}
                                    className={`w-full p-2.5 rounded border ${errors.jurusan ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'} bg-white text-sm text-text focus:outline-none focus:ring-4 transition cursor-pointer`}
                                    required>
                                    <option value="" disabled>-- Pilih Jurusan --</option>
                                    {['PPLG', 'TJKT', 'DKV', 'MPLB'].map(jrs => (
                                        <option key={jrs} value={jrs}>{jrs}</option>
                                    ))}
                                </select>
                                {errors.jurusan && (
                                    <p className="text-xs text-red-500 font-semibold mt-1">
                                        <i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.jurusan}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={() => window.history.back()}
                                className="px-4 py-2.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-text font-semibold text-sm transition shadow-sm">
                                Batal
                            </button>
                            <button type="submit" disabled={processing}
                                className="px-5 py-2.5 rounded bg-primary hover:bg-primary-light text-white font-bold text-sm transition shadow-md flex items-center gap-2">
                                <i className="fa-solid fa-floppy-disk text-xs"></i> Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </DashboardLayout>
    );
}
