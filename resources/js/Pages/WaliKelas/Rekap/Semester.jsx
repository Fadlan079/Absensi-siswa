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
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-text">Laporan Kehadiran Semester</h3>
                            <p className="text-xs text-muted font-extrabold uppercase tracking-wider mt-0.5">Kelas {kelas.nama} - Semester {semester} ({semester === 1 ? 'Juli – Desember' : 'Januari – Juni'} {tahun})</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto -mx-6">
                        <table className="w-full text-sm min-w-[650px] border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-gray-100">
                                    <th className="px-6 py-4.5 text-xs font-extrabold text-gray-500 uppercase text-left tracking-wider sticky left-0 bg-slate-50 z-10">Nama Siswa</th>
                                    <th className="px-6 py-4.5 text-xs font-extrabold text-success uppercase text-center tracking-wider">H</th>
                                    <th className="px-6 py-4.5 text-xs font-extrabold text-blue-600 uppercase text-center tracking-wider">S</th>
                                    <th className="px-6 py-4.5 text-xs font-extrabold text-warning uppercase text-center tracking-wider">I</th>
                                    <th className="px-6 py-4.5 text-xs font-extrabold text-danger uppercase text-center tracking-wider">A</th>
                                    <th className="px-6 py-4.5 text-xs font-extrabold text-gray-500 uppercase text-center tracking-wider">Total Hari</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rekap.map((s, i) => (
                                    <tr key={i} className={`border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors ${s.alpha >= 10 ? 'bg-red-50/20' : ''}`}>
                                        <td className="px-6 py-4 font-bold text-text sticky left-0 bg-white z-10">
                                            {s.nama}
                                            <span className="text-[10px] font-mono text-gray-400 block sm:inline sm:ml-2">({s.nis})</span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-black text-success text-base">{s.hadir}</td>
                                        <td className="px-6 py-4 text-center font-black text-blue-600 text-base">{s.sakit}</td>
                                        <td className="px-6 py-4 text-center font-black text-warning text-base">{s.izin}</td>
                                        <td className="px-6 py-4 text-center font-black text-danger text-base">{s.alpha}</td>
                                        <td className="px-6 py-4 text-center font-black text-gray-500 text-base">{s.total}</td>
                                    </tr>
                                ))}
                                {rekap.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">
                                            Belum ada data presensi semester ini
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
