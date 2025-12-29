'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatRupiah, formatXAUT, formatInputValue } from '@/lib/utils/format';
import { Loader2 } from 'lucide-react';

interface RepayModalProps {
    isOpen: boolean;
    onClose: () => void;
    debt: bigint;
    collateral: bigint;
    idrxBalance: bigint;
    onRepay: (amount: bigint, isFullRepay: boolean) => void;
    isProcessing: boolean;
}

export function RepayModal({
    isOpen,
    onClose,
    debt,
    collateral,
    idrxBalance,
    onRepay,
    isProcessing,
}: RepayModalProps) {
    const [repayInput, setRepayInput] = useState('');

    const repayAmount = repayInput ? BigInt(repayInput) * BigInt(1e6) : 0n;
    const isFullRepay = repayAmount >= debt;
    const remainingDebt = isFullRepay ? 0n : debt - repayAmount;
    const collateralReturned = isFullRepay ? collateral : 0n;
    const hasSufficientBalance = idrxBalance >= repayAmount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        setRepayInput(rawValue);
    };

    const handleQuickAmount = (percentage: number) => {
        const amount = (Number(debt) * percentage) / (100 * 1e6);
        setRepayInput(amount.toString());
    };

    const handleFullRepay = () => {
        const amount = Number(debt) / 1e6;
        setRepayInput(amount.toString());
    };

    const handleRepay = () => {
        onRepay(repayAmount, isFullRepay);
    };

    const displayValue = repayInput ? formatInputValue(repayInput) : '';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-900 border-2 border-yellow-500/30 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">💳 REPAY LOAN</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="h-px bg-yellow-500/20" />

                    {/* Current Status */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Current debt</span>
                            <span className="text-white font-semibold">{formatRupiah(debt)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Gold collateral</span>
                            <span className="text-yellow-500 font-semibold">{formatXAUT(collateral)} XAUT</span>
                        </div>
                    </div>

                    <div className="h-px bg-yellow-500/20" />

                    {/* Input */}
                    <div>
                        <label className="text-white/70 text-sm mb-2 block">How much do you want to repay?</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg font-semibold">
                                Rp
                            </div>
                            <Input
                                type="text"
                                placeholder="0"
                                value={displayValue}
                                onChange={handleInputChange}
                                disabled={isProcessing}
                                className="bg-black/40 border-yellow-500/30 text-white text-2xl h-16 pl-14 pr-4 text-right font-bold"
                            />
                        </div>
                    </div>

                    {/* Quick Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickAmount(25)}
                            disabled={isProcessing}
                            className="border-yellow-500/30 hover:bg-yellow-500/10"
                        >
                            25%
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickAmount(50)}
                            disabled={isProcessing}
                            className="border-yellow-500/30 hover:bg-yellow-500/10"
                        >
                            50%
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickAmount(75)}
                            disabled={isProcessing}
                            className="border-yellow-500/30 hover:bg-yellow-500/10"
                        >
                            75%
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleFullRepay}
                            disabled={isProcessing}
                            className="border-yellow-500/30 hover:bg-yellow-500/10 font-bold"
                        >
                            FULL
                        </Button>
                    </div>

                    <div className="h-px bg-yellow-500/20" />

                    {/* Preview */}
                    {repayAmount > 0n && (
                        <div className="p-4 rounded-xl bg-black/40 border border-yellow-500/20 space-y-2">
                            <p className="text-white/70 text-sm font-semibold mb-2">After repayment:</p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/60">• Remaining debt:</span>
                                <span className="text-white font-semibold">{formatRupiah(remainingDebt)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/60">• Gold returned:</span>
                                <span className="text-yellow-500 font-semibold">{formatXAUT(collateralReturned)} XAUT</span>
                            </div>
                        </div>
                    )}

                    {/* Balance Check */}
                    <div className={`p-3 rounded-lg ${hasSufficientBalance ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70 text-sm">Your balance:</span>
                            <span className={`font-semibold ${hasSufficientBalance ? 'text-green-400' : 'text-red-400'}`}>
                                {formatRupiah(idrxBalance)} {hasSufficientBalance ? '✅ Sufficient' : '❌ Insufficient'}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button
                        onClick={handleRepay}
                        disabled={!hasSufficientBalance || repayAmount === 0n || isProcessing}
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            '💳 REPAY & WITHDRAW GOLD'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
