import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const STATUS_OPTIONS = [
    { value: 'hadir', label: 'H', title: 'Hadir', color: 'bg-green-500 text-white border-green-500',   inactive: 'border-gray-200 text-gray-400 hover:border-green-300' },
    { value: 'sakit', label: 'S', title: 'Sakit', color: 'bg-blue-500 text-white border-blue-500',    inactive: 'border-gray-200 text-gray-400 hover:border-blue-300' },
    { value: 'izin',  label: 'I', title: 'Izin',  color: 'bg-yellow-500 text-white border-yellow-500', inactive: 'border-gray-200 text-gray-400 hover:border-yellow-300' },
    { value: 'alpha', label: 'A', title: 'Alpha', color: 'bg-red-500 text-white border-red-500',       inactive: 'border-gray-200 text-gray-400 hover:border-red-300' },
];

export default function PresensiEdit({ auth, kelas, presensi, detail }) {
    const { data, setData, put, processing } = useForm({
        presensi: detail.map(d => ({
            siswa_id: d.siswa_id,
            status:   d.status,
            catatan:  d.catatan ?? '',
        })),
    });

    const [filterJK, setFilterJK] = useState('semua');

    const updateStatus = (index, status) => {
        const updated = [...data.presensi];
        updated[index] = { ...updated[index], status };
        setData('presensi', updated);
    };

    const setAllStatus = (status) => {
        setData('presensi', data.presensi.map(p => ({ ...p, status })));
    };

    const countStatus = (status) => data.presensi.filter(p => p.status === status).length;

    const filteredDetail = detail.filter(d =>
        filterJK === 'semua' || d.jenis_kelamin === filterJK
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('sekretaris.presensi.update', presensi.id));
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title={`Edit Presensi — ${presensi.tanggal}`} />

            {/* Header */}
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                                    Mode Edit
                                </span>
                            </div>
                            <p className="text-white/70 text-xs">Edit Presensi Harian</p>
                            <h2 className="text-xl font-bold mt-0.5">{kelas.nama}</h2>
                            <p className="text-secondary text-sm font-semibold mt-1">
                                <i className="fa-solid fa-calendar-day mr-1.5"></i>{presensi.tanggal}
                            </p>
                        </div>
                        <Link href={route('sekretaris.presensi.show', presensi.id)} className="text-white/60 hover:text-white">
                            <i className="fa-solid fa-arrow-left text-lg"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Summary Bar */}
            <section className="px-5 pb-3">
                <div className="grid grid-cols-4 gap-2">
                    {STATUS_OPTIONS.map(s => (
                        <div key={s.value} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
                            <p className={`text-xl font-bold ${s.value === 'hadir' ? 'text-green-600' : s.value === 'sakit' ? 'text-blue-600' : s.value === 'izin' ? 'text-yellow-600' : 'text-red-500'}`}>
                                {countStatus(s.value)}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">{s.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Set & Filter */}
            <section className="px-5 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-500 font-medium">Set semua:</span>
                    {STATUS_OPTIONS.map(s => (
                        <button key={s.value} type="button" onClick={() => setAllStatus(s.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition ${s.color}`}>
                            {s.title}
                        </button>
                    ))}
                    <div className="ml-auto flex gap-1">
                        {['semua', 'L', 'P'].map(f => (
                            <button key={f} type="button" onClick={() => setFilterJK(f)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition border ${filterJK === f ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-500'}`}>
                                {f === 'semua' ? 'Semua' : f === 'L' ? '♂ Laki' : '♀ Perempuan'}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <section className="px-5 pb-5">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-text">Edit Kehadiran Siswa</h3>
                                <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">
                                    Perbarui status kehadiran — perubahan hanya bisa dilakukan hari ini
                                </p>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-50 -mx-6 -my-6">
                            {filteredDetail.map((d) => {
                                const actualIdx = data.presensi.findIndex(p => p.siswa_id === d.siswa_id);
                                const current = data.presensi[actualIdx];
                                return (
                                    <div key={d.siswa_id} className="flex items-center gap-4 px-6 py-4.5 hover:bg-slate-50/50 transition-colors first:pt-0 last:pb-6">
                                        {/* Avatar */}
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${d.jenis_kelamin === 'L' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-pink-50 text-pink-600 border border-pink-100'}`}>
                                            {(d.nama || '?').substring(0, 1)}
                                        </div>
                                        {/* Nama & NIS */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-text truncate">{d.nama}</p>
                                            <p className="text-xs text-gray-400 font-semibold font-mono mt-0.5">{d.nis}</p>
                                        </div>
                                        {/* Status Buttons */}
                                        <div className="flex gap-1.5 flex-shrink-0">
                                            {STATUS_OPTIONS.map(opt => (
                                                <button key={opt.value} type="button"
                                                    onClick={() => updateStatus(actualIdx, opt.value)}
                                                    title={opt.title}
                                                    className={`w-9 h-9 rounded-xl border-2 text-xs font-black transition-all ${current?.status === opt.value ? opt.color : opt.inactive}`}>
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Submit */}
                <section className="px-5 pb-6">
                    <button type="submit" disabled={processing}
                        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2">
                        {processing ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan perubahan...</>
                        ) : (
                            <><i className="fa-solid fa-floppy-disk"></i> Simpan Perubahan ({detail.length} Siswa)</>
                        )}
                    </button>
                </section>
            </form>
        </DashboardLayout>
    );
}
