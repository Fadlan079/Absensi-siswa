import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function SiswaEdit({ auth, siswa, kelas_list }) {
    const { data, setData, put, processing, errors } = useForm({
        nis: siswa.nis, nisn: siswa.nisn || '', nama: siswa.nama,
        jenis_kelamin: siswa.jenis_kelamin, kelas_id: siswa.kelas_id || '',
    });

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Edit Siswa" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <p className="text-white/70 text-xs">Administrator</p>
                        <h2 className="text-xl font-bold">Edit Siswa</h2>
                        <p className="text-white/70 text-sm">{siswa.nama}</p>
                    </div>
                    <Link href={route('admin.siswa.index')} className="text-white/60 hover:text-white">
                        <i className="fa-solid fa-arrow-left text-lg"></i>
                    </Link>
                </div>
            </section>

            <form onSubmit={e => { e.preventDefault(); put(route('admin.siswa.update', siswa.id)); }}>
                <section className="px-5 pb-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">NIS *</label>
                                <input type="text" value={data.nis} onChange={e => setData('nis', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                                {errors.nis && <p className="text-red-500 text-xs mt-1">{errors.nis}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">NISN</label>
                                <input type="text" value={data.nisn} onChange={e => setData('nisn', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                                {errors.nisn && <p className="text-red-500 text-xs mt-1">{errors.nisn}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap *</label>
                            <input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jenis Kelamin *</label>
                            <div className="flex gap-3">
                                {[{ v: 'L', label: '♂ Laki-laki' }, { v: 'P', label: '♀ Perempuan' }].map(jk => (
                                    <label key={jk.v} className={`flex-1 text-center py-2.5 rounded-lg border-2 cursor-pointer transition font-semibold text-sm ${data.jenis_kelamin === jk.v ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-400'}`}>
                                        <input type="radio" value={jk.v} checked={data.jenis_kelamin === jk.v}
                                            onChange={() => setData('jenis_kelamin', jk.v)} className="sr-only" />
                                        {jk.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kelas *</label>
                            <select value={data.kelas_id} onChange={e => setData('kelas_id', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                                <option value="">-- Pilih Kelas --</option>
                                {kelas_list.map(k => (
                                    <option key={k.id} value={k.id}>{k.nama_kelas} {k.jurusan}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" disabled={processing}
                            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition shadow-sm flex items-center justify-center gap-2">
                            {processing ? <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...</>
                                : <><i className="fa-solid fa-floppy-disk"></i> Perbarui</>}
                        </button>
                    </div>
                </section>
            </form>
        </DashboardLayout>
    );
}
