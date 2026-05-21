import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const BULAN = ['', 'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

export default function KepalaSekolahRanking({ auth, ranking, stats_kelas, kelas_list, bulan, tahun, kelas_filter }) {
    const [selectedKelas, setSelectedKelas] = useState(kelas_filter || '');

    const cari = () => router.get(route('kepala_sekolah.ranking'), {
        bulan, tahun, kelas_id: selectedKelas || undefined
    });

    const prevBulan = bulan === 1 ? { bulan: 12, tahun: tahun - 1 } : { bulan: bulan - 1, tahun };
    const nextBulan = bulan === 12 ? { bulan: 1, tahun: tahun + 1 } : { bulan: bulan + 1, tahun };
    const navBulan = (b, t) => router.get(route('kepala_sekolah.ranking'), { bulan: b, tahun: t, kelas_id: selectedKelas || undefined });

    const kritisRanking = ranking.filter(r => r.alpha >= 5);

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Ranking Kehadiran" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white/70 text-xs">Kepala Sekolah</p>
                            <h2 className="text-xl font-bold">Ranking Kehadiran</h2>
                            <p className="text-secondary text-sm font-semibold mt-1">{BULAN[bulan]} {tahun}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => navBulan(prevBulan.bulan, prevBulan.tahun)} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center">
                                <i className="fa-solid fa-chevron-left text-sm"></i>
                            </button>
                            <button onClick={() => navBulan(nextBulan.bulan, nextBulan.tahun)} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center">
                                <i className="fa-solid fa-chevron-right text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistik Per Kelas */}
            <section className="px-5 pb-4">
                <h3 className="font-bold text-sm text-text mb-2 border-l-4 border-secondary pl-3">Statistik Per Kelas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {stats_kelas.map((k, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                            <p className="font-bold text-text text-sm">{k.nama}</p>
                            <div className="flex items-center justify-between mt-2">
                                <div>
                                    <p className="text-xs text-gray-400">Alpha</p>
                                    <p className="font-bold text-red-500">{k.alpha}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">% Hadir</p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${k.persen >= 85 ? 'bg-green-100 text-green-700' : k.persen >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>
                                        {k.persen}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Filter */}
            <section className="px-5 pb-3">
                <div className="flex gap-2">
                    <select value={selectedKelas} onChange={e => setSelectedKelas(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                        <option value="">Semua Kelas</option>
                        {kelas_list.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                    </select>
                    <button onClick={cari} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition">
                        Cari
                    </button>
                </div>
            </section>

            {/* Peringatan Siswa Kritis */}
            {kritisRanking.length > 0 && (
                <section className="px-5 pb-3">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-red-700 text-sm font-bold mb-2">
                            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                            {kritisRanking.length} Siswa dengan Alpha ≥ 5 hari
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {kritisRanking.slice(0, 8).map((s, i) => (
                                <span key={i} className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                                    {s.nama} ({s.kelas}) — {s.alpha}×
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Tabel Ranking */}
            <section className="px-5 pb-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-text">Daftar Kehadiran Siswa</h3>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Diurutkan berdasarkan akumulasi Alpha terbanyak</p>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto -mx-6">
                        <table className="w-full text-sm min-w-[550px] border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-gray-100">
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase text-center tracking-wider w-16">#</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase text-left tracking-wider">Nama</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase text-left tracking-wider hidden sm:table-cell">Kelas</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-success uppercase text-center tracking-wider">H</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-blue-600 uppercase text-center tracking-wider">S</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-warning uppercase text-center tracking-wider">I</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-danger uppercase text-center tracking-wider">A</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase text-center tracking-wider">%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ranking.map((s, i) => (
                                    <tr key={s.id} className={`border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors ${s.alpha >= 5 ? 'bg-red-50/20' : ''}`}>
                                        <td className="px-6 py-4 text-center text-xs text-gray-400 font-bold">{i + 1}</td>
                                        <td className="px-6 py-4 font-bold text-text">{s.nama}</td>
                                        <td className="px-6 py-4 text-gray-500 text-xs font-semibold hidden sm:table-cell">{s.kelas}</td>
                                        <td className="px-6 py-4 text-center font-black text-success text-base">{s.hadir}</td>
                                        <td className="px-6 py-4 text-center font-black text-blue-600 text-base">{s.sakit}</td>
                                        <td className="px-6 py-4 text-center font-black text-warning text-base">{s.izin}</td>
                                        <td className="px-6 py-4 text-center font-black text-danger text-base">{s.alpha}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${s.persen >= 85 ? 'bg-green-100 text-green-700' : s.persen >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>
                                                {s.persen}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {ranking.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-400 font-medium">
                                            Belum ada data presensi bulan ini
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Bottom Status / Badges directly from illustration */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-success text-xs font-bold rounded-lg border border-green-100">
                            <i className="fa-solid fa-shield-halved"></i> Data Terenkripsi & Aman
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-success text-xs font-bold rounded-lg border border-green-100">
                            <i className="fa-solid fa-leaf"></i> 100% Bebas Kertas
                        </div>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
