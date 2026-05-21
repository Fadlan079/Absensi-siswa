import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

const roleLabel = {
    admin: 'Admin', kepala_sekolah: 'Kepala Sekolah',
    wali_kelas: 'Wali Kelas', sekretaris: 'Sekretaris',
    guru_mapel: 'Guru Mapel', guru_piket: 'Guru Piket',
};
const roleColor = {
    admin: 'bg-primary/10 text-primary', kepala_sekolah: 'bg-blue-100 text-blue-700',
    wali_kelas: 'bg-green-100 text-green-700', sekretaris: 'bg-yellow-100 text-yellow-700',
    guru_mapel: 'bg-purple-100 text-purple-700', guru_piket: 'bg-orange-100 text-orange-700',
};

export default function UsersIndex({ auth, users, filters = {} }) {
    const [searchTerm, setSearchTerm]   = useState(filters.search || '');
    const [selectedRole, setSelectedRole] = useState(filters.role || '');
    const [showImport, setShowImport]   = useState(false);
    const [importFile, setImportFile]   = useState(null);
    const [dragOver, setDragOver]       = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) { isFirstRender.current = false; return; }
        const t = setTimeout(() => {
            router.get(route('admin.users.index'), { search: searchTerm, role: selectedRole }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(t);
    }, [searchTerm]);

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        router.get(route('admin.users.index'), { search: searchTerm, role }, { preserveState: true, replace: true });
    };
    const handleReset = () => {
        setSearchTerm(''); setSelectedRole('');
        router.get(route('admin.users.index'), {}, { preserveState: true, replace: true });
    };
    const hapus = (id, name) => { if (confirm(`Hapus pengguna "${name}"?`)) router.delete(route('admin.users.destroy', id)); };

    const exportPdf   = () => { window.location.href = route('admin.users.export.pdf'); };
    const exportExcel = () => { window.location.href = route('admin.users.export.excel'); };

    const handleDrop = (e) => {
        e.preventDefault(); setDragOver(false);
        const f = e.dataTransfer.files[0]; if (f) setImportFile(f);
    };
    const handleImportSubmit = (e) => {
        e.preventDefault(); if (!importFile) return;
        const data = new FormData(); data.append('file', importFile);
        router.post(route('admin.users.import'), data, {
            forceFormData: true,
            onSuccess: () => { setShowImport(false); setImportFile(null); },
        });
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Kelola Pengguna" />

            {/* ─── Import Modal ─── */}
            {showImport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-primary px-6 py-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-bold text-base">Impor Data Pengguna</h3>
                                <p className="text-white/70 text-xs mt-0.5">Format: xlsx / xls / csv</p>
                            </div>
                            <button onClick={() => { setShowImport(false); setImportFile(null); }}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition">
                                <i className="fa-solid fa-xmark text-sm" />
                            </button>
                        </div>
                        <form onSubmit={handleImportSubmit} className="p-6 space-y-4">
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('importFileUser').click()}
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                <i className={`fa-solid fa-file-arrow-up text-3xl mb-3 ${dragOver ? 'text-primary' : 'text-gray-300'}`} />
                                <p className="text-sm font-semibold text-gray-600">
                                    {importFile ? importFile.name : 'Seret file ke sini atau klik untuk memilih'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Kolom: Nama | Email | Role | Password</p>
                                <input id="importFileUser" type="file" accept=".xlsx,.xls,.csv" className="hidden"
                                    onChange={(e) => setImportFile(e.target.files[0])} />
                            </div>
                            {importFile && (
                                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                                    <i className="fa-solid fa-file-excel text-emerald-600 text-sm" />
                                    <span className="text-xs font-semibold text-emerald-700 truncate flex-1">{importFile.name}</span>
                                    <button type="button" onClick={() => setImportFile(null)} className="text-red-400 hover:text-red-600"><i className="fa-solid fa-xmark text-xs" /></button>
                                </div>
                            )}
                            <div className="flex gap-3">
                                <button type="button" onClick={() => { setShowImport(false); setImportFile(null); }}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Batal</button>
                                <button type="submit" disabled={!importFile}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    <i className="fa-solid fa-upload text-xs" /> Impor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-white/70 text-xs">Administrator</p>
                            <h2 className="text-xl font-bold">Kelola Pengguna</h2>
                            <p className="text-white/70 text-sm mt-0.5">{users.total} pengguna terdaftar</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={exportPdf}
                                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm">
                                <i className="fa-solid fa-file-pdf" /> PDF
                            </button>
                            <button onClick={exportExcel}
                                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm">
                                <i className="fa-solid fa-file-excel" /> Excel
                            </button>
                            <button onClick={() => setShowImport(true)}
                                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-lg transition">
                                <i className="fa-solid fa-file-import" /> Impor
                            </button>
                            <Link href={route('admin.users.create')}
                                className="flex items-center gap-1.5 bg-secondary text-primary font-bold text-xs px-3 py-2 rounded-lg hover:bg-secondary/90 transition shadow-sm">
                                <i className="fa-solid fa-user-plus" /> Tambah
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div>
                            <h3 className="text-lg font-bold text-text">Daftar Pengguna</h3>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Kelola Akun Akses Sistem</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                    <i className="fa-solid fa-magnifying-glass text-xs" />
                                </span>
                                <input type="text" placeholder="Cari nama atau email..."
                                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-400" />
                            </div>
                            <select value={selectedRole} onChange={(e) => handleRoleChange(e.target.value)}
                                className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-text cursor-pointer">
                                <option value="">Semua Peran</option>
                                {Object.entries(roleLabel).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                            </select>
                            {(searchTerm || selectedRole) && (
                                <button onClick={handleReset}
                                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition">
                                    <i className="fa-solid fa-arrow-rotate-left" /> Atur Ulang
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto -mx-6">
                        <table className="w-full text-sm min-w-[700px]">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-left tracking-wider">Nama</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-left tracking-wider hidden sm:table-cell">Email</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-left tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-left tracking-wider hidden md:table-cell">Kelas</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((u) => (
                                    <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-text">{u.name}</td>
                                        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell text-xs">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleColor[u.role] || 'bg-gray-100 text-gray-600'}`}>
                                                {roleLabel[u.role] || u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs hidden md:table-cell">{u.kelas || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link href={route('admin.users.edit', u.id)} className="text-xs font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                                                    <i className="fa-solid fa-pen-to-square" /> Edit
                                                </Link>
                                                <button onClick={() => hapus(u.id, u.name)} className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1">
                                                    <i className="fa-solid fa-trash-can" /> Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.last_page > 1 && (
                        <div className="flex justify-center gap-2 pt-6 mt-2 border-t border-gray-100">
                            {users.links.map((link, i) => (
                                <Link key={i} href={link.url || '#'}
                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${link.active ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-success text-xs font-bold rounded-lg border border-green-100">
                            <i className="fa-solid fa-shield-halved" /> Data Terenkripsi &amp; Aman
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-success text-xs font-bold rounded-lg border border-green-100">
                            <i className="fa-solid fa-leaf" /> 100% Bebas Kertas
                        </div>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
