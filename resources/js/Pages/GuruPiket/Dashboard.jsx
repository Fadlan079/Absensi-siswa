import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function GuruPiketDashboard({ auth, terlambat_hari_ini, tanggal, total_terlambat }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Dashboard Guru Piket" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-6 text-white shadow-md border-b-4 border-secondary">
                    <p className="text-white/70 text-sm">Guru Piket</p>
                    <h2 className="text-2xl font-bold">{auth.user.name}</h2>
                    <p className="text-white/70 text-sm mt-1">{tanggal}</p>
                </div>
            </section>

            <section className="px-5 pb-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-bold text-red-500">{total_terlambat}</p>
                        <p className="text-xs text-gray-500 font-semibold mt-1">Siswa Terlambat Hari Ini</p>
                    </div>
                    <Link href={route('guru_piket.keterlambatan.create')}
                        className="bg-primary text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-primary/90 transition shadow-sm">
                        <i className="fa-solid fa-user-clock text-2xl"></i>
                        <span className="text-xs font-bold">Input Keterlambatan</span>
                    </Link>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-base">Siswa Terlambat Hari Ini</h2>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {terlambat_hari_ini.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {terlambat_hari_ini.map((t, i) => (
                                <div key={i} className="flex items-center justify-between px-4 py-3">
                                    <div>
                                        <p className="font-semibold text-text text-sm">{t.siswa}</p>
                                        <p className="text-xs text-gray-400">{t.kelas} · Datang: {t.jam_datang}</p>
                                        {t.alasan && <p className="text-xs text-gray-500 mt-0.5">"{t.alasan}"</p>}
                                    </div>
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">Terlambat</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <i className="fa-solid fa-circle-check text-green-400 text-3xl mb-2"></i>
                            <p className="text-gray-400 text-sm">Tidak ada siswa terlambat hari ini</p>
                        </div>
                    )}
                </div>
            </section>
        </DashboardLayout>
    );
}
