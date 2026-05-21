import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

const getInitials = (name) => {
    if (!name || name === '-') return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getCardStyles = (kelas = '', jurusan = '') => {
    const kLevel = (kelas || '').trim().toUpperCase();
    const jKey = (jurusan || '').trim().toUpperCase();

    // Determine major category
    let category = 'DEFAULT';
    if (jKey.includes('PPLG') || jKey.includes('RPL')) {
        category = 'PPLG';
    } else if (jKey.includes('TKJ') || jKey.includes('TJKT')) {
        category = 'TKJ';
    } else if (jKey.includes('DKV') || jKey.includes('MM')) {
        category = 'DKV';
    } else if (jKey.includes('TKR')) {
        category = 'TKR';
    } else if (jKey.includes('TAB')) {
        category = 'TAB';
    } else if (jKey.includes('AKL') || jKey.includes('AK')) {
        category = 'AKL';
    } else if (jKey.includes('MPLB') || jKey.includes('AP')) {
        category = 'MPLB';
    }

    // Dynamic styles based on Grade Level (X, XI, XII) and Major Category (Warm solid pastel colors, high contrast for parents)
    if (category === 'PPLG') {
        if (kLevel === 'X') {
            return {
                bgClass: 'bg-violet-100/90',
                titleColor: 'text-violet-950',
                subtitleColor: 'text-violet-900',
                pill: 'bg-violet-200/80 text-violet-900',
                subtext: 'text-violet-850',
                avatar: 'bg-violet-200 text-violet-950 border-white',
                iconColor: 'text-violet-950/10'
            };
        } else if (kLevel === 'XI') {
            return {
                bgClass: 'bg-purple-100/90',
                titleColor: 'text-purple-950',
                subtitleColor: 'text-purple-900',
                pill: 'bg-purple-200/80 text-purple-900',
                subtext: 'text-purple-850',
                avatar: 'bg-purple-200 text-purple-950 border-white',
                iconColor: 'text-purple-950/10'
            };
        } else { // XII or default
            return {
                bgClass: 'bg-fuchsia-100/90',
                titleColor: 'text-fuchsia-950',
                subtitleColor: 'text-fuchsia-900',
                pill: 'bg-fuchsia-200/80 text-fuchsia-900',
                subtext: 'text-fuchsia-850',
                avatar: 'bg-fuchsia-200 text-fuchsia-950 border-white',
                iconColor: 'text-fuchsia-950/10'
            };
        }
    }

    if (category === 'TKJ') {
        if (kLevel === 'X') {
            return {
                bgClass: 'bg-sky-100/90',
                titleColor: 'text-sky-950',
                subtitleColor: 'text-sky-900',
                pill: 'bg-sky-200/80 text-sky-900',
                subtext: 'text-sky-850',
                avatar: 'bg-sky-200 text-sky-950 border-white',
                iconColor: 'text-sky-950/10'
            };
        } else if (kLevel === 'XI') {
            return {
                bgClass: 'bg-blue-100/90',
                titleColor: 'text-blue-950',
                subtitleColor: 'text-blue-900',
                pill: 'bg-blue-200/80 text-blue-900',
                subtext: 'text-blue-850',
                avatar: 'bg-blue-200 text-blue-950 border-white',
                iconColor: 'text-blue-950/10'
            };
        } else { // XII or default
            return {
                bgClass: 'bg-indigo-100/90',
                titleColor: 'text-indigo-950',
                subtitleColor: 'text-indigo-900',
                pill: 'bg-indigo-200/80 text-indigo-900',
                subtext: 'text-indigo-850',
                avatar: 'bg-indigo-200 text-indigo-950 border-white',
                iconColor: 'text-indigo-950/10'
            };
        }
    }

    if (category === 'DKV') {
        if (kLevel === 'X') {
            return {
                bgClass: 'bg-rose-100/90',
                titleColor: 'text-rose-955',
                subtitleColor: 'text-rose-900',
                pill: 'bg-rose-200/80 text-rose-900',
                subtext: 'text-rose-850',
                avatar: 'bg-rose-200 text-rose-950 border-white',
                iconColor: 'text-rose-955/10'
            };
        } else if (kLevel === 'XI') {
            return {
                bgClass: 'bg-pink-100/90',
                titleColor: 'text-pink-955',
                subtitleColor: 'text-pink-900',
                pill: 'bg-pink-200/80 text-pink-900',
                subtext: 'text-pink-850',
                avatar: 'bg-pink-200 text-pink-950 border-white',
                iconColor: 'text-pink-955/10'
            };
        } else { // XII or default
            return {
                bgClass: 'bg-orange-100/90',
                titleColor: 'text-orange-955',
                subtitleColor: 'text-orange-900',
                pill: 'bg-orange-200/80 text-orange-900',
                subtext: 'text-orange-850',
                avatar: 'bg-orange-200 text-orange-950 border-white',
                iconColor: 'text-orange-955/10'
            };
        }
    }

    if (category === 'TKR') {
        if (kLevel === 'X') {
            return {
                bgClass: 'bg-emerald-100/90',
                titleColor: 'text-emerald-955',
                subtitleColor: 'text-emerald-900',
                pill: 'bg-emerald-200/80 text-emerald-900',
                subtext: 'text-emerald-850',
                avatar: 'bg-emerald-200 text-emerald-950 border-white',
                iconColor: 'text-emerald-955/10'
            };
        } else if (kLevel === 'XI') {
            return {
                bgClass: 'bg-green-100/90',
                titleColor: 'text-green-955',
                subtitleColor: 'text-green-900',
                pill: 'bg-green-200/80 text-green-900',
                subtext: 'text-green-850',
                avatar: 'bg-green-200 text-green-950 border-white',
                iconColor: 'text-green-955/10'
            };
        } else { // XII or default
            return {
                bgClass: 'bg-teal-100/90',
                titleColor: 'text-teal-955',
                subtitleColor: 'text-teal-900',
                pill: 'bg-teal-200/80 text-teal-900',
                subtext: 'text-teal-850',
                avatar: 'bg-teal-200 text-teal-950 border-white',
                iconColor: 'text-teal-955/10'
            };
        }
    }

    if (category === 'TAB') {
        if (kLevel === 'X') {
            return {
                bgClass: 'bg-amber-100/90',
                titleColor: 'text-amber-955',
                subtitleColor: 'text-amber-900',
                pill: 'bg-amber-200/80 text-amber-900',
                subtext: 'text-amber-850',
                avatar: 'bg-amber-200 text-amber-950 border-white',
                iconColor: 'text-amber-955/10'
            };
        } else if (kLevel === 'XI') {
            return {
                bgClass: 'bg-orange-50',
                titleColor: 'text-orange-955',
                subtitleColor: 'text-orange-900',
                pill: 'bg-orange-200/80 text-orange-900',
                subtext: 'text-orange-850',
                avatar: 'bg-orange-200 text-orange-950 border-white',
                iconColor: 'text-orange-955/10'
            };
        } else { // XII or default
            return {
                bgClass: 'bg-yellow-100/90',
                titleColor: 'text-yellow-955',
                subtitleColor: 'text-yellow-900',
                pill: 'bg-yellow-200/80 text-yellow-900',
                subtext: 'text-yellow-850',
                avatar: 'bg-yellow-200 text-yellow-950 border-white',
                iconColor: 'text-yellow-955/10'
            };
        }
    }

    if (category === 'AKL') {
        if (kLevel === 'X') {
            return {
                bgClass: 'bg-emerald-100/90',
                titleColor: 'text-emerald-955',
                subtitleColor: 'text-emerald-900',
                pill: 'bg-emerald-200/80 text-emerald-900',
                subtext: 'text-emerald-850',
                avatar: 'bg-emerald-200 text-emerald-950 border-white',
                iconColor: 'text-emerald-955/10'
            };
        } else if (kLevel === 'XI') {
            return {
                bgClass: 'bg-green-100/90',
                titleColor: 'text-green-955',
                subtitleColor: 'text-green-900',
                pill: 'bg-green-200/80 text-green-900',
                subtext: 'text-green-850',
                avatar: 'bg-green-200 text-green-950 border-white',
                iconColor: 'text-green-955/10'
            };
        } else { // XII or default
            return {
                bgClass: 'bg-teal-100/90',
                titleColor: 'text-teal-955',
                subtitleColor: 'text-teal-900',
                pill: 'bg-teal-200/80 text-teal-900',
                subtext: 'text-teal-850',
                avatar: 'bg-teal-200 text-teal-950 border-white',
                iconColor: 'text-teal-955/10'
            };
        }
    }

    if (category === 'MPLB') {
        if (kLevel === 'X') {
            return {
                bgClass: 'bg-amber-100/90',
                titleColor: 'text-amber-955',
                subtitleColor: 'text-amber-900',
                pill: 'bg-amber-200/80 text-amber-900',
                subtext: 'text-amber-850',
                avatar: 'bg-amber-200 text-amber-950 border-white',
                iconColor: 'text-amber-955/10'
            };
        } else if (kLevel === 'XI') {
            return {
                bgClass: 'bg-red-50',
                titleColor: 'text-red-955',
                subtitleColor: 'text-red-900',
                pill: 'bg-red-100/80 text-red-900',
                subtext: 'text-red-850',
                avatar: 'bg-red-200 text-red-950 border-white',
                iconColor: 'text-red-955/10'
            };
        } else { // XII or default
            return {
                bgClass: 'bg-orange-100/90',
                titleColor: 'text-orange-955',
                subtitleColor: 'text-orange-900',
                pill: 'bg-orange-200/80 text-orange-900',
                subtext: 'text-orange-850',
                avatar: 'bg-orange-200 text-orange-950 border-white',
                iconColor: 'text-orange-955/10'
            };
        }
    }

    // Default Fallback
    return {
        bgClass: 'bg-slate-100',
        titleColor: 'text-slate-900',
        subtitleColor: 'text-slate-800',
        pill: 'bg-slate-200 text-slate-900',
        subtext: 'text-slate-700',
        avatar: 'bg-slate-200 text-slate-950 border-white',
        iconColor: 'text-slate-900/10'
    };
};

export default function KelasIndex({ auth, kelas_list, wali_kelas_list = [], filters = {} }) {
    const [searchTerm, setSearchTerm]   = useState(filters.search || '');
    const [selectedWali, setSelectedWali] = useState(filters.wali_kelas_id || '');
    const [showImport, setShowImport]   = useState(false);
    const [importFile, setImportFile]   = useState(null);
    const [dragOver, setDragOver]       = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(route('admin.kelas.index'), {
                search: searchTerm,
                wali_kelas_id: selectedWali
            }, {
                preserveState: true,
                replace: true
            });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleWaliChange = (waliId) => {
        setSelectedWali(waliId);
        router.get(route('admin.kelas.index'), {
            search: searchTerm,
            wali_kelas_id: waliId
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedWali('');
        router.get(route('admin.kelas.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const hapus = (id, nama) => {
        if (confirm(`Hapus kelas "${nama}"?`)) router.delete(route('admin.kelas.destroy', id));
    };

    const exportPdf   = () => { window.location.href = route('admin.kelas.export.pdf'); };
    const exportExcel = () => { window.location.href = route('admin.kelas.export.excel'); };

    const handleDrop = (e) => {
        e.preventDefault(); setDragOver(false);
        const f = e.dataTransfer.files[0]; if (f) setImportFile(f);
    };
    const handleImportSubmit = (e) => {
        e.preventDefault(); if (!importFile) return;
        const data = new FormData(); data.append('file', importFile);
        router.post(route('admin.kelas.import'), data, {
            forceFormData: true,
            onSuccess: () => { setShowImport(false); setImportFile(null); },
        });
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Kelola Kelas" />

            {/* ─── Import Modal ─── */}
            {showImport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-primary px-6 py-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-bold text-base">Impor Data Kelas</h3>
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
                                onClick={() => document.getElementById('importFileKelas').click()}
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                <i className={`fa-solid fa-file-arrow-up text-3xl mb-3 ${dragOver ? 'text-primary' : 'text-gray-300'}`} />
                                <p className="text-sm font-semibold text-gray-600">
                                    {importFile ? importFile.name : 'Seret file ke sini atau klik untuk memilih'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Kolom: Nama Kelas | Jurusan | Nama Wali Kelas</p>
                                <input id="importFileKelas" type="file" accept=".xlsx,.xls,.csv" className="hidden"
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
                            <h2 className="text-xl font-bold">Kelola Kelas</h2>
                            <p className="text-white/70 text-sm mt-0.5">{kelas_list.length} kelas terdaftar</p>
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
                            <Link href={route('admin.kelas.create')}
                                className="flex items-center gap-1.5 bg-secondary text-primary font-bold text-xs px-3 py-2 rounded-lg hover:bg-secondary/90 transition shadow-sm">
                                <i className="fa-solid fa-plus" /> Tambah
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-5">
                {/* Search & Filter Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-base font-bold text-text">Daftar Kelas</h3>
                        <p className="text-xs text-muted font-semibold mt-0.5">Kelola Kelas & Penugasan Wali Kelas</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        {/* Search Input */}
                        <div className="relative flex-1 sm:w-64">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                <i className="fa-solid fa-magnifying-glass text-xs"></i>
                            </span>
                            <input
                                type="text"
                                placeholder="Cari nama kelas atau jurusan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Wali Kelas Filter */}
                        <select
                            value={selectedWali}
                            onChange={(e) => handleWaliChange(e.target.value)}
                            className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-text cursor-pointer"
                        >
                            <option value="">Semua Wali Kelas</option>
                            {wali_kelas_list.map((w) => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </select>

                        {/* Reset Button */}
                        {(searchTerm || selectedWali) && (
                            <button
                                onClick={handleReset}
                                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
                            >
                                <i className="fa-solid fa-arrow-rotate-left"></i> Atur Ulang
                            </button>
                        )}
                    </div>
                </div>

                {kelas_list.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {kelas_list.map((k) => {
                            const styles = getCardStyles(k.nama_kelas, k.jurusan);
                            return (
                                <div key={k.id} className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-60">
                                    {/* Top Banner */}
                                    <div className={`h-28 ${styles.bgClass} p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300`}>
                                        {/* Decorative subtle warm layout pattern */}
                                        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-black pointer-events-none"></div>
                                        <div className={`absolute right-4 top-2 ${styles.iconColor} text-6xl font-bold select-none pointer-events-none`}>
                                            <i className="fa-solid fa-chalkboard"></i>
                                        </div>
                                        
                                        <div className="relative z-10">
                                            <Link href={route('admin.kelas.edit', k.id)} className="group">
                                                <h3 className={`font-bold text-lg ${styles.titleColor} group-hover:underline truncate pr-14 leading-tight`}>
                                                    {k.nama_kelas} <span className={`ml-1 px-1.5 py-0.5 text-xs font-bold rounded bg-slate-900/10 ${styles.subtext}`}>{k.jurusan}</span>
                                                </h3>
                                            </Link>
                                            <p className={`text-xs ${styles.subtitleColor} font-bold truncate mt-1.5`}>
                                                Wali Kelas: {k.wali_kelas}
                                            </p>
                                        </div>
                                        <div className={`relative z-10 text-[10px] ${styles.pill} font-extrabold uppercase tracking-wider px-2 py-0.5 rounded self-start shadow-sm`}>
                                            Tap 25/26
                                        </div>
                                    </div>

                                    {/* Overlapping Avatar Circle */}
                                    <div className={`absolute right-5 top-20 w-14 h-14 rounded-full border-4 border-white shadow-md ${styles.avatar} flex items-center justify-center font-bold text-base select-none z-20 transition-all duration-300`} title={k.wali_kelas}>
                                        {getInitials(k.wali_kelas)}
                                    </div>

                                    {/* Body Section (Middle) */}
                                    <div className="flex-1 p-5 flex items-center">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                            <span>Aktif Semester Ini</span>
                                        </div>
                                    </div>

                                    {/* Footer Actions (Folder / Edit / Hapus) */}
                                    <div className="px-5 py-3 bg-slate-50/50 border-t border-gray-100 flex items-center justify-between">
                                        {/* Student Count Badge mimicking Folder/Assignments layout */}
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500" title="Total Siswa">
                                            <i className="fa-solid fa-folder-open text-gray-400 text-sm"></i>
                                            <span>{k.total_siswa} Siswa</span>
                                        </div>
                                        
                                        {/* Action Icons */}
                                        <div className="flex items-center gap-1">
                                            <Link href={route('admin.kelas.edit', k.id)} 
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition border border-transparent hover:border-blue-100" 
                                                title="Edit Kelas"
                                            >
                                                <i className="fa-solid fa-pen-to-square text-xs"></i>
                                            </Link>
                                            <button onClick={() => hapus(k.id, `${k.nama_kelas} ${k.jurusan}`)} 
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition border border-transparent hover:border-red-100" 
                                                title="Hapus Kelas"
                                            >
                                                <i className="fa-solid fa-trash-can text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400 font-medium">
                        Belum ada kelas yang sesuai dengan kriteria pencarian
                    </div>
                )}
            </section>
        </DashboardLayout>
    );
}
