import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function KelasCreate({ auth, guru_list }) {
    const { data, setData, post, processing, errors } = useForm({ nama_kelas: '', jurusan: '', wali_kelas_id: '' });

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Tambah Kelas" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div><p className="text-white/70 text-xs">Administrator</p><h2 className="text-xl font-bold">Tambah Kelas</h2></div>
                    <Link href={route('admin.kelas.index')} className="text-white/60 hover:text-white"><i className="fa-solid fa-arrow-left text-lg"></i></Link>
                </div>
            </section>
            <form onSubmit={e => { e.preventDefault(); post(route('admin.kelas.store')); }}>
                <section className="px-5 pb-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Kelas *</label>
                                <select value={data.nama_kelas} onChange={e => setData('nama_kelas', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                                    <option value="">-- Pilih --</option>
                                    {['X', 'XI', 'XII'].map(k => <option key={k} value={k}>{k}</option>)}
                                </select>
                                {errors.nama_kelas && <p className="text-red-500 text-xs mt-1">{errors.nama_kelas}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jurusan *</label>
                                <select value={data.jurusan} onChange={e => setData('jurusan', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                                    <option value="">-- Pilih --</option>
                                    {['PPLG', 'TJKT', 'DKV', 'TKR', 'TAB'].map(j => <option key={j} value={j}>{j}</option>)}
                                </select>
                                {errors.jurusan && <p className="text-red-500 text-xs mt-1">{errors.jurusan}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Wali Kelas</label>
                            <select value={data.wali_kelas_id} onChange={e => setData('wali_kelas_id', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                                <option value="">-- Belum ditentukan --</option>
                                {guru_list.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                        </div>
                        <button type="submit" disabled={processing}
                            className="w-full bg-primary text-white font-bold py-3 rounded-xl disabled:opacity-60 flex items-center justify-center gap-2">
                            {processing ? <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...</> : <><i className="fa-solid fa-floppy-disk"></i> Simpan Kelas</>}
                        </button>
                    </div>
                </section>
            </form>
        </DashboardLayout>
    );
}
