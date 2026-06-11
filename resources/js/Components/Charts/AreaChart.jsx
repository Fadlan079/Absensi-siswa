import React, { useState } from 'react';

export default function AreaChart({ data = [] }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-48 bg-slate-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm font-medium">Tidak ada data untuk ditampilkan</p>
            </div>
        );
    }

    // Sort data by date chronologically
    const sortedData = [...data].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

    // SVG coordinates setup
    const svgWidth = 600;
    const svgHeight = 240;
    
    const padding = { top: 20, right: 20, bottom: 35, left: 50 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    const getX = (index) => {
        if (sortedData.length <= 1) return padding.left + chartWidth / 2;
        return padding.left + (index / (sortedData.length - 1)) * chartWidth;
    };

    const getY = (value) => {
        // value is percentage (0 - 100)
        const val = Math.max(0, Math.min(100, value));
        return padding.top + chartHeight - (val / 100) * chartHeight;
    };

    // Path definitions
    const points = sortedData.map((d, i) => ({ x: getX(i), y: getY(d.persen) }));
    
    // Generate path command for line
    const linePath = points.length > 0 
        ? points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') 
        : '';

    // Generate path command for filled area
    const areaPath = points.length > 0
        ? `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`
        : '';

    // Helpers for gridlines
    const yGridValues = [0, 25, 50, 75, 100];

    // Helper to format date Indonesian style (e.g. 12 Jun)
    const formatDate = (dateStr) => {
        try {
            const parts = dateStr.split('-');
            if (parts.length !== 3) return dateStr;
            const day = parseInt(parts[2]);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const month = monthNames[parseInt(parts[1]) - 1];
            return `${day} ${month}`;
        } catch (e) {
            return dateStr;
        }
    };

    // Filter labels to prevent overlapping (show around 6 labels max)
    const labelStep = Math.max(1, Math.floor(sortedData.length / 6));

    return (
        <div className="relative w-full">
            {/* Tooltip Overlay */}
            {hoveredIndex !== null && sortedData[hoveredIndex] && (
                <div 
                    className="absolute z-15 bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700/50 backdrop-blur-sm pointer-events-none transition-all duration-100 ease-out"
                    style={{
                        left: `${(hoveredIndex / (sortedData.length - 1)) * 80 + 10}%`,
                        top: '10px',
                        transform: 'translateX(-50%)'
                    }}
                >
                    <p className="font-bold border-b border-slate-800 pb-1 mb-1.5 text-xs text-secondary-light">
                        {formatDate(sortedData[hoveredIndex].tanggal)}
                    </p>
                    <div className="space-y-1 text-[11px] leading-relaxed">
                        <div className="flex justify-between gap-5">
                            <span className="text-gray-400">Kehadiran:</span>
                            <span className="font-bold text-success">{sortedData[hoveredIndex].persen}%</span>
                        </div>
                        <div className="flex justify-between gap-5">
                            <span className="text-gray-400">Siswa Hadir:</span>
                            <span className="font-semibold">{sortedData[hoveredIndex].hadir}</span>
                        </div>
                        <div className="flex justify-between gap-5">
                            <span className="text-gray-400">Total Siswa:</span>
                            <span className="font-semibold text-gray-300">{sortedData[hoveredIndex].total}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* SVG Chart */}
            <div className="w-full overflow-hidden">
                <svg 
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                    className="w-full h-auto overflow-visible select-none"
                >
                    <defs>
                        {/* Gradient for area fill */}
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-primary-light, #1D4ED8)" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="var(--color-primary-light, #1D4ED8)" stopOpacity="0.00" />
                        </linearGradient>
                        
                        {/* Shadow for line stroke */}
                        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="var(--color-primary, #132B7A)" floodOpacity="0.15" />
                        </filter>
                    </defs>

                    {/* Gridlines & Y labels */}
                    {yGridValues.map((val) => {
                        const y = getY(val);
                        return (
                            <g key={val} className="opacity-80">
                                <line 
                                    x1={padding.left} 
                                    y1={y} 
                                    x2={svgWidth - padding.right} 
                                    y2={y} 
                                    stroke="rgba(226, 232, 240, 0.8)" 
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                />
                                <text 
                                    x={padding.left - 12} 
                                    y={y + 3.5} 
                                    textAnchor="end" 
                                    className="text-[10px] fill-slate-500 font-bold"
                                >
                                    {val}%
                                </text>
                            </g>
                        );
                    })}

                    {/* Filled Area */}
                    {areaPath && (
                        <path 
                            d={areaPath} 
                            fill="url(#areaGradient)" 
                            className="transition-all duration-300 ease-in-out"
                        />
                    )}

                    {/* Line Stroke */}
                    {linePath && (
                        <path 
                            d={linePath} 
                            fill="none" 
                            stroke="var(--color-primary, #132B7A)" 
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#shadow)"
                            className="transition-all duration-300 ease-in-out"
                        />
                    )}

                    {/* X labels & ticks */}
                    {sortedData.map((d, i) => {
                        const showLabel = i % labelStep === 0 || i === sortedData.length - 1;
                        if (!showLabel) return null;
                        const x = getX(i);
                        return (
                            <g key={i} className="opacity-90">
                                <line 
                                    x1={x} 
                                    y1={padding.top + chartHeight} 
                                    x2={x} 
                                    y2={padding.top + chartHeight + 6} 
                                    stroke="#CBD5E1" 
                                    strokeWidth="1.5"
                                />
                                <text 
                                    x={x} 
                                    y={padding.top + chartHeight + 18} 
                                    textAnchor="middle" 
                                    className="text-[10px] fill-slate-500 font-bold"
                                >
                                    {formatDate(d.tanggal)}
                                </text>
                            </g>
                        );
                    })}

                    {/* Hover vertical guideline */}
                    {hoveredIndex !== null && points[hoveredIndex] && (
                        <line 
                            x1={points[hoveredIndex].x} 
                            y1={padding.top} 
                            x2={points[hoveredIndex].x} 
                            y2={padding.top + chartHeight} 
                            stroke="var(--color-primary-light, #1D4ED8)" 
                            strokeWidth="1.5" 
                            strokeDasharray="3 3"
                        />
                    )}

                    {/* Interactive dots (hover targets) */}
                    {points.map((p, i) => (
                        <g 
                            key={i} 
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="cursor-pointer"
                        >
                            {/* Larger invisible hover area for easier mouse targeting */}
                            <circle 
                                cx={p.x} 
                                cy={p.y} 
                                r={12} 
                                fill="transparent" 
                            />
                            
                            {/* Inner dot visible only on hover or selected */}
                            <circle 
                                cx={p.x} 
                                cy={p.y} 
                                r={hoveredIndex === i ? 6.5 : 4} 
                                className="transition-all duration-100 ease-out"
                                fill={hoveredIndex === i ? "var(--color-secondary, #FFD028)" : "var(--color-primary, #132B7A)"}
                                stroke="white"
                                strokeWidth={hoveredIndex === i ? 2.5 : 1.5}
                            />
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
}
