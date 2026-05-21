import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function PublicDashboard({ leaderboard, kehadiranHariIni, keterlambatan, rekapSiswa = {}, terakhirDiperbarui }) {
    const [activeTab, setActiveTab] = useState('leaderboard');
    const [expandedClasses, setExpandedClasses] = useState({});

    // Certificate responsive scaling and dynamic interaction
    const [certScale, setCertScale] = useState(1);
    const [selectedLeaderboardIndex, setSelectedLeaderboardIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalScale, setModalScale] = useState(1);
    const certRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (certRef.current) {
                const containerWidth = certRef.current.getBoundingClientRect().width;
                const targetWidth = 850; // standard width of our certificate container
                const newScale = Math.min(containerWidth / targetWidth, 1);
                setCertScale(newScale);
            }
            
            // Calculate modal scale
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const padding = 32;
            const targetWidth = 850;
            const targetHeight = 478;
            
            const scaleX = (viewportWidth - padding) / targetWidth;
            const scaleY = (viewportHeight - padding - 80) / targetHeight; // 80px space for close button/header
            
            const newModalScale = Math.min(scaleX, scaleY, 1.2); // max 1.2x zoom on large screens
            setModalScale(newModalScale);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        
        // Timeout to handle initial layout shifts
        const timer = setTimeout(handleResize, 150);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, [isModalOpen]);

    // Format date in Indonesian and more human-friendly
    const formatIndonesianDate = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                return dateStr;
            }
            const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            
            const dayName = days[date.getDay()];
            const dayNum = date.getDate();
            const monthName = months[date.getMonth()];
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${dayName}, ${dayNum} ${monthName} ${year} pukul ${hours}:${minutes} WIB`;
        } catch (e) {
            return dateStr;
        }
    };

    // Date calculations for certificate
    const currentDate = new Date();
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const formattedDate = `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    const romanMonth = romanMonths[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();
    
    const currentSelectedClass = leaderboard && leaderboard.length > 0 && selectedLeaderboardIndex < leaderboard.length 
        ? leaderboard[selectedLeaderboardIndex] 
        : (leaderboard && leaderboard.length > 0 ? leaderboard[0] : null);

    const toggleClass = (className) => {
        setExpandedClasses(prev => ({
            ...prev,
            [className]: !prev[className]
        }));
    };

    // Reusable, highly optimized Certificate Card renderer to avoid duplicate code
    const renderCertificateCard = (kelas, index, scale, isForModal = false) => {
        if (!kelas) return null;
        
        const rankRoman = romanMonths[index] || `#${index + 1}`;
        
        return (
            <div 
                style={{
                    width: `${850 * scale}px`,
                    height: `${478 * scale}px`,
                    position: 'relative',
                    overflow: 'visible',
                }}
                className="flex-shrink-0"
            >
                <div 
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        width: '850px',
                        height: '478px',
                    }}
                    className="relative border-8 border-double border-[#0B2545]/15 bg-[#FCFBF9] p-6 rounded-lg text-center flex flex-col justify-between shadow-2xl overflow-hidden select-none"
                >
                {/* Left Accent Bar */}
                <div className="absolute left-4 top-6 bottom-6 w-3.5 bg-[#0B2545] rounded-sm flex flex-col justify-end pb-6 items-center">
                    <div className="w-full h-0.5 bg-[#FCFBF9] my-0.5 opacity-20 transform -rotate-12"></div>
                    <div className="w-full h-0.5 bg-[#FCFBF9] my-0.5 opacity-20 transform -rotate-12"></div>
                    <div className="w-full h-0.5 bg-[#FCFBF9] my-0.5 opacity-20 transform -rotate-12"></div>
                </div>

                {/* Right Accent Bar */}
                <div className="absolute right-4 top-6 bottom-6 w-3.5 bg-[#0B2545] rounded-sm flex flex-col justify-start pt-6 items-center">
                    <div className="w-full h-0.5 bg-[#FCFBF9] my-0.5 opacity-20 transform -rotate-12"></div>
                    <div className="w-full h-0.5 bg-[#FCFBF9] my-0.5 opacity-20 transform -rotate-12"></div>
                    <div className="w-full h-0.5 bg-[#FCFBF9] my-0.5 opacity-20 transform -rotate-12"></div>
                </div>

                {/* Top-Right Corner Geometry SVG */}
                <svg viewBox="0 0 150 150" className="absolute top-0 right-0 w-32 h-32 text-[#0B2545] pointer-events-none">
                    <path d="M150,0 L150,85 A85,85 0 0,1 65,0 Z" fill="currentColor" />
                    <path d="M150,0 L150,115 A115,115 0 0,1 35,0 L50,0 A100,100 0 0,0 150,100 Z" fill="#EE9B00" />
                    <circle cx="150" cy="0" r="48" fill="#005F73" />
                    <g fill="#FCFBF9" opacity="0.8">
                        {Array.from({ length: 4 }).map((_, r) => 
                            Array.from({ length: 4 }).map((_, c) => (
                                <circle key={`tr-${r}-${c}-${isForModal ? 'modal' : 'page'}`} cx={135 - c * 9} cy={15 + r * 9} r="1.8" />
                            ))
                        )}
                    </g>
                    <line x1="65" y1="0" x2="150" y2="85" stroke="#EE9B00" strokeWidth="2" strokeDasharray="3,3" />
                </svg>

                {/* Bottom-Left Corner Geometry SVG */}
                <svg viewBox="0 0 150 150" className="absolute bottom-0 left-0 w-32 h-32 text-[#0B2545] pointer-events-none">
                    <path d="M0,150 L0,65 A85,85 0 0,1 85,150 Z" fill="currentColor" />
                    <path d="M0,150 L0,35 A115,115 0 0,1 115,150 L100,150 A100,100 0 0,0 0,50 Z" fill="#EE9B00" />
                    <circle cx="0" cy="150" r="48" fill="#005F73" />
                    <g fill="#FCFBF9" opacity="0.8">
                        {Array.from({ length: 4 }).map((_, r) => 
                            Array.from({ length: 4 }).map((_, c) => (
                                <circle key={`bl-${r}-${c}-${isForModal ? 'modal' : 'page'}`} cx={15 + c * 9} cy={135 - r * 9} r="1.8" />
                            ))
                        )}
                    </g>
                    <line x1="85" y1="150" x2="0" y2="65" stroke="#EE9B00" strokeWidth="2" strokeDasharray="3,3" />
                </svg>

                {/* Header Section of the Certificate */}
                <div className="flex justify-between items-center px-6 z-10 mt-0">
                    {/* Left Logo (SMK TI Mockup) */}
                    <div className="flex items-center gap-2">
                        <svg viewBox="0 0 100 100" className="w-12 h-12">
                            <defs>
                                <path id={`circlePath-${isForModal ? 'modal' : 'page'}`} d="M 20,50 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" />
                            </defs>
                            <circle cx="50" cy="50" r="46" fill="#0B2545" />
                            <circle cx="50" cy="50" r="41" fill="#FCFBF9" stroke="#EE9B00" strokeWidth="1.5" />
                            <path d="M35,42 Q50,32 65,42 L60,65 Q50,75 40,65 Z" fill="#0B2545" />
                            <path d="M40,45 Q50,37 60,45 L56,62 Q50,70 44,62 Z" fill="#EE9B00" />
                            <polygon points="50,42 55,50 45,50" fill="white" />
                            <rect x="47" y="50" width="6" height="10" fill="white" />
                            <text fill="#0B2545" fontSize="4.8" fontWeight="bold" letterSpacing="0.4">
                                <textPath href={`#circlePath-${isForModal ? 'modal' : 'page'}`} startOffset="0%">
                                    * PORTAL PRESENSI DIGITAL * UTAMA
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    {/* Right Logo (SMK PK Badge Style) */}
                    <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] font-black text-[#0B2545] tracking-tight">SMK</span>
                            <span className="text-[8px] font-bold text-[#EE9B00] tracking-wider">Pusat Keunggulan</span>
                        </div>
                        <div className="w-4.5 h-4.5 bg-[#EE9B00] rounded flex items-center justify-center">
                            <i className="fa-solid fa-graduation-cap text-white text-[9px]"></i>
                        </div>
                    </div>
                </div>

                {/* Certificate Text Details */}
                <div className="my-1 z-10 flex-grow flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[0.12em] text-[#0B2545] uppercase">
                        Sertifikat Penghargaan
                    </h3>
                    <p className="text-[9px] sm:text-xs font-semibold text-gray-500 tracking-widest uppercase mt-0.5">
                        NO. 1109.7/421.5/KSS-PRESENSI/{romanMonths[currentDate.getMonth()]}/{currentYear}
                    </p>
                    
                    <p className="text-xs italic text-gray-600 font-serif mt-1">
                        Diberikan kepada:
                    </p>
                    
                    {/* Elegant Cursive Name styling */}
                    <div className="my-0.5 inline-block">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 italic tracking-wide font-serif relative">
                            Kelas {kelas.nama_kelas}
                        </span>
                        <div className="h-[2px] w-64 sm:w-80 bg-gradient-to-r from-transparent via-[#EE9B00] to-transparent mx-auto mt-1"></div>
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-0.5 block">
                            Jurusan {kelas.jurusan}
                        </span>
                    </div>
                    
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-[#005F73] font-bold mt-1">
                        Sebagai
                    </p>
                    
                    <h4 className="text-lg font-extrabold text-[#0B2545] mt-0.5 tracking-tight uppercase">
                        {index === 0 ? "Kelas Terdisiplin Bulan Ini" : `Peringkat ${rankRoman} Terdisiplin Bulan Ini`}
                    </h4>
                    <p className="text-xs font-bold text-[#005F73] italic">
                        Dengan Predikat Tingkat Kehadiran Sangat Memuaskan ({kelas.persentase}%)
                    </p>
                    
                    <div className="text-[10px] sm:text-[11px] text-gray-600 max-w-xl mx-auto leading-relaxed mt-2 space-y-0.5 font-medium">
                        <p>
                            Atas dedikasi, sikap teladan, dan kontribusi positif tingkat kehadiran kelas yang luar biasa
                            dalam mencerminkan karakter disiplin di lingkungan sekolah selama 3 bulan terakhir.
                        </p>
                    </div>
                </div>

                {/* Footer Signatures and Stamp */}
                <div className="flex justify-between items-end px-8 mt-1 z-10 relative pb-0">
                    
                    {/* Dynamic Cap Basah (Stamp) */}
                    <div className="absolute bottom-1 left-[46%] pointer-events-none opacity-85 select-none transform -rotate-12">
                        <svg viewBox="0 0 120 120" className="w-16 h-16 text-blue-700/70 stroke-current fill-none">
                            <circle cx="60" cy="60" r="54" strokeWidth="2.5" />
                            <circle cx="60" cy="60" r="48" strokeWidth="1" strokeDasharray="3,1.5" />
                            <circle cx="60" cy="60" r="35" strokeWidth="1.5" />
                            <path d="M 45 60 L 75 60" strokeWidth="1.5" />
                            <polygon points="60,48 63,55 70,55 65,60 67,67 60,63 53,67 55,60 50,55 57,55" fill="currentColor" stroke="none" />
                            <defs>
                                <path id={`stampTextTop-${isForModal ? 'modal' : 'page'}`} d="M 22,60 A 38,38 0 0,1 98,60" />
                                <path id={`stampTextBottom-${isForModal ? 'modal' : 'page'}`} d="M 98,60 A 38,38 0 0,1 22,60" />
                            </defs>
                            <text fontSize="5.8" fontWeight="bold" letterSpacing="0.8" fill="currentColor" stroke="none">
                                <textPath href={`#stampTextTop-${isForModal ? 'modal' : 'page'}`} startOffset="50%" textAnchor="middle">
                                    KOMITE PORTAL PRESENSI
                                </textPath>
                            </text>
                            <text fontSize="6.5" fontWeight="bold" letterSpacing="1" fill="currentColor" stroke="none">
                                <textPath href={`#stampTextBottom-${isForModal ? 'modal' : 'page'}`} startOffset="50%" textAnchor="middle">
                                    PORTAL PRESENSI
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    {/* Left footer space */}
                    <div className="text-left w-1/3 pb-1 text-[9px] sm:text-[10px] font-semibold text-gray-500 leading-normal">
                        <span>Diberikan di: Samarinda</span>
                        <br />
                        <span>Tanggal: {formattedDate}</span>
                    </div>

                    {/* Right Headmaster signature space */}
                    <div className="text-center w-1/3 relative z-20">
                        <span className="text-[10px] font-semibold text-gray-600 block">Kepala Sekolah,</span>
                        
                        {/* Sweeping hand-drawn headmaster signature path */}
                        <svg viewBox="0 0 200 80" className="w-28 h-8 mx-auto my-0.5 text-gray-800 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20,45 Q40,15 50,40 T70,30 T95,50 Q120,60 140,25 T160,45" />
                            <path d="M45,42 Q70,40 120,40" strokeWidth="1.5" />
                            <path d="M110,30 Q125,15 130,35" strokeWidth="1.5" />
                        </svg>
                        
                        <span className="text-[10px] font-bold text-gray-800 block underline decoration-[#0B2545] decoration-1">
                            Muhammad Yani, S.Kom., M.T.I.
                        </span>
                    </div>
                </div>
            </div>
        </div>
        );
    };

    return (
        <div className="min-h-screen bg-bg font-sans antialiased text-text">
            <Head title="Portal Informasi Siswa" />

            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain hover:scale-105 transition-transform" />
                            </Link>
                            <span className="font-bold text-xl text-primary tracking-tight hidden sm:block">Portal Siswa</span>
                        </div>
                        
                        <div className="hidden md:flex space-x-8">
                            <a href="/#beranda" className="text-text font-semibold hover:text-primary transition">Beranda</a>
                            <a href="/#fitur" className="text-muted font-semibold hover:text-primary transition">Keunggulan</a>
                            <a href="/#alur" className="text-muted font-semibold hover:text-primary transition">Cara Penggunaan</a>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link 
                                href="/"
                                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
                            >
                                <i className="fa-solid fa-arrow-left"></i> Kembali
                            </Link>
                            <Link 
                                href={route('login')}
                                className="px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                Masuk <i className="fa-solid fa-arrow-right hidden sm:block"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-4">Informasi Kehadiran Kelas</h1>
                    <p className="text-muted max-w-2xl mx-auto text-lg">
                        Pantau kedisiplinan dan tingkat kehadiran siswa secara transparan. Pembaruan data terakhir: <span className="font-semibold text-primary">{formatIndonesianDate(terakhirDiperbarui)}</span>
                    </p>
                </div>

                {/* Tabs */}
                <div className="max-w-3xl mx-auto mb-10 bg-gray-100/90 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200/50 grid grid-cols-2 md:flex md:flex-row gap-1.5 shadow-inner">
                    <button
                        onClick={() => setActiveTab('leaderboard')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                            activeTab === 'leaderboard'
                                ? 'bg-white text-primary shadow-md transform scale-[1.02] border border-gray-200/30'
                                : 'text-gray-500 hover:text-gray-800 hover:bg-white/40'
                        }`}
                    >
                        <i className={`fa-solid fa-trophy text-amber-500 transition-transform duration-300 ${activeTab === 'leaderboard' ? 'scale-110' : ''}`}></i>
                        <span>Leaderboard</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('kehadiran')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                            activeTab === 'kehadiran'
                                ? 'bg-white text-primary shadow-md transform scale-[1.02] border border-gray-200/30'
                                : 'text-gray-500 hover:text-gray-800 hover:bg-white/40'
                        }`}
                    >
                        <i className={`fa-solid fa-chart-column text-blue-500 transition-transform duration-300 ${activeTab === 'kehadiran' ? 'scale-110' : ''}`}></i>
                        <span>Rekap Hari Ini</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('siswa')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                            activeTab === 'siswa'
                                ? 'bg-white text-primary shadow-md transform scale-[1.02] border border-gray-200/30'
                                : 'text-gray-500 hover:text-gray-800 hover:bg-white/40'
                        }`}
                    >
                        <i className={`fa-solid fa-graduation-cap text-indigo-500 transition-transform duration-300 ${activeTab === 'siswa' ? 'scale-110' : ''}`}></i>
                        <span>Rekap per Siswa</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('keterlambatan')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                            activeTab === 'keterlambatan'
                                ? 'bg-white text-red-600 shadow-md transform scale-[1.02] border border-gray-200/30'
                                : 'text-gray-500 hover:text-red-500 hover:bg-white/40'
                        }`}
                    >
                        <i className={`fa-solid fa-clock text-red-500 transition-transform duration-300 ${activeTab === 'keterlambatan' ? 'scale-110' : ''}`}></i>
                        <span>Keterlambatan</span>
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 min-h-[500px]">
                    {activeTab === 'leaderboard' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-8 no-print">
                                <h2 className="text-3xl font-extrabold text-gray-800">Penghargaan Kelas Terdisiplin</h2>
                                <p className="text-muted mt-2 text-base">Sertifikat Digital diberikan otomatis kepada kelas dengan rata-rata tingkat kehadiran tertinggi dalam 3 bulan terakhir.</p>
                            </div>
                            
                            {leaderboard.length > 0 ? (
                                <>
                                    {/* Horizontal Top 10 Pill Selectors */}
                                    <div className="max-w-4xl mx-auto px-4 mb-4 no-print animate-in fade-in duration-300">
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                            <i className="fa-solid fa-list-ol text-primary"></i> Pilih Kelas Leaderboard (Top 10):
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-200/80">
                                            {leaderboard.slice(0, 10).map((kelas, index) => (
                                                <button
                                                    key={kelas.id}
                                                    onClick={() => setSelectedLeaderboardIndex(index)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                                                        selectedLeaderboardIndex === index
                                                            ? 'bg-primary text-white border-primary shadow-md scale-[1.03]'
                                                            : 'bg-slate-50 text-gray-500 border-slate-100 hover:bg-slate-100 hover:text-gray-800 hover:scale-[1.01]'
                                                    }`}
                                                >
                                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                                                        selectedLeaderboardIndex === index
                                                            ? 'bg-white/20 text-white'
                                                            : (index === 0 ? 'bg-amber-100 text-amber-600' :
                                                               index === 1 ? 'bg-slate-200 text-slate-600' :
                                                               index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500')
                                                    }`}>
                                                        #{index + 1}
                                                    </span>
                                                    Kelas {kelas.nama_kelas}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Certificate Wrapper for Mobile Responsiveness */}
                                    <div className="w-full py-4">
                                        <div className="max-w-4xl mx-auto px-2 sm:px-4">
                                            <div 
                                                ref={certRef}
                                                className="w-full flex justify-center items-start overflow-hidden relative animate-in zoom-in-95 duration-300"
                                                style={{ height: `${478 * certScale}px` }}
                                            >
                                                <div 
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="cursor-pointer group hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 relative rounded-lg"
                                                >
                                                    {renderCertificateCard(currentSelectedClass, selectedLeaderboardIndex, certScale, false)}
                                                    
                                                    {/* Hover overlay hint */}
                                                    <div className="absolute inset-0 bg-[#0B2545]/0 hover:bg-[#0B2545]/5 transition-all duration-300 flex items-center justify-center rounded-lg overflow-hidden group">
                                                        <span className="opacity-0 group-hover:opacity-100 bg-[#0B2545]/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg transition-opacity duration-300 flex items-center gap-1.5 backdrop-blur-sm pointer-events-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                            <i className="fa-solid fa-magnifying-glass-plus"></i> Klik untuk Perbesar
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Full Leaderboard Table */}
                                    <div className="mt-6 border-t border-gray-100 pt-8">
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-bold text-text">Peringkat Kehadiran Seluruh Kelas</h3>
                                            <p className="text-sm text-muted mt-1">Daftar lengkap urutan persentase kehadiran 3 bulan terakhir.</p>
                                        </div>

                                        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-50 text-gray-600 font-semibold text-sm">
                                                        <th className="p-4 border-b">Peringkat</th>
                                                        <th className="p-4 border-b">Kelas</th>
                                                        <th className="p-4 border-b">Jurusan</th>
                                                        <th className="p-4 border-b text-right">Persentase Kehadiran</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 text-sm">
                                                    {leaderboard.map((kelas, index) => {
                                                        const isSelected = selectedLeaderboardIndex === index;
                                                        return (
                                                            <tr 
                                                                key={kelas.id} 
                                                                onClick={() => {
                                                                    setSelectedLeaderboardIndex(index);
                                                                    certRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                }}
                                                                className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                                                                    isSelected ? 'bg-primary/5 font-semibold border-l-4 border-l-primary' : ''
                                                                } ${index === 0 && !isSelected ? 'bg-amber-50/10' : ''}`}
                                                            >
                                                                <td className="p-4 flex items-center gap-2">
                                                                    {index === 0 ? (
                                                                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-black"><i className="fa-solid fa-medal"></i></span>
                                                                    ) : index === 1 ? (
                                                                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-black"><i className="fa-solid fa-medal"></i></span>
                                                                    ) : index === 2 ? (
                                                                        <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-black"><i className="fa-solid fa-medal"></i></span>
                                                                    ) : (
                                                                        <span className="text-gray-500 font-semibold pl-2">#{index + 1}</span>
                                                                    )}
                                                                </td>
                                                                <td className="p-4 font-bold text-text">{kelas.nama_kelas}</td>
                                                                <td className="p-4 text-muted">{kelas.jurusan}</td>
                                                                <td className="p-4 text-right">
                                                                    <span className={`font-bold ${index === 0 ? 'text-amber-600 text-base' : 'text-primary'}`}>
                                                                        {kelas.persentase}%
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-2xl">
                                    <div className="text-5xl text-gray-300 mb-4"><i className="fa-solid fa-trophy"></i></div>
                                    <h3 className="text-lg font-bold text-gray-700">Data Belum Tersedia</h3>
                                    <p className="text-muted mt-1">Belum ada data kehadiran yang cukup untuk menampilkan Leaderboard.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'kehadiran' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-text">Rekap Kehadiran Harian</h2>
                                <p className="text-muted mt-2">Daftar agregat kehadiran seluruh kelas pada hari ini.</p>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 font-semibold text-sm">
                                            <th className="p-4 border-b">Kelas</th>
                                            <th className="p-4 border-b">Jurusan</th>
                                            <th className="p-4 border-b text-center text-green-600">Hadir</th>
                                            <th className="p-4 border-b text-center text-blue-600">Sakit</th>
                                            <th className="p-4 border-b text-center text-amber-600">Izin</th>
                                            <th className="p-4 border-b text-center text-red-600">Alpha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {kehadiranHariIni.length > 0 ? kehadiranHariIni.map((kelas) => (
                                            <tr key={kelas.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-bold text-text">{kelas.nama_kelas}</td>
                                                <td className="p-4 text-muted">{kelas.jurusan}</td>
                                                <td className="p-4 text-center font-semibold text-green-700 bg-green-50/50">{kelas.hadir || 0}</td>
                                                <td className="p-4 text-center font-semibold text-blue-700 bg-blue-50/50">{kelas.sakit || 0}</td>
                                                <td className="p-4 text-center font-semibold text-amber-700 bg-amber-50/50">{kelas.izin || 0}</td>
                                                <td className="p-4 text-center font-semibold text-red-700 bg-red-50/50">{kelas.alpha || 0}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="p-8 text-center text-muted">Belum ada kelas yang melakukan absensi hari ini.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'siswa' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-text">Detail Kehadiran per Siswa</h2>
                                <p className="text-muted mt-2">Daftar rekap kehadiran individu siswa selama bulan ini (dikelompokkan per kelas).</p>
                            </div>

                            {Object.keys(rekapSiswa).length > 0 ? (
                                <div className="space-y-4">
                                    {Object.entries(rekapSiswa).map(([namaKelas, daftarSiswa]) => {
                                        const isExpanded = !!expandedClasses[namaKelas];
                                        return (
                                            <div key={namaKelas} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
                                                {/* Accordion Header */}
                                                <button
                                                    onClick={() => toggleClass(namaKelas)}
                                                    className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                            <i className="fa-solid fa-school"></i>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-text text-lg">{namaKelas}</h3>
                                                            <p className="text-xs text-muted font-medium">{daftarSiswa.length} Siswa Terdaftar</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-400">
                                                        <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`}></i>
                                                    </div>
                                                </button>

                                                {/* Accordion Content */}
                                                {isExpanded && (
                                                    <div className="border-t border-gray-100 overflow-x-auto">
                                                        <table className="w-full text-left border-collapse min-w-[600px]">
                                                            <thead>
                                                                <tr className="bg-gray-50/50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                                                                    <th className="p-4 border-b">Nama Siswa</th>
                                                                    <th className="p-4 border-b">NISN</th>
                                                                    <th className="p-4 border-b text-center text-green-600">Hadir</th>
                                                                    <th className="p-4 border-b text-center text-blue-600">Sakit</th>
                                                                    <th className="p-4 border-b text-center text-amber-600">Izin</th>
                                                                    <th className="p-4 border-b text-center text-red-600">Alpha</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-100 text-sm">
                                                                {daftarSiswa.map((siswa) => (
                                                                    <tr key={siswa.id} className="hover:bg-gray-50/50 transition-colors">
                                                                        <td className="p-4 font-bold text-text">{siswa.nama}</td>
                                                                        <td className="p-4 text-xs font-semibold text-muted tracking-wider">{siswa.nisn || '-'}</td>
                                                                        <td className="p-4 text-center font-bold text-green-600 bg-green-50/10">{siswa.hadir}</td>
                                                                        <td className="p-4 text-center font-bold text-blue-600 bg-blue-50/10">{siswa.sakit}</td>
                                                                        <td className="p-4 text-center font-bold text-amber-600 bg-amber-50/10">{siswa.izin}</td>
                                                                        <td className="p-4 text-center font-bold text-red-600 bg-red-50/10">{siswa.alpha}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-2xl">
                                    <div className="text-5xl text-gray-300 mb-4"><i className="fa-solid fa-graduation-cap"></i></div>
                                    <h3 className="text-lg font-bold text-gray-700">Data Siswa Belum Tersedia</h3>
                                    <p className="text-muted mt-1">Belum ada kelas yang memiliki data siswa di sistem.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'keterlambatan' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-text">Catatan Keterlambatan</h2>
                                <p className="text-muted mt-2">Daftar siswa yang tercatat terlambat hari ini.</p>
                            </div>

                            {keterlambatan.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {keterlambatan.map((k, i) => (
                                        <div key={i} className="p-5 border border-red-100 bg-red-50/30 rounded-xl relative overflow-hidden group hover:shadow-md transition-shadow">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h4 className="font-bold text-text">{k.nama_siswa}</h4>
                                                    <p className="text-xs font-semibold text-muted">{k.nama_kelas} - {k.jurusan}</p>
                                                </div>
                                                <div className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                                                    {k.jam_datang}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                <span className="font-semibold text-gray-700">Alasan:</span> {k.alasan || '-'}
                                            </p>
                                            {k.sanksi && (
                                                <p className="text-xs text-red-600 bg-red-100/50 p-2 rounded border border-red-100">
                                                    <span className="font-semibold">Sanksi:</span> {k.sanksi}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-2xl">
                                    <div className="text-5xl text-gray-300 mb-4"><i className="fa-regular fa-face-smile-beam"></i></div>
                                    <h3 className="text-lg font-bold text-gray-700">Luar Biasa!</h3>
                                    <p className="text-muted mt-1">Belum ada catatan keterlambatan hari ini.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* High-fidelity fullscreen Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setIsModalOpen(false)}
                >
                    {/* Close Button */}
                    <div className="absolute top-4 right-4 z-[110]">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-110 shadow-lg"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div 
                        className="w-full h-full flex items-center justify-center pointer-events-none"
                        style={{ minHeight: '100vh' }}
                    >
                        <div 
                            className="pointer-events-auto flex justify-center items-center"
                            style={{ 
                                width: `${850 * modalScale}px`, 
                                height: `${478 * modalScale}px`,
                                transition: 'all 0.2s ease-in-out'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {renderCertificateCard(currentSelectedClass, selectedLeaderboardIndex, modalScale, true)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
