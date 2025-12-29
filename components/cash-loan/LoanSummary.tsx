'use client';

import { formatRupiah, formatXAUT } from '@/lib/utils/format';
import { type LoanCalculation } from '@/lib/utils/loanCalculations';
import { getBankById } from '@/lib/config/banks';
import { Loader2 } from 'lucide-react';

interface LoanSummaryProps {
    calculation: LoanCalculation;
    bankId: string;
    accountNumber: string;
    xautPrice: bigint;
    isLoading?: boolean;
}

export function LoanSummary({
    calculation,
    bankId,
    accountNumber,
    xautPrice,
    isLoading
}: LoanSummaryProps) {
    const bank = getBankById(bankId);

    if (isLoading) {
        return (
            <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
            </div>
        );
    }

    if (calculation.loanAmount === 0n) {
        return (
            <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 text-center">
                <p className="text-white/60">
                    Enter loan amount to see summary
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30">
            <h3 className="text-lg font-semibold text-white mb-4">📋 LOAN SUMMARY</h3>

            <div className="h-px bg-yellow-500/20 mb-4" />

            <div className="space-y-3">
                {/* Loan Amount */}
                <div className="flex items-center justify-between">
                    <span className="text-white/70">Loan amount</span>
                    <span className="text-white font-semibold">{formatRupiah(calculation.loanAmount)}</span>
                </div>

                {/* Gold Collateral */}
                <div className="flex items-center justify-between">
                    <span className="text-white/70">Gold collateral</span>
                    <div className="text-right">
                        <p className="text-yellow-500 font-bold">{formatXAUT(calculation.collateralRequired)} XAUT</p>
                        <p className="text-white/60 text-sm">(~{formatRupiah(calculation.collateralValue)})</p>
                    </div>
                </div>

                {/* Service Fee */}
                <div className="flex items-center justify-between">
                    <span className="text-white/70">Service fee (0.5%)</span>
                    <span className="text-white/90">{formatRupiah(calculation.fee)}</span>
                </div>

                <div className="h-px bg-yellow-500/20" />

                {/* Amount Received */}
                <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">✨ You will receive</span>
                    <span className="text-green-500 font-bold text-lg">{formatRupiah(calculation.amountReceived)}</span>
                </div>

                {/* Transfer To */}
                {bank && accountNumber && (
                    <div className="flex items-center justify-between">
                        <span className="text-white/70">Transfer to</span>
                        <span className="text-white/90 font-semibold">{bank.shortName} - {accountNumber}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
