import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function SekretarisDashboard({ auth, kelas, sudah_absen, recent_presensi, tanggal }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Dashboard Sekretaris" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-6 text-white shadow-md border-b-4 border-secondary">
                    <p className="text-white/70 text-sm">Sekretaris Kelas</p>
                    <h2 className="text-2xl font-bold">{kelas ? kelas.nama : 'Belum ditugaskan'}</h2>
                    <p className="text-white/70 text-sm mt-1">{tanggal}</p>
                </div>
            </section>

            <section className="px-5 pb-3">
                <div className={`rounded-xl p-5 border-2 flex items-center gap-4 ${sudah_absen ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-300'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${sudah_absen ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <i className={`fa-solid ${sudah_absen ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                    </div>
                    <div className="flex-1">
                        <p className={`font-bold text-sm ${sudah_absen ? 'text-green-700' : 'text-yellow-700'}`}>
                            {sudah_absen ? 'Presensi hari ini sudah diisi ✓' : 'Presensi hari ini belum diisi!'}
                        </p>
                        <p className={`text-xs mt-0.5 ${sudah_absen ? 'text-green-600' : 'text-yellow-600'}`}>
                            {sudah_absen ? 'Terima kasih sudah mengisi presensi.' : 'Segera isi presensi sebelum terlambat.'}
                        </p>
                    </div>
                    {!sudah_absen && kelas && (
                        <Link href={route('sekretaris.presensi.create')}
                            className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition whitespace-nowrap">
                            Isi Sekarang
                        </Link>
                    )}
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="flex items-center gap-2 mb-3 border-l-4 border-secondary pl-3">
                    <h2 className="font-bold text-base">Riwayat Presensi Terbaru</h2>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {recent_presensi.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {recent_presensi.map((p, i) => (
                                <Link key={i} href={route('sekretaris.presensi.show', p.id)}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition">
                                    <span className="text-sm font-medium text-text">{p.tanggal}</span>
                                    <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 text-sm py-10">Belum ada riwayat presensi</p>
                    )}
                </div>
            </section>
        </DashboardLayout>
    );
}
