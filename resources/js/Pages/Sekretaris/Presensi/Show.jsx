import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const statusConfig = {
    hadir: { label: 'Hadir', bg: 'bg-green-100 text-green-700' },
    sakit: { label: 'Sakit', bg: 'bg-blue-100 text-blue-700' },
    izin:  { label: 'Izin',  bg: 'bg-yellow-100 text-yellow-700' },
    alpha: { label: 'Alpha', bg: 'bg-red-100 text-red-700' },
};

export default function PresensiShow({ auth, kelas, presensi, detail, summary }) {
    const total = detail.length;

    return (
        <DashboardLayout user={auth.user}>
            <Head title={`Presensi ${presensi.tanggal}`} />

            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white/70 text-xs">Detail Presensi Harian</p>
                            <h2 className="text-xl font-bold mt-0.5">{kelas.nama}</h2>
                            <p className="text-secondary text-sm font-semibold mt-1">
                                <i className="fa-solid fa-calendar-day mr-1.5"></i>{presensi.tanggal}
                            </p>
                            <p className="text-white/60 text-xs mt-1">Diisi oleh: {presensi.oleh}</p>
                        </div>
                        <Link href={route('sekretaris.presensi.index')} className="text-white/60 hover:text-white">
                            <i className="fa-solid fa-arrow-left text-lg"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="px-5 pb-3">
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { label: 'Hadir', value: summary.hadir, pct: total ? Math.round(summary.hadir/total*100) : 0, color: 'text-green-600' },
                        { label: 'Sakit', value: summary.sakit, pct: total ? Math.round(summary.sakit/total*100) : 0, color: 'text-blue-600' },
                        { label: 'Izin',  value: summary.izin,  pct: total ? Math.round(summary.izin/total*100)  : 0, color: 'text-yellow-600' },
                        { label: 'Alpha', value: summary.alpha, pct: total ? Math.round(summary.alpha/total*100) : 0, color: 'text-red-500' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
                            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-gray-400">{s.label}</p>
                            <p className="text-xs text-gray-300">{s.pct}%</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Daftar Siswa */}
            <section className="px-5 pb-6">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-base">Daftar Kehadiran ({total} siswa)</h2>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {detail.map((d, i) => {
                            const cfg = statusConfig[d.status] || statusConfig.alpha;
                            return (
                                <div key={i} className="flex items-center gap-3 px-4 py-3">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${d.jk === 'L' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                        {(d.nama || '?').substring(0, 1)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-text truncate">{d.nama}</p>
                                        <p className="text-xs text-gray-400">{d.nis}</p>
                                        {d.catatan && <p className="text-xs text-gray-400 italic">"{d.catatan}"</p>}
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.bg}`}>
                                        {cfg.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
