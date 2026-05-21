import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function MapelEdit({ auth, mapel, guru_list }) {
    const { data, setData, put, processing, errors } = useForm({
        kode_mapel: mapel.kode_mapel, nama_mapel: mapel.nama_mapel, guru_id: mapel.guru_id || '',
    });

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Edit Mapel" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div><p className="text-white/70 text-xs">Administrator</p><h2 className="text-xl font-bold">Edit Mapel: {mapel.nama_mapel}</h2></div>
                    <Link href={route('admin.mapel.index')} className="text-white/60 hover:text-white"><i className="fa-solid fa-arrow-left text-lg"></i></Link>
                </div>
            </section>
            <form onSubmit={e => { e.preventDefault(); put(route('admin.mapel.update', mapel.id)); }}>
                <section className="px-5 pb-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kode Mapel *</label>
                            <input type="text" value={data.kode_mapel} onChange={e => setData('kode_mapel', e.target.value.toUpperCase())}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono uppercase focus:outline-none focus:border-primary" />
                            {errors.kode_mapel && <p className="text-red-500 text-xs mt-1">{errors.kode_mapel}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Mata Pelajaran *</label>
                            <input type="text" value={data.nama_mapel} onChange={e => setData('nama_mapel', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Guru Pengampu</label>
                            <select value={data.guru_id} onChange={e => setData('guru_id', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                                <option value="">-- Belum ditentukan --</option>
                                {guru_list.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                        </div>
                        <button type="submit" disabled={processing}
                            className="w-full bg-primary text-white font-bold py-3 rounded-xl disabled:opacity-60 flex items-center justify-center gap-2">
                            {processing ? <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...</> : <><i className="fa-solid fa-floppy-disk"></i> Perbarui</>}
                        </button>
                    </div>
                </section>
            </form>
        </DashboardLayout>
    );
}
