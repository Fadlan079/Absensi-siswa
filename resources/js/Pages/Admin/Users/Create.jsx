import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const ROLES = [
    { value: 'admin',          label: 'Administrator' },
    { value: 'kepala_sekolah', label: 'Kepala Sekolah' },
    { value: 'wali_kelas',     label: 'Wali Kelas' },
    { value: 'sekretaris',     label: 'Sekretaris Kelas' },
    { value: 'guru_mapel',     label: 'Guru Mata Pelajaran' },
    { value: 'guru_piket',     label: 'Guru Piket' },
];

function FormUser({ auth, title, data, setData, errors, processing, onSubmit, kelas_list, isEdit }) {
    const needsKelas = ['wali_kelas', 'sekretaris'].includes(data.role);

    return (
        <DashboardLayout user={auth.user}>
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary flex justify-between items-center">
                    <div>
                        <p className="text-white/70 text-xs">Administrator</p>
                        <h2 className="text-xl font-bold">{title}</h2>
                    </div>
                    <Link href={route('admin.users.index')} className="text-white/60 hover:text-white">
                        <i className="fa-solid fa-arrow-left text-lg"></i>
                    </Link>
                </div>
            </section>

            <form onSubmit={onSubmit}>
                <section className="px-5 pb-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                        {/* Nama */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap *</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email *</label>
                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                Password {isEdit && <span className="text-gray-400 normal-case font-normal">(kosongkan jika tidak diubah)</span>}
                            </label>
                            <input type="password" value={data.password} onChange={e => setData('password', e.target.value)}
                                placeholder={isEdit ? '••••••' : 'Min. 6 karakter'}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role *</label>
                            <select value={data.role} onChange={e => setData('role', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                                <option value="">-- Pilih Role --</option>
                                {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                        </div>

                        {/* Kelas */}
                        {needsKelas && (
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kelas *</label>
                                <select value={data.kelas_id} onChange={e => setData('kelas_id', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                                    <option value="">-- Pilih Kelas --</option>
                                    {kelas_list.map(k => (
                                        <option key={k.id} value={k.id}>{k.nama_kelas} {k.jurusan}</option>
                                    ))}
                                </select>
                                {errors.kelas_id && <p className="text-red-500 text-xs mt-1">{errors.kelas_id}</p>}
                            </div>
                        )}

                        <button type="submit" disabled={processing}
                            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition shadow-sm flex items-center justify-center gap-2">
                            {processing ? <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...</>
                                : <><i className="fa-solid fa-floppy-disk"></i> {isEdit ? 'Perbarui' : 'Simpan'}</>}
                        </button>
                    </div>
                </section>
            </form>
        </DashboardLayout>
    );
}

export function Create({ auth, kelas_list }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '', email: '', password: '', role: '', kelas_id: '',
    });
    return (
        <>
            <Head title="Tambah Pengguna" />
            <FormUser auth={auth} title="Tambah Pengguna" data={data} setData={setData}
                errors={errors} processing={processing} kelas_list={kelas_list}
                onSubmit={e => { e.preventDefault(); post(route('admin.users.store')); }} />
        </>
    );
}

export function Edit({ auth, user, kelas_list }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name, email: user.email, password: '',
        role: user.role, kelas_id: user.kelas_id || '',
    });
    return (
        <>
            <Head title="Edit Pengguna" />
            <FormUser auth={auth} title="Edit Pengguna" data={data} setData={setData}
                errors={errors} processing={processing} kelas_list={kelas_list} isEdit
                onSubmit={e => { e.preventDefault(); put(route('admin.users.update', user.id)); }} />
        </>
    );
}

export default Create;
