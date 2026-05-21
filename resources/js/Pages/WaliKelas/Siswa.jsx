import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const statusConfig = {
    hadir: { label: 'Hadir', bg: 'bg-green-100 text-green-700' },
    sakit: { label: 'Sakit', bg: 'bg-blue-100 text-blue-700' },
    izin:  { label: 'Izin',  bg: 'bg-yellow-100 text-yellow-700' },
    alpha: { label: 'Alpha', bg: 'bg-red-100 text-red-700' },
};

export default function WaliKelasSiswa({ auth, kelas, siswa, today_presensi }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title={`Siswa ${kelas.nama}`} />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <p className="text-white/70 text-xs">Wali Kelas</p>
                    <h2 className="text-xl font-bold">{kelas.nama}</h2>
                    <p className="text-white/70 text-sm mt-0.5">{siswa.length} siswa terdaftar</p>
                </div>
            </section>

            {/* Kehadiran hari ini */}
            {today_presensi && (
                <section className="px-5 pb-3">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Presensi Hari Ini</p>
                        <div className="grid grid-cols-4 gap-2">
                            {Object.entries(today_presensi).map(([k, v]) => {
                                const cfg = statusConfig[k];
                                return (
                                    <div key={k} className={`rounded-xl p-2.5 text-center ${cfg.bg}`}>
                                        <p className="text-xl font-bold">{v}</p>
                                        <p className="text-xs">{cfg.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Daftar Siswa */}
            <section className="px-5 pb-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-text">Daftar Siswa</h3>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Siswa Terdaftar Pada Kelas {kelas.nama}</p>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-50 -mx-6 -mb-6">
                        {siswa.map((s, i) => (
                            <div key={i} className="flex items-center gap-4 px-6 py-4.5 hover:bg-slate-50/50 transition-colors first:pt-0 last:pb-6">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${s.jenis_kelamin === 'L' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-pink-50 text-pink-600 border border-pink-100'}`}>
                                    {s.nama.substring(0, 1)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-text truncate">{s.nama}</p>
                                    <p className="text-xs text-gray-400 font-semibold font-mono mt-0.5">{s.nis}</p>
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.jenis_kelamin === 'L' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-pink-50 text-pink-600 border border-pink-100'}`}>
                                    {s.jenis_kelamin === 'L' ? '♂ Laki-laki' : '♀ Perempuan'}
                                </span>
                            </div>
                        ))}
                        {siswa.length === 0 && (
                            <div className="px-6 py-12 text-center text-gray-400 font-medium">Belum ada siswa di kelas ini</div>
                        )}
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
