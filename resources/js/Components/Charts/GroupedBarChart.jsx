import React, { useState } from 'react';

export default function GroupedBarChart({ data = [] }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-48 bg-slate-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm font-medium">Tidak ada data riwayat presensi</p>
            </div>
        );
    }

    // Chronological order: reverse the array so oldest is left, newest is right
    const chronologicalData = [...data].reverse();

    // Chart dimensions
    const svgWidth = 550;
    const svgHeight = 220;
    const padding = { top: 20, right: 15, bottom: 35, left: 40 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    // Find max total to set scale
    const maxVal = Math.max(...chronologicalData.map(d => d.total || 0), 1);
    
    // Group variables
    const groupCount = chronologicalData.length;
    const groupWidth = chartWidth / groupCount;
    const barSpacing = 3; // Space between Hadir and Alpha
    const paddingWithinGroup = groupWidth * 0.2; // 20% group padding
    const barWidth = (groupWidth - (paddingWithinGroup * 2) - barSpacing) / 2;

    const getY = (val) => {
        return padding.top + chartHeight - (val / maxVal) * chartHeight;
    };

    const getX = (idx) => {
        return padding.left + (idx * groupWidth);
    };

    // Helper to format date Indonesian style (remove year to save space)
    const formatLabelDate = (dateStr) => {
        // format is d/m/Y (e.g. 11/06/2026)
        try {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                return `${parts[0]}/${parts[1]}`;
            }
        } catch (e) {}
        return dateStr;
    };

    // Calculate Y axis label steps
    const yGridValues = [0, Math.round(maxVal / 2), maxVal];

    return (
        <div className="relative w-full">
            {/* Tooltip Overlay */}
            {hoveredIndex !== null && chronologicalData[hoveredIndex] && (
                <div 
                    className="absolute z-15 bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700/50 backdrop-blur-sm pointer-events-none transition-all duration-100 ease-out"
                    style={{
                        left: `${(hoveredIndex / (groupCount - 1)) * 80 + 10}%`,
                        top: '10px',
                        transform: 'translateX(-50%)'
                    }}
                >
                    <p className="font-bold border-b border-slate-800 pb-1 mb-1.5 text-xs text-secondary-light">
                        Pertemuan: {chronologicalData[hoveredIndex].tanggal}
                    </p>
                    <div className="space-y-1 text-[11px] leading-relaxed">
                        <div className="flex justify-between gap-5">
                            <span className="text-gray-400">Hadir:</span>
                            <span className="font-bold text-success">{chronologicalData[hoveredIndex].hadir} siswa</span>
                        </div>
                        <div className="flex justify-between gap-5">
                            <span className="text-gray-400">Alpha:</span>
                            <span className="font-bold text-danger">{chronologicalData[hoveredIndex].alpha} siswa</span>
                        </div>
                        <div className="flex justify-between gap-5">
                            <span className="text-gray-400">Total Siswa:</span>
                            <span className="font-semibold text-gray-300">{chronologicalData[hoveredIndex].total} siswa</span>
                        </div>
                        <div className="flex justify-between gap-5 border-t border-slate-800 pt-1 mt-1 text-[10px]">
                            <span className="text-gray-500">Oleh:</span>
                            <span className="text-gray-400 font-medium truncate max-w-[100px]">{chronologicalData[hoveredIndex].oleh}</span>
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
                    {/* Gridlines */}
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
                                    x={padding.left - 10} 
                                    y={y + 3.5} 
                                    textAnchor="end" 
                                    className="text-[10px] fill-slate-500 font-bold"
                                >
                                    {val}
                                </text>
                            </g>
                        );
                    })}

                    {/* Group rendering (underlay background first) */}
                    {chronologicalData.map((d, i) => {
                        const x = getX(i);
                        return (
                            <rect 
                                key={`bg-${i}`}
                                x={x}
                                y={padding.top}
                                width={groupWidth}
                                height={chartHeight}
                                fill={hoveredIndex === i ? 'rgba(241, 245, 249, 0.7)' : 'transparent'}
                                className="transition-colors duration-150 rounded-lg cursor-pointer"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        );
                    })}

                    {/* Bars rendering */}
                    {chronologicalData.map((d, i) => {
                        const x = getX(i);
                        const groupStartX = x + paddingWithinGroup;
                        
                        // Hadir bar
                        const hadirY = getY(d.hadir);
                        const hadirH = padding.top + chartHeight - hadirY;
                        
                        // Alpha bar
                        const alphaY = getY(d.alpha);
                        const alphaH = padding.top + chartHeight - alphaY;

                        return (
                            <g key={`bars-${i}`} className="pointer-events-none">
                                {/* Hadir Bar */}
                                {d.hadir > 0 && (
                                    <rect 
                                        x={groupStartX}
                                        y={hadirY}
                                        width={barWidth}
                                        height={hadirH}
                                        rx="3"
                                        fill="var(--color-success, #22C55E)"
                                        className="transition-all duration-300 ease-out"
                                        opacity={hoveredIndex === null || hoveredIndex === i ? 1 : 0.6}
                                    />
                                )}

                                {/* Alpha Bar */}
                                {d.alpha > 0 && (
                                    <rect 
                                        x={groupStartX + barWidth + barSpacing}
                                        y={alphaY}
                                        width={barWidth}
                                        height={alphaH}
                                        rx="3"
                                        fill="var(--color-danger, #EF4444)"
                                        className="transition-all duration-300 ease-out"
                                        opacity={hoveredIndex === null || hoveredIndex === i ? 1 : 0.6}
                                    />
                                )}
                            </g>
                        );
                    })}

                    {/* X-axis line & Labels */}
                    <line 
                        x1={padding.left} 
                        y1={padding.top + chartHeight} 
                        x2={svgWidth - padding.right} 
                        y2={padding.top + chartHeight} 
                        stroke="#CBD5E1" 
                        strokeWidth="1.5"
                    />
                    {chronologicalData.map((d, i) => {
                        const x = getX(i);
                        return (
                            <text 
                                key={`lbl-${i}`}
                                x={x + groupWidth / 2} 
                                y={padding.top + chartHeight + 18} 
                                textAnchor="middle" 
                                className={`text-[9px] font-bold transition-all ${
                                    hoveredIndex === i ? 'fill-slate-800 font-extrabold' : 'fill-slate-500'
                                }`}
                            >
                                {formatLabelDate(d.tanggal)}
                            </text>
                        );
                    })}
                </svg>
            </div>
            
            {/* Chart legend under the chart */}
            <div className="flex justify-center items-center gap-6 mt-2.5 text-[10px] font-bold text-slate-500">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-success" />
                    <span>Hadir</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-danger" />
                    <span>Alpha</span>
                </div>
            </div>
        </div>
    );
}
