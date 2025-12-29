'use client';

import { formatRupiah, formatXAUT } from '@/lib/utils/format';
import { Loader2 } from 'lucide-react';

interface GoldBalanceCardProps {
    balance: bigint;
    balanceValue: bigint;
    maxLoan: bigint;
    xautPrice: bigint;
    isLoading?: boolean;
}

export function GoldBalanceCard({
    balance,
    balanceValue,
    maxLoan,
    xautPrice,
    isLoading
}: GoldBalanceCardProps) {
    if (isLoading) {
        return (
            <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                🥇 YOUR GOLD
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Jumlah */}
                <div className="p-4 rounded-xl bg-black/40 border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">Amount</p>
                    <p className="text-white font-bold text-xl">{formatXAUT(balance)} XAUT</p>
                </div>

                {/* Nilai */}
                <div className="p-4 rounded-xl bg-black/40 border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">Value</p>
                    <p className="text-white font-bold text-xl">{formatRupiah(balanceValue)}</p>
                </div>
            </div>

            {/* Max Loan Info */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30">
                <p className="text-white/90 text-sm">
                    💡 <span className="font-semibold">You can borrow up to:</span>{' '}
                    <span className="text-yellow-400 font-bold">{formatRupiah(maxLoan)}</span>
                </p>
                <p className="text-white/50 text-xs mt-1">
                    Based on your gold balance
                </p>
            </div>
        </div>
    );
}
