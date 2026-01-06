'use client';

import { Button } from '@/components/ui/button';
import { BankSelector } from './BankSelector';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { formatRupiah } from '@/lib/utils/format';

interface BankDetailsStepProps {
    // Bank details
    selectedBank: string;
    onBankChange: (bankId: string) => void;
    accountNumber: string;
    onAccountNumberChange: (value: string) => void;
    accountName: string;
    onAccountNameChange: (value: string) => void;

    // Loan summary from Step 1
    loanAmount: bigint;
    amountReceived: bigint;

    // Navigation
    onBack: () => void;
    onSubmit: () => void;

    // State
    isProcessing?: boolean;
    disabled?: boolean;
}

export function BankDetailsStep({
    selectedBank,
    onBankChange,
    accountNumber,
    onAccountNumberChange,
    accountName,
    onAccountNameChange,
    loanAmount,
    amountReceived,
    onBack,
    onSubmit,
    isProcessing,
    disabled,
}: BankDetailsStepProps) {
    const isFormValid =
        selectedBank !== '' &&
        accountNumber.length >= 10 &&
        accountNumber.length <= 12 &&
        accountName.trim() !== '';

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Loan Summary Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border-2 border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-white/70 text-sm">Loan Approved</p>
                    <span className="text-green-500 text-2xl">✓</span>
                </div>
                <p className="text-white text-3xl font-bold">{formatRupiah(amountReceived)}</p>
                <p className="text-white/50 text-sm mt-1">
                    Will be transferred to your bank account
                </p>
            </div>

            {/* Bank Selector */}
            <BankSelector
                selectedBank={selectedBank}
                onBankChange={onBankChange}
                accountNumber={accountNumber}
                onAccountNumberChange={onAccountNumberChange}
                accountName={accountName}
                onAccountNameChange={onAccountNameChange}
                disabled={disabled || isProcessing}
            />

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-400 text-sm">
                    💡 <span className="font-semibold">Next Step:</span> After submitting, you'll be able to redeem your IDRX to IDR and receive the cash in your bank account.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <Button
                    onClick={onBack}
                    disabled={disabled || isProcessing}
                    variant="outline"
                    className="flex-1 h-14 bg-zinc-900 border-yellow-500/30 hover:bg-yellow-500/10 text-white font-semibold"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!isFormValid || disabled || isProcessing}
                    className="flex-[2] h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold text-lg shadow-lg shadow-yellow-500/20 transition-all hover:shadow-yellow-500/40 disabled:opacity-50"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        '🚀 Submit & Redeem'
                    )}
                </Button>
            </div>

            <p className="text-center text-sm text-white/60">
                ⓘ Your gold collateral is already secured. This step is for receiving your cash.
            </p>
        </div>
    );
}
