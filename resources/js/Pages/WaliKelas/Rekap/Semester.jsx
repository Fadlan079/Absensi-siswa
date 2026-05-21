import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, router } from '@inertiajs/react';

export default function RekapSemester({ auth, kelas, rekap, semester, tahun }) {
    const navigate = (s, t) => router.get(route('wali_kelas.rekap.semester'), { semester: s, tahun: t });

    const exportExcel = () => {
        const url = route('export.semester.excel') + `?kelas_id=${kelas.id}&semester=${semester}&tahun=${tahun}`;
        window.open(url, '_blank');
    };
    const exportPdf = () => {
        const url = route('export.semester.pdf') + `?kelas_id=${kelas.id}&semester=${semester}&tahun=${tahun}`;
        window.open(url, '_blank');
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Rekap Semester" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white/70 text-xs">Wali Kelas — {kelas.nama}</p>
                            <h2 className="text-xl font-bold">Rekap Semester {semester}</h2>
                            <p className="text-secondary text-sm font-semibold mt-1">
                                {semester === 1 ? 'Juli – Desember' : 'Januari – Juni'} {tahun}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <div className="flex gap-2">
                                <button onClick={() => navigate(1, tahun)} className={`text-xs font-bold px-3 py-1.5 rounded-full transition ${semester === 1 ? 'bg-secondary text-primary' : 'bg-white/20 text-white'}`}>
                                    Semester 1
                                </button>
                                <button onClick={() => navigate(2, tahun)} className={`text-xs font-bold px-3 py-1.5 rounded-full transition ${semester === 2 ? 'bg-secondary text-primary' : 'bg-white/20 text-white'}`}>
                                    Semester 2
                                </button>
                            </div>
                            <div className="flex gap-2">
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
                    </div>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-base">Rekap Kehadiran Semester</h2>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm min-w-[560px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-left">Nama Siswa</th>
                                <th className="px-4 py-3 text-xs font-bold text-green-600 uppercase text-center">Hadir</th>
                                <th className="px-4 py-3 text-xs font-bold text-blue-600 uppercase text-center">Sakit</th>
                                <th className="px-4 py-3 text-xs font-bold text-yellow-600 uppercase text-center">Izin</th>
                                <th className="px-4 py-3 text-xs font-bold text-red-500 uppercase text-center">Alpha</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rekap.map((s, i) => (
                                <tr key={i} className={`border-b hover:bg-gray-50/50 ${s.alpha >= 10 ? 'bg-red-50/40' : ''}`}>
                                    <td className="px-4 py-3 font-semibold text-text">
                                        {s.nama}
                                        <span className="text-xs text-gray-400 ml-1">({s.nis})</span>
                                    </td>
                                    <td className="px-4 py-3 text-center font-bold text-green-600">{s.hadir}</td>
                                    <td className="px-4 py-3 text-center text-blue-600">{s.sakit}</td>
                                    <td className="px-4 py-3 text-center text-yellow-600">{s.izin}</td>
                                    <td className="px-4 py-3 text-center font-bold text-red-500">{s.alpha}</td>
                                    <td className="px-4 py-3 text-center text-gray-500">{s.total}</td>
                                </tr>
                            ))}
                            {rekap.length === 0 && (
                                <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">Belum ada data presensi semester ini</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardLayout>
    );
}
