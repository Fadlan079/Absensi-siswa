import React from 'react';

export default function HorizontalBarChart({ data = [] }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-48 bg-slate-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm font-medium">Tidak ada data untuk dibandingkan</p>
            </div>
        );
    }

    // Limit to top 8 classes for clear visualization
    const displayData = data.slice(0, 8);

    return (
        <div className="space-y-4 w-full">
            {displayData.map((item, idx) => {
                const isTopThree = idx < 3;
                const valueColor = item.persen >= 85 
                    ? 'text-success' 
                    : item.persen >= 70 
                        ? 'text-warning' 
                        : 'text-danger';

                const barColor = item.persen >= 85 
                    ? 'bg-success' 
                    : item.persen >= 70 
                        ? 'bg-warning' 
                        : 'bg-danger';

                return (
                    <div key={idx} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                            <div className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                                    idx === 0 
                                        ? 'bg-amber-100 text-amber-700 border border-amber-300' 
                                        : idx === 1 
                                            ? 'bg-slate-100 text-slate-700 border border-slate-300' 
                                            : idx === 2 
                                                ? 'bg-orange-100 text-orange-700 border border-orange-300' 
                                                : 'bg-slate-50 text-slate-500 border border-slate-200'
                                }`}>
                                    {idx + 1}
                                </span>
                                <span className="truncate max-w-[150px]">{item.kelas}</span>
                            </div>
                            <span className={valueColor}>{item.persen}%</span>
                        </div>
                        <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`} 
                                style={{ width: `${item.persen}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
