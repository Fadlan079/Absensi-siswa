import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const STATUS_OPTIONS = [
    { value: 'hadir', label: 'H', color: 'bg-green-500 text-white border-green-500', inactive: 'border-gray-200 text-gray-400' },
    { value: 'sakit', label: 'S', color: 'bg-blue-500 text-white border-blue-500', inactive: 'border-gray-200 text-gray-400' },
    { value: 'izin',  label: 'I', color: 'bg-yellow-500 text-white border-yellow-500', inactive: 'border-gray-200 text-gray-400' },
    { value: 'alpha', label: 'A', color: 'bg-red-500 text-white border-red-500', inactive: 'border-gray-200 text-gray-400' },
];

export default function PresensiMapelCreate({ auth, mapels, kelas_list, tanggal, tanggal_raw }) {
    const { data, setData, post, processing, errors } = useForm({
        mapel_id: '', kelas_id: '', tanggal: tanggal_raw, jam_ke: 1, presensi: [],
    });

    const [siswaList, setSiswaList] = useState([]);
    const [loadingSiswa, setLoadingSiswa] = useState(false);

    // Fetch siswa ketika kelas dipilih
    useEffect(() => {
        if (!data.kelas_id) { setSiswaList([]); setData('presensi', []); return; }
        setLoadingSiswa(true);
        fetch(`/api/siswa-by-kelas/${data.kelas_id}`)
            .then(r => r.json())
            .then(siswa => {
                setSiswaList(siswa);
                setData('presensi', siswa.map(s => ({ siswa_id: s.id, status: 'hadir', catatan: '' })));
            })
            .finally(() => setLoadingSiswa(false));
    }, [data.kelas_id]);

    const updateStatus = (idx, status) => {
        const newP = [...data.presensi];
        newP[idx] = { ...newP[idx], status };
        setData('presensi', newP);
    };

    const setAll = (status) => setData('presensi', data.presensi.map(p => ({ ...p, status })));

    const countStatus = (s) => data.presensi.filter(p => p.status === s).length;

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Input Presensi Mapel" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <p className="text-white/70 text-xs">Guru Mata Pelajaran</p>
                        <h2 className="text-xl font-bold">Input Presensi Mapel</h2>
                        <p className="text-secondary text-sm mt-0.5">{tanggal}</p>
                    </div>
                    <Link href={route('guru_mapel.presensi.index')} className="text-white/60 hover:text-white">
                        <i className="fa-solid fa-arrow-left text-lg"></i>
                    </Link>
                </div>
            </section>

            <form onSubmit={e => { e.preventDefault(); post(route('guru_mapel.presensi.store')); }}>
                <section className="px-5 pb-3">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mata Pelajaran *</label>
                                <select value={data.mapel_id} onChange={e => setData('mapel_id', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                                    <option value="">-- Pilih --</option>
                                    {mapels.map(m => <option key={m.id} value={m.id}>{m.nama_mapel}</option>)}
                                </select>
                                {errors.mapel_id && <p className="text-red-500 text-xs mt-1">{errors.mapel_id}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kelas *</label>
                                <select value={data.kelas_id} onChange={e => setData('kelas_id', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                                    <option value="">-- Pilih --</option>
                                    {kelas_list.map(k => <option key={k.id} value={k.id}>{k.nama_kelas} {k.jurusan}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jam Ke-</label>
                            <div className="flex gap-2 flex-wrap">
                                {[1,2,3,4,5,6,7,8,9,10].map(j => (
                                    <button key={j} type="button" onClick={() => setData('jam_ke', j)}
                                        className={`w-9 h-9 rounded-lg border-2 text-sm font-bold transition ${data.jam_ke === j ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-500 hover:border-primary/50'}`}>
                                        {j}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Daftar Siswa */}
                {siswaList.length > 0 && (
                    <>
                        <section className="px-5 pb-2">
                            <div className="grid grid-cols-4 gap-2 mb-2">
                                {STATUS_OPTIONS.map(s => (
                                    <div key={s.value} className="bg-white border border-gray-100 rounded-xl p-2.5 text-center shadow-sm">
                                        <p className={`text-xl font-bold ${s.value==='hadir'?'text-green-600':s.value==='sakit'?'text-blue-600':s.value==='izin'?'text-yellow-600':'text-red-500'}`}>{countStatus(s.value)}</p>
                                        <p className="text-xs text-gray-500">{s.label==='H'?'Hadir':s.label==='S'?'Sakit':s.label==='I'?'Izin':'Alpha'}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                {STATUS_OPTIONS.map(s => (
                                    <button key={s.value} type="button" onClick={() => setAll(s.value)}
                                        className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition ${s.color}`}>
                                        Semua {s.label==='H'?'Hadir':s.label==='S'?'Sakit':s.label==='I'?'Izin':'Alpha'}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="px-5 pb-3">
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="divide-y divide-gray-50">
                                    {siswaList.map((s, idx) => {
                                        const cur = data.presensi[idx];
                                        return (
                                            <div key={s.id} className="flex items-center gap-3 px-4 py-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.jenis_kelamin === 'L' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                                    {s.nama.substring(0, 1)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-text truncate">{s.nama}</p>
                                                    <p className="text-xs text-gray-400">{s.nis}</p>
                                                </div>
                                                <div className="flex gap-1 flex-shrink-0">
                                                    {STATUS_OPTIONS.map(opt => (
                                                        <button key={opt.value} type="button" onClick={() => updateStatus(idx, opt.value)}
                                                            title={opt.value} className={`w-8 h-8 rounded-lg border-2 text-xs font-bold transition ${cur?.status === opt.value ? opt.color : opt.inactive}`}>
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

                        <section className="px-5 pb-6">
                            <button type="submit" disabled={processing || !data.mapel_id}
                                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2">
                                {processing ? <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...</>
                                    : <><i className="fa-solid fa-floppy-disk"></i> Simpan Presensi ({siswaList.length} Siswa)</>}
                            </button>
                        </section>
                    </>
                )}

                {data.kelas_id && siswaList.length === 0 && !loadingSiswa && (
                    <section className="px-5 pb-5">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center text-yellow-700 text-sm">
                            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                            Tidak ada siswa di kelas ini.
                        </div>
                    </section>
                )}

                {loadingSiswa && (
                    <section className="px-5 pb-5 text-center text-gray-400 py-8">
                        <i className="fa-solid fa-spinner fa-spin text-xl"></i>
                        <p className="text-sm mt-2">Memuat daftar siswa...</p>
                    </section>
                )}
            </form>
        </DashboardLayout>
    );
}
