// Component: RedeemModal
// Modal for redeeming IDRX to bank account

'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRedeemSelfService } from '@/hooks/useRedeemSelfService';
import { useRedeemTreasuryAssisted } from '@/hooks/useRedeemTreasuryAssisted';
import { useBackendHealth } from '@/hooks/useBackendHealth';
import { formatRupiah, parseRupiahInput } from '@/lib/utils/format';
import { BANK_CODES, BANK_NAMES } from '@/lib/idrx/types';
import { Loader2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface RedeemModalProps {
    isOpen: boolean;
    onClose: () => void;
    idrxBalance: bigint;
    bankDetails?: {
        bank: string;
        accountNumber: string;
        accountName: string;
    };
    txHash?: string;
    prefilledAmount?: bigint; // Amount from wizard (in IDRX units)
}

type RedeemMode = 'self-service' | 'treasury-assisted';
type Step = 'select-mode' | 'enter-amount' | 'confirm' | 'processing' | 'success' | 'error';

const SELF_SERVICE_LIMIT = 250_000_000n * BigInt(1e6); // 250M IDR in IDRX units

export function RedeemModal({
    isOpen,
    onClose,
    idrxBalance,
    bankDetails,
    txHash,
    prefilledAmount,
}: RedeemModalProps) {
    const { address } = useAccount();
    const { isDemoMode } = useBackendHealth();
    const selfService = useRedeemSelfService();
    const treasury = useRedeemTreasuryAssisted();

    const [step, setStep] = useState<Step>('select-mode');
    const [mode, setMode] = useState<RedeemMode>('self-service');
    const [amountInput, setAmountInput] = useState('');
    const [custRefNumber, setCustRefNumber] = useState('');

    // Use prefilled amount if available, otherwise parse from input
    const amount = prefilledAmount || (amountInput ? parseRupiahInput(amountInput) : 0n);
    const isSelfServiceEligible = amount <= SELF_SERVICE_LIMIT;

    // Auto-skip to confirm step when prefilledAmount is provided
    useEffect(() => {
        if (isOpen && prefilledAmount) {
            // Auto-determine mode based on amount
            const autoMode: RedeemMode = prefilledAmount > SELF_SERVICE_LIMIT
                ? 'treasury-assisted'
                : 'self-service';
            setMode(autoMode);
            setStep('confirm');
        } else if (isOpen && !prefilledAmount) {
            // Reset to select mode if no prefilled amount
            setStep('select-mode');
            setMode('self-service');
        }
    }, [isOpen, prefilledAmount]);

    const handleModeSelect = (selectedMode: RedeemMode) => {
        setMode(selectedMode);
        setStep('enter-amount');
    };

    const handleAmountContinue = () => {
        if (amount <= 0n || amount > idrxBalance) {
            return;
        }

        // Auto-select mode based on amount
        if (amount > SELF_SERVICE_LIMIT) {
            setMode('treasury-assisted');
        }

        setStep('confirm');
    };

    const handleSubmit = async () => {
        if (!address || !bankDetails) return;

        setStep('processing');

        try {
            const bankCode = BANK_CODES[bankDetails.bank] || '014';
            const bankName = BANK_NAMES[bankDetails.bank] || 'BANK CENTRAL ASIA';

            if (mode === 'self-service') {
                const result = await selfService.submitRedeem({
                    txHash: txHash || '0x0000000000000000000000000000000000000000000000000000000000000000',
                    amount: (Number(amount) / 1e6).toString(),
                    bankAccount: bankDetails.accountNumber,
                    bankCode,
                    bankName,
                    bankAccountName: bankDetails.accountName,
                    walletAddress: address,
                });

                if (result.success && result.data) {
                    setCustRefNumber(result.data.custRefNumber);
                    setStep('success');
                }
            } else {
                const result = await treasury.submitTreasuryRedeem({
                    amount: (Number(amount) / 1e6).toString(),
                    bankAccount: bankDetails.accountNumber,
                    bankCode,
                    bankName,
                    bankAccountName: bankDetails.accountName,
                    walletAddress: address,
                });

                if (result.success) {
                    setStep('success');
                }
            }
        } catch (error: any) {
            console.error('Redeem error:', error);
            setStep('error');
        }
    };

    const handleClose = () => {
        setStep('select-mode');
        setMode('self-service');
        setAmountInput('');
        setCustRefNumber('');
        selfService.reset();
        treasury.reset();
        onClose();
    };

    const renderContent = () => {
        switch (step) {
            case 'select-mode':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Select Redeem Mode</h2>
                            <p className="text-white/70">Choose how you want to redeem your IDRX</p>
                        </div>

                        <div className="space-y-3">
                            {/* Self-Service */}
                            <button
                                onClick={() => handleModeSelect('self-service')}
                                className="w-full p-6 rounded-xl bg-zinc-800/50 border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all text-left group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-2">
                                            ⚡ Self-Service Redeem
                                        </h3>
                                        <p className="text-white/70 text-sm mb-3">
                                            Instant processing for amounts ≤ 250M IDR
                                        </p>
                                        <div className="flex items-center gap-2 text-green-400 text-sm">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Processed immediately</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>

                            {/* Treasury-Assisted */}
                            <button
                                onClick={() => handleModeSelect('treasury-assisted')}
                                className="w-full p-6 rounded-xl bg-zinc-800/50 border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all text-left group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-2">
                                            🏦 Treasury-Assisted
                                        </h3>
                                        <p className="text-white/70 text-sm mb-3">
                                            For large amounts &gt; 250M IDR
                                        </p>
                                        <div className="flex items-center gap-2 text-yellow-400 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>Processed within 24 hours</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        </div>
                    </div>
                );

            case 'enter-amount':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Enter Amount</h2>
                            <p className="text-white/70">How much IDRX do you want to redeem?</p>
                        </div>

                        {/* Balance */}
                        <div className="p-4 rounded-xl bg-zinc-800/50 border border-yellow-500/30">
                            <p className="text-white/70 text-sm mb-1">Available IDRX Balance</p>
                            <p className="text-2xl font-bold text-yellow-500">
                                {formatRupiah(idrxBalance)}
                            </p>
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="text-white/70 text-sm mb-2 block">Redeem Amount</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg font-semibold">
                                    Rp
                                </div>
                                <input
                                    type="text"
                                    value={amountInput ? Number(amountInput).toLocaleString('id-ID') : ''}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/[^\d]/g, '');
                                        setAmountInput(rawValue);
                                    }}
                                    placeholder="0"
                                    className="w-full h-14 pl-14 pr-4 rounded-xl bg-zinc-800/50 border-2 border-yellow-500/30 focus:border-yellow-500 text-white text-lg text-right font-semibold outline-none"
                                />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => setAmountInput(formatRupiah(idrxBalance / 4n).replace(/[^\d]/g, ''))}
                                    className="px-3 py-1 rounded-lg bg-zinc-800 border border-yellow-500/30 text-white/70 text-sm hover:bg-zinc-700"
                                >
                                    25%
                                </button>
                                <button
                                    onClick={() => setAmountInput(formatRupiah(idrxBalance / 2n).replace(/[^\d]/g, ''))}
                                    className="px-3 py-1 rounded-lg bg-zinc-800 border border-yellow-500/30 text-white/70 text-sm hover:bg-zinc-700"
                                >
                                    50%
                                </button>
                                <button
                                    onClick={() => setAmountInput(formatRupiah(idrxBalance).replace(/[^\d]/g, ''))}
                                    className="px-3 py-1 rounded-lg bg-zinc-800 border border-yellow-500/30 text-white/70 text-sm hover:bg-zinc-700"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>

                        {/* Warning for large amounts */}
                        {amount > SELF_SERVICE_LIMIT && (
                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-yellow-400 font-semibold text-sm">
                                            Amount exceeds self-service limit
                                        </p>
                                        <p className="text-white/70 text-sm mt-1">
                                            This will be processed via Treasury-Assisted mode (24h processing time)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Button
                                onClick={() => setStep('select-mode')}
                                variant="outline"
                                className="flex-1 h-12 bg-zinc-900 border-yellow-500/30 text-white hover:bg-zinc-800"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleAmountContinue}
                                disabled={amount <= 0n || amount > idrxBalance}
                                className="flex-1 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                );

            case 'confirm':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Confirm Redeem</h2>
                            <p className="text-white/70">Please review your redeem request</p>
                        </div>

                        {isDemoMode && (
                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                                <p className="text-yellow-400 text-sm text-center">
                                    🎭 Demo Mode - No real transaction will be processed
                                </p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-white/70">Mode</span>
                                <span className="text-white font-semibold">
                                    {mode === 'self-service' ? '⚡ Self-Service' : '🏦 Treasury-Assisted'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Amount</span>
                                <span className="text-yellow-500 font-bold text-lg">
                                    {formatRupiah(amount)}
                                </span>
                            </div>
                            <div className="h-px bg-yellow-500/20" />
                            <div className="flex justify-between">
                                <span className="text-white/70">Bank</span>
                                <span className="text-white">{BANK_NAMES[bankDetails?.bank || 'bca']}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Account</span>
                                <span className="text-white">{bankDetails?.accountNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Name</span>
                                <span className="text-white">{bankDetails?.accountName}</span>
                            </div>
                            <div className="h-px bg-yellow-500/20" />
                            <div className="flex justify-between">
                                <span className="text-white/70">Processing Time</span>
                                <span className="text-white">
                                    {mode === 'self-service' ? 'Instant' : '24 hours'}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => {
                                    // If amount is prefilled from wizard, close modal instead of going back
                                    if (prefilledAmount) {
                                        handleClose();
                                    } else {
                                        setStep('enter-amount');
                                    }
                                }}
                                variant="outline"
                                className="flex-1 h-12 bg-zinc-900 border-yellow-500/30 text-white hover:bg-zinc-800"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="flex-1 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold"
                            >
                                Confirm Redeem
                            </Button>
                        </div>
                    </div>
                );

            case 'processing':
                return (
                    <div className="space-y-6 py-8 text-center">
                        <Loader2 className="w-16 h-16 text-yellow-500 mx-auto animate-spin" />
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Processing...</h2>
                            <p className="text-white/70">Please wait while we process your redeem request</p>
                        </div>
                    </div>
                );

            case 'success':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">Redeem Successful!</h2>
                            <p className="text-white/70">Your redeem request has been submitted</p>
                        </div>

                        {custRefNumber && (
                            <div className="p-4 rounded-xl bg-zinc-800/50 border border-yellow-500/30">
                                <p className="text-white/70 text-sm mb-1">Reference Number</p>
                                <p className="text-yellow-500 font-mono font-bold">{custRefNumber}</p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-white/70">Amount</span>
                                <span className="text-white font-bold">{formatRupiah(amount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Bank Account</span>
                                <span className="text-white">{bankDetails?.accountNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Processing Time</span>
                                <span className="text-white">
                                    {mode === 'self-service' ? '1-2 business days' : '24 hours'}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                            <p className="text-green-400 text-sm text-center">
                                ✅ IDR will be transferred to your bank account soon
                            </p>
                        </div>

                        <Button
                            onClick={handleClose}
                            className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold"
                        >
                            Done
                        </Button>
                    </div>
                );

            case 'error':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">Redeem Failed</h2>
                            <p className="text-white/70">
                                {selfService.error || treasury.error || 'An error occurred'}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => setStep('confirm')}
                                variant="outline"
                                className="flex-1 h-12 bg-zinc-900 border-yellow-500/30 text-white hover:bg-zinc-800"
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={handleClose}
                                className="flex-1 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-zinc-900 border-2 border-yellow-500/30 text-white max-w-md">
                <DialogTitle className="sr-only">Redeem IDRX</DialogTitle>
                <div className="py-4">{renderContent()}</div>
            </DialogContent>
        </Dialog>
    );
}
