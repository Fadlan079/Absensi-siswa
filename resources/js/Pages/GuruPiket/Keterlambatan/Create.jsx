import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function KeterlambatanCreate({ auth, siswa, tanggal, tanggal_raw, jam_sekarang }) {
    const { data, setData, post, processing, errors } = useForm({
        siswa_id: '',
        tanggal: tanggal_raw,
        jam_datang: jam_sekarang,
        alasan: '',
        catatan: '',
        sanksi: '',
    });

    const [search, setSearch] = useState('');

    const siswaFiltered = siswa.filter(s =>
        (s.nama || '').toLowerCase().includes((search || '').toLowerCase()) ||
        (s.nis || '').includes(search) ||
        (s.kelas || '').toLowerCase().includes((search || '').toLowerCase())
    );

    const selectedSiswa = siswa.find(s => s.id == data.siswa_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('guru_piket.keterlambatan.store'));
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Input Keterlambatan" />

            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white/70 text-xs">Guru Piket</p>
                            <h2 className="text-xl font-bold">Input Keterlambatan</h2>
                            <p className="text-secondary text-sm font-semibold mt-1">
                                <i className="fa-solid fa-calendar-day mr-1.5"></i>{tanggal}
                            </p>
                        </div>
                        <Link href={route('guru_piket.dashboard')} className="text-white/60 hover:text-white">
                            <i className="fa-solid fa-arrow-left text-lg"></i>
                        </Link>
                    </div>
                </div>
            </section>

            <form onSubmit={handleSubmit}>
                <section className="px-5 pb-3">
                    {/* Pilih Siswa */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Cari Siswa</label>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Ketik nama, NIS, atau kelas..."
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />

                        {search && (
                            <div className="mt-2 max-h-48 overflow-y-auto border border-gray-100 rounded-lg divide-y divide-gray-50">
                                {siswaFiltered.slice(0, 8).map(s => (
                                    <button key={s.id} type="button"
                                        onClick={() => { setData('siswa_id', s.id); setSearch(''); }}
                                        className={`w-full text-left px-3 py-2.5 hover:bg-primary/5 transition flex items-center gap-3 ${data.siswa_id == s.id ? 'bg-primary/10' : ''}`}>
                                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                                            {s.nama.substring(0, 1)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-text">{s.nama}</p>
                                            <p className="text-xs text-gray-400">{s.nis} · {s.kelas}</p>
                                        </div>
                                    </button>
                                ))}
                                {siswaFiltered.length === 0 && <p className="px-3 py-3 text-sm text-gray-400 text-center">Siswa tidak ditemukan</p>}
                            </div>
                        )}

                        {selectedSiswa && (
                            <div className="mt-3 flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                                    {selectedSiswa.nama.substring(0, 1)}
                                </div>
                                <div>
                                    <p className="font-bold text-text text-sm">{selectedSiswa.nama}</p>
                                    <p className="text-xs text-gray-500">{selectedSiswa.nis} · {selectedSiswa.kelas}</p>
                                </div>
                                <button type="button" onClick={() => setData('siswa_id', '')}
                                    className="ml-auto text-gray-400 hover:text-red-500">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        )}
                        {errors.siswa_id && <p className="text-red-500 text-xs mt-1">{errors.siswa_id}</p>}
                    </div>

                    {/* Jam Datang */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Jam Datang</label>
                        <input type="time" value={data.jam_datang} onChange={e => setData('jam_datang', e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-2xl font-bold" />
                        {errors.jam_datang && <p className="text-red-500 text-xs mt-1">{errors.jam_datang}</p>}
                    </div>

                    {/* Alasan & Catatan */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3 space-y-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alasan (opsional)</label>
                            <input type="text" value={data.alasan} onChange={e => setData('alasan', e.target.value)}
                                placeholder="Mis: Macet, Ban bocor..."
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Catatan Guru Piket</label>
                            <textarea value={data.catatan} onChange={e => setData('catatan', e.target.value)}
                                rows={2} placeholder="Catatan tambahan..."
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sanksi</label>
                            <input type="text" value={data.sanksi} onChange={e => setData('sanksi', e.target.value)}
                                placeholder="Mis: Push up 10x, membersihkan kelas..."
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                        </div>
                    </div>
                </section>

                <section className="px-5 pb-6">
                    <button type="submit" disabled={processing || !data.siswa_id}
                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2">
                        {processing ? <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...</>
                            : <><i className="fa-solid fa-user-clock"></i> Catat Keterlambatan</>}
                    </button>
                </section>
            </form>
        </DashboardLayout>
    );
}
