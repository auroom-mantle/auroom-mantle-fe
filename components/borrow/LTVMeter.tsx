'use client';

import { formatLTV, getLTVBgColor } from '@/lib/utils/borrow';

interface LTVMeterProps {
    currentLTV: number; // basis points
    maxLTV?: number; // default 7500
    warningLTV?: number; // default 8000
    liquidationLTV?: number; // default 9000
}

export function LTVMeter({
    currentLTV,
    maxLTV = 7500,
    warningLTV = 8000,
    liquidationLTV = 9000
}: LTVMeterProps) {
    const percentage = (currentLTV / 100); // Convert basis points to percentage
    const maxPercentage = (liquidationLTV / 100);
    const fillPercentage = Math.min((percentage / maxPercentage) * 100, 100);

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Loan-to-Value (LTV)</span>
                <span className={`text-lg font-bold ${getLTVBgColor(currentLTV).replace('bg-', 'text-')}`}>
                    {formatLTV(currentLTV)}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ${getLTVBgColor(currentLTV)}`}
                    style={{ width: `${fillPercentage}%` }}
                />
            </div>

            {/* Threshold Markers - Simplified for mobile */}
            <div className="relative h-8">
                {/* 0% */}
                <div className="absolute left-0 flex flex-col items-start">
                    <div className="w-px h-2 bg-white/40" />
                    <span className="text-[10px] text-white/40 mt-1">0%</span>
                </div>

                {/* Max LTV (75%) - Hidden on small screens */}
                <div
                    className="absolute hidden sm:flex flex-col items-center -translate-x-1/2"
                    style={{ left: `${(maxLTV / liquidationLTV) * 100}%` }}
                >
                    <div className="w-px h-2 bg-yellow-500" />
                    <span className="text-[10px] text-yellow-500 mt-1 whitespace-nowrap">
                        75% Max
                    </span>
                </div>

                {/* Warning LTV (80%) - Hidden on small screens */}
                <div
                    className="absolute hidden md:flex flex-col items-center -translate-x-1/2"
                    style={{ left: `${(warningLTV / liquidationLTV) * 100}%` }}
                >
                    <div className="w-px h-2 bg-orange-500" />
                    <span className="text-[10px] text-orange-500 mt-1 whitespace-nowrap">
                        80% Warn
                    </span>
                </div>

                {/* Liquidation LTV (90%) */}
                <div className="absolute right-0 flex flex-col items-end">
                    <div className="w-px h-2 bg-red-500" />
                    <span className="text-[10px] text-red-500 mt-1 whitespace-nowrap">
                        90% Liq
                    </span>
                </div>
            </div>

            {/* Legend for mobile - shows all thresholds */}
            <div className="sm:hidden grid grid-cols-3 gap-2 text-[10px] pt-2 border-t border-white/10">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-yellow-500">75% Max</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-orange-500">80% Warn</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-red-500">90% Liq</span>
                </div>
            </div>
        </div>
    );
}
