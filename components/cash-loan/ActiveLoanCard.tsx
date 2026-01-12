'use client';

import { formatRupiah, formatXAUT, getLoanStatus } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ActiveLoanCardProps {
    collateral: bigint;
    debt: bigint;
    collateralValue: bigint;
    ltv: bigint;
    onRepayClick: () => void;
    isLoading?: boolean;
}

export function ActiveLoanCard({
    collateral,
    debt,
    collateralValue,
    ltv,
    onRepayClick,
    isLoading,
}: ActiveLoanCardProps) {
    if (isLoading) {
        return (
            <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
            </div>
        );
    }

    const ltvBps = Number(ltv);
    const status = getLoanStatus(ltvBps);
    const ltvPercentage = ltvBps / 100;
    const capacityUsed = (ltvPercentage / 75) * 100; // 75% is max LTV

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30">
            <h3 className="text-lg font-semibold text-white mb-4">📊 ACTIVE LOAN</h3>

            <div className="space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {/* Gold Collateral */}
                    <div className="p-3 md:p-4 rounded-xl bg-black/40 border border-yellow-500/20">
                        <p className="text-white/60 text-xs mb-1">Gold Collateral</p>
                        <p className="text-yellow-500 font-bold text-sm md:text-lg break-all">{formatXAUT(collateral)}</p>
                        <p className="text-yellow-500 font-bold text-sm md:text-lg">XAUT</p>
                        <p className="text-white/50 text-xs mt-1 truncate">~{formatRupiah(collateralValue)}</p>
                    </div>

                    {/* Debt */}
                    <div className="p-3 md:p-4 rounded-xl bg-black/40 border border-yellow-500/20">
                        <p className="text-white/60 text-xs mb-1">Debt</p>
                        <p className="text-white font-bold text-sm md:text-lg break-all">{formatRupiah(debt)}</p>
                    </div>

                    {/* Status */}
                    <div className="p-3 md:p-4 rounded-xl bg-black/40 border border-yellow-500/20">
                        <p className="text-white/60 text-xs mb-1">Status</p>
                        <p className={`${status.color} font-bold text-sm md:text-lg`}>
                            {status.text === 'AMAN' && '✅ SAFE'}
                            {status.text === 'PERHATIAN' && '⚠️ WARNING'}
                            {status.text === 'BAHAYA' && '🚨 DANGER'}
                        </p>
                    </div>
                </div>

                {/* Capacity Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">Loan Capacity</span>
                        <span className="text-white/90 text-sm font-semibold">
                            {ltvPercentage.toFixed(0)}% used
                        </span>
                    </div>
                    <div className="h-3 bg-black/40 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all ${ltvPercentage <= 50
                                ? 'bg-green-500'
                                : ltvPercentage <= 75
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                            style={{ width: `${Math.min(capacityUsed, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Repay Button */}
                <Button
                    onClick={onRepayClick}
                    className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold"
                >
                    💳 REPAY LOAN
                </Button>

                {/* Info */}
                <p className="text-white/50 text-xs text-center">
                    ⓘ Repay your debt to withdraw your gold
                </p>
            </div>
        </div>
    );
}
