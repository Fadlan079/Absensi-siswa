import React, { useState } from 'react';

export default function DonutChart({ data = [] }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Calculate total
    const total = data.reduce((sum, item) => sum + (item.value || 0), 0);

    // SVG parameters
    const size = 180;
    const center = size / 2;
    const radius = 60;
    const strokeWidth = 16;
    const hoverStrokeWidth = 22;
    const circumference = 2 * Math.PI * radius; // ~376.99

    let accumulatedPercentage = 0;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4 w-full">
            {/* Donut Chart Container */}
            <div className="relative w-48 h-48 flex-shrink-0 select-none">
                <svg 
                    width="100%" 
                    height="100%" 
                    viewBox={`0 0 ${size} ${size}`}
                    className="transform -rotate-90 overflow-visible"
                >
                    {/* Background base circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="#F1F5F9"
                        strokeWidth={strokeWidth}
                    />

                    {total === 0 ? (
                        /* Empty state circle */
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="transparent"
                            stroke="#E2E8F0"
                            strokeWidth={strokeWidth}
                        />
                    ) : (
                        /* Segment rendering */
                        data.map((item, idx) => {
                            if (item.value === 0) return null;

                            const percentage = item.value / total;
                            const strokeLength = percentage * circumference;
                            const strokeOffset = circumference - (accumulatedPercentage * circumference);
                            
                            accumulatedPercentage += percentage;

                            const isHovered = hoveredIndex === idx;

                            return (
                                <circle
                                    key={idx}
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    fill="transparent"
                                    stroke={item.color}
                                    strokeWidth={isHovered ? hoverStrokeWidth : strokeWidth}
                                    strokeDasharray={`${strokeLength} ${circumference}`}
                                    strokeDashoffset={strokeOffset}
                                    strokeLinecap="round"
                                    className="transition-all duration-300 ease-out cursor-pointer origin-center"
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        filter: isHovered ? 'drop-shadow(0px 4px 8px rgba(0,0,0,0.12))' : 'none'
                                    }}
                                />
                            );
                        })
                    )}
                </svg>

                {/* Center Content Text (Absolute Overlay) */}
                <div 
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none transition-all duration-200"
                >
                    {hoveredIndex === null ? (
                        <>
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total</span>
                            <span className="text-2xl font-black text-slate-800 leading-tight">
                                {total}
                            </span>
                            <span className="text-[9px] text-slate-400 font-semibold">Presensi</span>
                        </>
                    ) : (
                        <>
                            <span 
                                className="text-xs font-black uppercase tracking-wide transition-colors"
                                style={{ color: data[hoveredIndex].color }}
                            >
                                {data[hoveredIndex].label}
                            </span>
                            <span className="text-xl font-black text-slate-800 leading-none mt-1">
                                {data[hoveredIndex].value}
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold mt-0.5">
                                {total > 0 ? ((data[hoveredIndex].value / total) * 100).toFixed(1) : 0}%
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Legend Column */}
            <div className="flex-1 w-full max-w-[200px]">
                <div className="space-y-2.5">
                    {data.map((item, idx) => {
                        const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
                        const isHovered = hoveredIndex === idx;
                        
                        return (
                            <div 
                                key={idx}
                                className={`flex items-center justify-between p-2 rounded-xl border transition-all duration-150 cursor-pointer ${
                                    isHovered 
                                        ? 'bg-slate-50 border-slate-200 shadow-sm translate-x-1' 
                                        : 'bg-white border-transparent hover:bg-slate-50/50'
                                }`}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span 
                                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-white shadow-sm transition-transform"
                                        style={{ 
                                            backgroundColor: item.color,
                                            transform: isHovered ? 'scale(1.2)' : 'none'
                                        }}
                                    />
                                    <span className={`text-xs font-bold truncate ${isHovered ? 'text-slate-800' : 'text-slate-600'}`}>
                                        {item.label}
                                    </span>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-xs font-bold text-slate-800 mr-1.5">{item.value}</span>
                                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                        {percentage}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
