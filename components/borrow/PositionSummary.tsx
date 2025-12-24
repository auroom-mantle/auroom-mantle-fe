'use client';

import { formatIDR, formatXAUT } from '@/lib/utils/borrow';
import { LTVMeter } from './LTVMeter';

interface PositionSummaryProps {
    collateralBalance: bigint;
    collateralValue: bigint;
    debtBalance: bigint;
    maxBorrow: bigint;
    ltv: bigint;
    isAtRisk: boolean;
    isLoading: boolean;
}

export function PositionSummary({
    collateralBalance,
    collateralValue,
    debtBalance,
    maxBorrow,
    ltv,
    isAtRisk,
    isLoading,
}: PositionSummaryProps) {
    if (isLoading) {
        return (
            <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 backdrop-blur-xl">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-white/10 rounded w-1/3" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-20 bg-white/10 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Your Position</h2>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isAtRisk ? 'bg-red-500' : 'bg-green-500'}`} />
                    <span className={`text-sm font-medium ${isAtRisk ? 'text-red-500' : 'text-green-500'}`}>
                        {isAtRisk ? 'At Risk' : 'Healthy'}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-black/50 border border-white/10 rounded-lg">
                    <p className="text-xs text-white/60 mb-1">Collateral</p>
                    <p className="text-lg font-bold text-white">
                        {formatXAUT(collateralBalance)} XAUT
                    </p>
                </div>

                <div className="p-4 bg-black/50 border border-white/10 rounded-lg">
                    <p className="text-xs text-white/60 mb-1">Collateral Value</p>
                    <p className="text-lg font-bold text-white">
                        {formatIDR(collateralValue, 6)}
                    </p>
                </div>

                <div className="p-4 bg-black/50 border border-white/10 rounded-lg">
                    <p className="text-xs text-white/60 mb-1">Debt</p>
                    <p className="text-lg font-bold text-white">
                        {formatIDR(debtBalance, 6)}
                    </p>
                </div>

                <div className="p-4 bg-black/50 border border-white/10 rounded-lg">
                    <p className="text-xs text-white/60 mb-1">Available to Borrow</p>
                    <p className="text-lg font-bold text-yellow-400">
                        {formatIDR(maxBorrow, 6)}
                    </p>
                </div>
            </div>

            {/* LTV Meter */}
            <LTVMeter currentLTV={Number(ltv)} />
        </div>
    );
}
