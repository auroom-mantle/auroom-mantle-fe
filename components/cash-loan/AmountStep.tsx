'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GoldBalanceCard } from './GoldBalanceCard';
import { LoanAmountInput } from './LoanAmountInput';
import { LTVSelector } from './LTVSelector';
import { LoanSummary } from './LoanSummary';
import { Loader2, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatRupiah } from '@/lib/utils/format';

interface AmountStepProps {
    // Gold data
    goldBalance: bigint;
    goldValue: bigint;
    goldPrice: bigint;
    goldLoading: boolean;

    // Loan input
    loanInput: string;
    onLoanInputChange: (value: string) => void;

    // LTV
    selectedLTV: number;
    onLTVChange: (ltv: number) => void;

    // Calculation
    calculation: {
        loanAmount: bigint;
        collateralRequired: bigint;
        collateralValue: bigint;
        fee: bigint;
        amountReceived: bigint;
        maxLoan: bigint;
        isValid: boolean;
        errorMessage?: string;
    };

    // Approval
    needsApproval: boolean;
    onApprove: () => void;
    approvalPending: boolean;
    approvalConfirming: boolean;

    // Continue
    onContinue: () => void;
    continuePending: boolean;
    continueConfirming: boolean;

    // Disabled state
    disabled?: boolean;
}

export function AmountStep({
    goldBalance,
    goldValue,
    goldPrice,
    goldLoading,
    loanInput,
    onLoanInputChange,
    selectedLTV,
    onLTVChange,
    calculation,
    needsApproval,
    onApprove,
    approvalPending,
    approvalConfirming,
    onContinue,
    continuePending,
    continueConfirming,
    disabled,
}: AmountStepProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const loanAmount = loanInput ? BigInt(loanInput) * BigInt(1e6) : 0n;
    const isFormValid = loanAmount > 0n && calculation.isValid;
    const isProcessing = approvalPending || approvalConfirming || continuePending || continueConfirming;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Gold Balance Card */}
            <GoldBalanceCard
                balance={goldBalance}
                balanceValue={goldValue}
                maxLoan={calculation.maxLoan}
                xautPrice={goldPrice}
                isLoading={goldLoading}
            />

            {/* Loan Amount Input */}
            <LoanAmountInput
                value={loanInput}
                onChange={onLoanInputChange}
                maxLoan={calculation.maxLoan}
                disabled={disabled || isProcessing}
            />

            {/* Advanced Settings - Collapsible */}
            <div className="rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 overflow-hidden transition-all duration-300">
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    disabled={disabled || isProcessing}
                    className={cn(
                        "w-full p-4 flex items-center justify-between",
                        "hover:bg-yellow-500/5 transition-colors",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-yellow-500" />
                        <div className="text-left">
                            <p className="text-white font-semibold">Advanced Settings</p>
                            <p className="text-white/50 text-sm">
                                {showAdvanced
                                    ? 'Customize your loan safety level'
                                    : `Using recommended ${selectedLTV}% safety level`
                                }
                            </p>
                        </div>
                    </div>
                    {showAdvanced ? (
                        <ChevronUp className="w-5 h-5 text-white/50" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-white/50" />
                    )}
                </button>

                {/* Collapsible Content */}
                <div
                    className={cn(
                        "transition-all duration-300 ease-in-out overflow-hidden",
                        showAdvanced ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div className="p-4 pt-0 border-t border-yellow-500/20">
                        <LTVSelector
                            selectedLTV={selectedLTV}
                            onLTVChange={onLTVChange}
                            disabled={disabled || isProcessing}
                        />
                    </div>
                </div>
            </div>

            {/* Loan Summary */}
            <LoanSummary
                calculation={calculation}
                bankId=""
                accountNumber=""
                xautPrice={goldPrice}
            />

            {/* Error Message */}
            {calculation.errorMessage && loanAmount > 0n && (
                <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-red-400 text-center font-semibold">
                        ⚠️ {calculation.errorMessage}
                    </p>
                </div>
            )}

            {/* Action Button */}
            <div className="space-y-3">
                {needsApproval ? (
                    <Button
                        onClick={onApprove}
                        disabled={disabled || approvalPending || approvalConfirming}
                        className="w-full h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold text-lg shadow-lg shadow-yellow-500/20 transition-all hover:shadow-yellow-500/40"
                    >
                        {approvalPending || approvalConfirming ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                {approvalPending ? 'Approving Gold Access...' : 'Confirming Approval...'}
                            </>
                        ) : (
                            '🔓 Approve Gold Access'
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={onContinue}
                        disabled={!isFormValid || disabled || continuePending || continueConfirming}
                        className="w-full h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold text-xl shadow-lg shadow-yellow-500/20 transition-all hover:shadow-yellow-500/40 disabled:opacity-50"
                    >
                        {continuePending || continueConfirming ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                {continuePending ? 'Securing Gold...' : 'Confirming Transaction...'}
                            </>
                        ) : (
                            <>💸 Continue - Get {formatRupiah(calculation.amountReceived)}</>
                        )}
                    </Button>
                )}

                <p className="text-center text-sm text-white/60">
                    {needsApproval
                        ? '🔒 First, we need permission to secure your gold as collateral'
                        : 'ⓘ Your gold will be secured automatically. You can repay anytime to get it back.'
                    }
                </p>
            </div>
        </div>
    );
}
