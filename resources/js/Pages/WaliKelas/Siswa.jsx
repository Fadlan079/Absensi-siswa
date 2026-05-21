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
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-sm border-l-4 border-secondary pl-3">Daftar Siswa</h3>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {siswa.map((s, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${s.jenis_kelamin === 'L' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                    {s.nama.substring(0, 1)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-text truncate">{s.nama}</p>
                                    <p className="text-xs text-gray-400">{s.nis}</p>
                                </div>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.jenis_kelamin === 'L' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}`}>
                                    {s.jenis_kelamin === 'L' ? '♂' : '♀'}
                                </span>
                            </div>
                        ))}
                        {siswa.length === 0 && (
                            <div className="px-4 py-10 text-center text-gray-400">Belum ada siswa di kelas ini</div>
                        )}
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
