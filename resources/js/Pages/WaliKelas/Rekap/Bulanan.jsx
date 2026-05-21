import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';

const BULAN = ['', 'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

export default function RekapBulanan({ auth, kelas, rekap, bulan, tahun, total_hari }) {
    const prevBulan = bulan === 1 ? { bulan: 12, tahun: tahun - 1 } : { bulan: bulan - 1, tahun };
    const nextBulan = bulan === 12 ? { bulan: 1, tahun: tahun + 1 } : { bulan: bulan + 1, tahun };

    const navigate = (b, t) => router.get(route('wali_kelas.rekap.bulanan'), { bulan: b, tahun: t });

    const exportExcel = () => {
        const url = route('export.rekap.excel') + `?kelas_id=${kelas.id}&bulan=${bulan}&tahun=${tahun}`;
        window.open(url, '_blank');
    };
    const exportPdf = () => {
        const url = route('export.rekap.pdf') + `?kelas_id=${kelas.id}&bulan=${bulan}&tahun=${tahun}`;
        window.open(url, '_blank');
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Rekap Bulanan" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white/70 text-xs">Wali Kelas — {kelas.nama}</p>
                            <h2 className="text-xl font-bold">Rekap Presensi Bulanan</h2>
                            <p className="text-secondary text-sm font-semibold mt-1">{BULAN[bulan]} {tahun}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => navigate(prevBulan.bulan, prevBulan.tahun)}
                                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
                                <i className="fa-solid fa-chevron-left text-sm"></i>
                            </button>
                            <button onClick={() => navigate(nextBulan.bulan, nextBulan.tahun)}
                                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
                                <i className="fa-solid fa-chevron-right text-sm"></i>
                            </button>
                        </div>
                    </div>
                    <p className="text-white/60 text-xs mt-2">{total_hari} hari belajar tercatat</p>
                    {/* Export buttons */}
                    <div className="flex gap-2 mt-3">
                        <button onClick={exportExcel}
                            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition">
                            <i className="fa-solid fa-file-excel"></i> Excel
                        </button>
                        <button onClick={exportPdf}
                            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition">
                            <i className="fa-solid fa-file-pdf"></i> PDF
                        </button>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-base">Rekap Per Siswa</h2>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left sticky left-0 bg-gray-50">Nama Siswa</th>
                                <th className="px-4 py-3 text-xs font-bold text-green-600 uppercase text-center">Hadir</th>
                                <th className="px-4 py-3 text-xs font-bold text-blue-600 uppercase text-center">Sakit</th>
                                <th className="px-4 py-3 text-xs font-bold text-yellow-600 uppercase text-center">Izin</th>
                                <th className="px-4 py-3 text-xs font-bold text-red-500 uppercase text-center">Alpha</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">% Hadir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rekap.map((s, i) => (
                                <tr key={i} className={`border-b hover:bg-gray-50/50 ${s.alpha > 3 ? 'bg-red-50/30' : ''}`}>
                                    <td className="px-4 py-3 font-semibold text-text sticky left-0 bg-white">
                                        {s.nama}
                                        <span className="text-xs text-gray-400 ml-1">({s.nis})</span>
                                    </td>
                                    <td className="px-4 py-3 text-center font-bold text-green-600">{s.hadir}</td>
                                    <td className="px-4 py-3 text-center font-medium text-blue-600">{s.sakit}</td>
                                    <td className="px-4 py-3 text-center font-medium text-yellow-600">{s.izin}</td>
                                    <td className="px-4 py-3 text-center font-bold text-red-500">{s.alpha}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.persen >= 85 ? 'bg-green-100 text-green-700' : s.persen >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>
                                            {s.persen}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {rekap.length === 0 && (
                                <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">Belum ada data presensi bulan ini</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardLayout>
    );
}
