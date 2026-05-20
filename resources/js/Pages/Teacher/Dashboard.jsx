import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, class: classes }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Dashboard" />
            
            <section className="p-5">
                <div className="bg-primary p-2 rounded-lg shadow-md border-b-[5px] border-secondary relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white opacity-[0.03] rounded-full blur-2xl"></div>
                        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white rounded-full opacity-40 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full"></div>
                        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-30 transform rotate-45"></div>
                        <div className="absolute bottom-8 left-12 w-3 h-3 border-2 border-white/20 rounded-full"></div>
                    </div>

                    <div className="relative z-10 px-4 py-8 md:px-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="w-full md:w-2/3 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                                Sistem Manajemen <br />
                                <span className="text-secondary">Presensi Kelas</span>
                            </h2>
                            <p className="text-gray-200 text-sm md:text-base max-w-md leading-relaxed">
                                Memudahkan pengguna mencatat kehadiran siswa tanpa perlu menggunakan kertas.
                            </p>
                        </div>

                        <div className="hidden md:flex w-1/3 justify-end items-center pr-6">
                            <div className="relative bg-white rounded-lg shadow-2xl w-28 h-36 border-t-[14px] border-gray-200 flex flex-col justify-center px-4 gap-3.5 transform rotate-3">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-4 bg-gray-300 rounded-full border-[3px] border-white shadow-sm"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded border-2 border-text flex items-center justify-center">
                                        <i className="fa-solid fa-check text-[10px] text-text"></i>
                                    </div>
                                    <div className="h-1.5 w-12 bg-gray-300 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded border-2 border-text flex items-center justify-center">
                                        <i className="fa-solid fa-check text-[10px] text-text"></i>
                                    </div>
                                    <div className="h-1.5 w-16 bg-gray-300 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
                                    <div className="h-1.5 w-10 bg-gray-200 rounded"></div>
                                </div>
                                <div className="absolute -right-6 -bottom-4 bg-secondary text-text w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-[4px] border-primary transform -rotate-6 transition hover:scale-110 cursor-default">
                                    <i className="fa-solid fa-check text-2xl font-black"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5">
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3 border-l-[5px] border-secondary rounded-lg bg-secondary/10 py-3 px-4">
                    <h2 className="font-bold text-text text-lg whitespace-nowrap">Pilih Kelas</h2>
                </div>
            </section>

            <section className="p-4 sm:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {classes && classes.map((c, index) => (
                        <Link key={index} href={route('attendance.create', { kelas: c.kelas, jurusan: c.jurusan })}
                            className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-200 h-72 relative">
                            
                            {/* Header / Banner */}
                            <div className="bg-primary h-28 p-4 relative flex flex-col justify-between">
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id={`pattern-circles-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                                <circle cx="2" cy="2" r="1.5" fill="currentColor"></circle>
                                            </pattern>
                                        </defs>
                                        <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-circles-${index})`}></rect>
                                    </svg>
                                </div>
                                
                                <div className="relative z-10 flex flex-col pt-1">
                                    <h3 className="text-white font-medium text-xl sm:text-2xl truncate group-hover:underline decoration-white underline-offset-4">
                                        {c.kelas} {c.jurusan}
                                    </h3>
                                    <p className="text-white/90 text-sm mt-0.5 truncate">{auth.user.name}</p>
                                </div>
                            </div>

                            {/* Floating Avatar */}
                            <div className="absolute top-20 right-4 w-16 h-16 rounded-full border-4 border-white bg-secondary flex items-center justify-center shadow-sm z-20">
                                <i className="fa-solid fa-graduation-cap text-2xl text-primary"></i>
                            </div>

                            {/* Body Content */}
                            <div className="p-4 pt-8 flex-1 flex flex-col justify-between">
                                <div className="text-sm text-gray-700 font-medium">
                                    <p>{c.total} Siswa Terdaftar</p>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="border-t border-gray-100 p-3 flex justify-end items-center gap-2 text-gray-500 bg-gray-50/50">
                                <div className="p-2 hover:bg-gray-200 hover:text-primary rounded-full transition flex items-center justify-center w-9 h-9" title="Buka Presensi">
                                    <i className="fa-regular fa-calendar-check text-lg"></i>
                                </div>
                                <div className="p-2 hover:bg-gray-200 hover:text-primary rounded-full transition flex items-center justify-center w-9 h-9" title="Detail Kelas">
                                    <i className="fa-regular fa-folder text-lg"></i>
                                </div>
                                <div className="p-2 hover:bg-gray-200 hover:text-primary rounded-full transition flex items-center justify-center w-9 h-9">
                                    <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </DashboardLayout>
    );
}
