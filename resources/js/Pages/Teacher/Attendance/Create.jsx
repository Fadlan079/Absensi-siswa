import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CreateAttendance({ auth, kelas, jurusan, students, attendances }) {
    // Format the date to "DD Month YYYY"
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const date = new Date();
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        setCurrentDate(date.toLocaleDateString('id-ID', options));
    }, []);

    // Initialize form data with existing attendances if they exist
    const initialAttendanceData = {};
    students.forEach(s => {
        initialAttendanceData[s.id] = attendances && attendances[s.id] ? attendances[s.id].keterangan : '';
    });

    const { data, setData, post, processing } = useForm({
        kelas: kelas,
        jurusan: jurusan,
        attendance: initialAttendanceData
    });

    const handleAttendanceChange = (studentId, value) => {
        setData('attendance', {
            ...data.attendance,
            [studentId]: value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('attendance.store'));
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Presensi Kelas" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <nav className="flex mb-2" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 text-xs font-semibold uppercase tracking-wider">
                                <li className="text-muted">Presensi</li>
                                <li className="text-muted"><i className="fa-solid fa-chevron-right mx-2 text-[10px]"></i></li>
                                <li className="text-primary">{kelas} {jurusan}</li>
                            </ol>
                        </nav>
                        <h1 className="text-2xl font-bold text-text">Daftar Kehadiran Siswa</h1>
                        <p className="text-muted text-sm">Silahkan tandai kehadiran siswa sesuai dengan kondisi di kelas.</p>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 bg-bg rounded-full flex items-center justify-center text-primary">
                            <i className="fa-solid fa-calendar-day"></i>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-text">{currentDate}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
                    <div className="overflow-x-auto -mx-6 -mt-6">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-gray-100">
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase tracking-wider w-16 text-center">No</th>
                                    <th className="px-6 py-4.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                                    <th className="px-4 py-4.5 text-xs font-bold text-success uppercase tracking-wider text-center">Hadir</th>
                                    <th className="px-4 py-4.5 text-xs font-bold text-blue-600 uppercase tracking-wider text-center">Sakit</th>
                                    <th className="px-4 py-4.5 text-xs font-bold text-warning uppercase tracking-wider text-center">Izin</th>
                                    <th className="px-4 py-4.5 text-xs font-bold text-danger uppercase tracking-wider text-center">Alpha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {students.map((s, index) => (
                                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-400 text-center">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-text group-hover:text-primary transition-colors">{s.nama}</span>
                                        </td>
                                        
                                        {['Hadir', 'Sakit', 'Izin', 'Alpha'].map(status => {
                                            const isChecked = data.attendance[s.id] === status;
                                            
                                            // Determine styles based on status
                                            let activeColorClass = '';
                                            let icon = null;
                                            
                                            if (status === 'Hadir') {
                                                activeColorClass = 'peer-checked:border-success peer-checked:bg-success';
                                                icon = <i className="fa-solid fa-check text-[10px] text-white opacity-0 peer-checked:opacity-100"></i>;
                                            } else if (status === 'Sakit') {
                                                activeColorClass = 'peer-checked:border-primary peer-checked:bg-primary';
                                                icon = <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>;
                                            } else if (status === 'Izin') {
                                                activeColorClass = 'peer-checked:border-warning peer-checked:bg-warning';
                                                icon = <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>;
                                            } else if (status === 'Alpha') {
                                                activeColorClass = 'peer-checked:border-danger peer-checked:bg-danger';
                                                icon = <i className="fa-solid fa-xmark text-[10px] text-white opacity-0 peer-checked:opacity-100"></i>;
                                            }

                                            return (
                                                <td key={status} className="px-4 py-4 text-center">
                                                    <label className="inline-flex items-center justify-center cursor-pointer group/radio">
                                                        <input type="radio"
                                                            name={`attendance[${s.id}]`}
                                                            value={status}
                                                            checked={isChecked}
                                                            onChange={() => handleAttendanceChange(s.id, status)}
                                                            className="hidden peer" />
                                                        <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all ${activeColorClass}`}>
                                                            {icon}
                                                        </div>
                                                    </label>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
 
                    <div className="bg-slate-50 -mx-6 -mb-6 px-6 py-4.5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                        <div className="text-xs font-semibold text-muted italic">
                            Pastikan data sudah diperiksa sebelum menekan tombol simpan.
                        </div>
                        <button type="submit" disabled={processing} className="w-full md:w-auto bg-primary hover:bg-primary-light text-white px-8 py-2.5 rounded font-bold shadow-md transition flex items-center justify-center gap-2">
                            <i className="fa-solid fa-floppy-disk"></i> Simpan Presensi
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
