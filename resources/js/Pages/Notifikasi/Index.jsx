import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function NotifikasiIndex({ auth, notifikasi }) {
    const markAsRead = (id) => {
        router.post(route('notifikasi.read', id), {}, { preserveScroll: true });
    };

    const markAllAsRead = () => {
        router.post(route('notifikasi.readAll'), {}, { preserveScroll: true });
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Notifikasi" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Notifikasi</h2>
                        <p className="text-white/70 text-sm mt-1">Pemberitahuan sistem untuk Anda</p>
                    </div>
                    {notifikasi.data.some(n => !n.is_read) && (
                        <button onClick={markAllAsRead} className="bg-white/20 hover:bg-white/30 px-3 py-1.5 text-xs font-bold rounded-lg transition">
                            <i className="fa-solid fa-check-double mr-1"></i> Tandai Semua Dibaca
                        </button>
                    )}
                </div>
            </section>

            <section className="px-5 pb-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {notifikasi.data.map((n) => (
                            <div key={n.id} className={`p-4 flex gap-3 items-start transition hover:bg-gray-50 cursor-pointer ${n.is_read ? 'opacity-70' : 'bg-blue-50/30'}`} onClick={() => !n.is_read && markAsRead(n.id)}>
                                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${n.is_read ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'}`}>
                                    <i className={`fa-solid ${n.judul.toLowerCase().includes('kritis') || n.judul.toLowerCase().includes('terlambat') ? 'fa-triangle-exclamation text-red-500' : 'fa-bell'}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className={`text-sm ${n.is_read ? 'font-semibold text-gray-700' : 'font-bold text-text'}`}>{n.judul}</p>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                            {new Date(n.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{n.pesan}</p>
                                </div>
                                {!n.is_read && (
                                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                                )}
                            </div>
                        ))}
                        {notifikasi.data.length === 0 && (
                            <div className="p-8 text-center text-gray-400">
                                <i className="fa-regular fa-bell-slash text-4xl mb-3 opacity-20"></i>
                                <p className="text-sm">Belum ada notifikasi</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Pagination */}
                {notifikasi.last_page > 1 && (
                    <div className="flex justify-center mt-4 gap-1">
                        {notifikasi.links.map((link, i) => (
                            <Link key={i} href={link.url}
                                className={`px-3 py-1 rounded-md text-xs font-bold ${link.active ? 'bg-primary text-white' : 'bg-white border text-gray-500 hover:bg-gray-50'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </section>
        </DashboardLayout>
    );
}
