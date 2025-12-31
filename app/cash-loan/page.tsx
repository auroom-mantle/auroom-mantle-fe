'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { GoldBalanceCard } from '@/components/cash-loan/GoldBalanceCard';
import { LoanAmountInput } from '@/components/cash-loan/LoanAmountInput';
import { BankSelector } from '@/components/cash-loan/BankSelector';
import { LoanSummary } from '@/components/cash-loan/LoanSummary';
import { ActiveLoanCard } from '@/components/cash-loan/ActiveLoanCard';
import { RepayModal } from '@/components/cash-loan/RepayModal';
import { ProcessingOverlay } from '@/components/cash-loan/ProcessingOverlay';
import { SuccessModal } from '@/components/cash-loan/SuccessModal';
import { LTVSelector } from '@/components/cash-loan/LTVSelector';
import { ProgressSteps } from '@/components/cash-loan/ProgressSteps';
import {
    useGoldBalance,
    useGoldPrice,
    useActiveLoan,
    useIDRXBalance,
    useLoanCalculation,
    useXAUTApproval,
    useIDRXApproval,
    useBorrow,
    useRepay,
} from '@/hooks/useLoan';
import { parseRupiahInput, formatRupiah } from '@/lib/utils/format';
import { type LoanFlowState, generateReferenceNumber } from '@/lib/utils/loanFlow';
import { Loader2 } from 'lucide-react';

export default function CashLoanPage() {
    const { address, isConnected } = useAccount();

    // State
    const [loanInput, setLoanInput] = useState('');
    const [selectedBank, setSelectedBank] = useState('bca');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [selectedLTV, setSelectedLTV] = useState(30); // Default 30%
    const [showRepayModal, setShowRepayModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successData, setSuccessData] = useState<any>({});
    const [flowState, setFlowState] = useState<LoanFlowState>({ step: 'idle', message: '' });

    // Hooks
    const { balance: goldBalance, isLoading: goldLoading } = useGoldBalance();
    const { price: goldPrice, isLoading: priceLoading } = useGoldPrice();
    const activeLoan = useActiveLoan();
    const { balance: idrxBalance } = useIDRXBalance();

    // Parse loan amount
    const loanAmount = loanInput ? parseRupiahInput(loanInput) : 0n;
    const ltvBps = selectedLTV * 100; // Convert percentage to basis points
    const calculation = useLoanCalculation(loanAmount, ltvBps);

    // Calculate gold value
    const goldValue = (goldBalance * goldPrice) / BigInt(1e8);

    // Approvals
    const xautApproval = useXAUTApproval();
    const idrxApproval = useIDRXApproval();

    // Transactions
    const borrow = useBorrow();
    const repay = useRepay();

    // Check if form is valid
    const isFormValid =
        loanAmount > 0n &&
        calculation.isValid &&
        selectedBank !== '' &&
        accountNumber !== '' &&
        accountName !== '';

    const needsApproval = xautApproval.allowance < calculation.collateralRequired;

    // Calculate current step for progress indicator
    const getCurrentStep = () => {
        if (!loanInput || loanAmount === 0n) return 1; // Need to enter amount
        if (selectedBank === '' || accountNumber === '' || accountName === '') return 3; // Need bank details
        if (!calculation.isValid) return 4; // Ready to review
        return 4; // All filled, ready to submit
    };

    const currentStep = getCurrentStep();

    // Handle approve
    const handleApprove = () => {
        xautApproval.approve(BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'));
    };

    // Handle borrow
    const handleBorrow = () => {
        setFlowState({ step: 'borrowing', message: 'Securing gold collateral...' });
        borrow.execute(calculation.collateralRequired, loanAmount);
    };

    // Handle repay
    const handleRepay = (amount: bigint, isFullRepay: boolean) => {
        setFlowState({ step: 'borrowing', message: 'Repaying loan...' });
        // If full repay, withdraw all collateral. Otherwise, no withdrawal
        const withdrawAmount = isFullRepay ? activeLoan.collateral : 0n;
        repay.execute(amount, withdrawAmount);
    };

    // Refetch allowance after approval
    useEffect(() => {
        if (xautApproval.isSuccess) {
            xautApproval.refetchAllowance();
        }
    }, [xautApproval.isSuccess]);

    // Handle borrow success
    useEffect(() => {
        if (borrow.isSuccess) {
            const referenceNumber = generateReferenceNumber();
            setSuccessData({
                loanAmount,
                collateral: calculation.collateralRequired,
                fee: calculation.fee,
                amountReceived: calculation.amountReceived,
                bankId: selectedBank,
                accountNumber,
                accountName,
                referenceNumber,
                txHash: borrow.hash,
            });
            setFlowState({ step: 'success', message: 'Loan successful!' });
            setShowSuccessModal(true);
            setLoanInput('');
            setAccountNumber('');
            setAccountName('');
            borrow.reset();
            activeLoan.refetch();
        }
    }, [borrow.isSuccess]);

    // Handle repay success
    useEffect(() => {
        if (repay.isSuccess) {
            setSuccessData({
                loanAmount: activeLoan.debt,
                collateral: activeLoan.collateral,
            });
            setFlowState({ step: 'success', message: 'Repayment successful!' });
            setShowSuccessModal(true);
            setShowRepayModal(false);
            repay.reset();
            activeLoan.refetch();
        }
    }, [repay.isSuccess]);

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-black py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">💰 INSTANT CASH LOAN</h1>
                    <p className="text-white/70 text-lg mb-8">
                        Secure your gold, receive cash to your bank account
                    </p>
                    <p className="text-white/60">
                        Please connect your wallet to continue
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
                        <span className="text-5xl">💰</span>
                        INSTANT CASH LOAN
                    </h1>
                    <p className="text-white/70 text-lg">
                        Secure your digital gold, receive cash to your bank account
                    </p>
                    <p className="text-white/50 text-sm">
                        ✨ Like a pawn shop, but digital and faster
                    </p>
                </div>

                {/* Progress Steps */}
                <ProgressSteps currentStep={currentStep} />

                {/* Active Loan Card */}
                {activeLoan.hasActiveLoan && (
                    <ActiveLoanCard
                        collateral={activeLoan.collateral}
                        debt={activeLoan.debt}
                        collateralValue={activeLoan.collateralValue}
                        ltv={activeLoan.ltv}
                        onRepayClick={() => setShowRepayModal(true)}
                        isLoading={activeLoan.isLoading}
                    />
                )}

                {/* Gold Balance Card */}
                <GoldBalanceCard
                    balance={goldBalance}
                    balanceValue={goldValue}
                    maxLoan={calculation.maxLoan}
                    xautPrice={goldPrice}
                    isLoading={goldLoading || priceLoading}
                />

                {/* Loan Amount Input */}
                <LoanAmountInput
                    value={loanInput}
                    onChange={setLoanInput}
                    maxLoan={calculation.maxLoan}
                    disabled={borrow.isPending || borrow.isConfirming}
                />

                {/* LTV Selector */}
                <LTVSelector
                    selectedLTV={selectedLTV}
                    onLTVChange={setSelectedLTV}
                    disabled={borrow.isPending || borrow.isConfirming}
                />

                {/* Bank Selector */}
                <BankSelector
                    selectedBank={selectedBank}
                    onBankChange={setSelectedBank}
                    accountNumber={accountNumber}
                    onAccountNumberChange={setAccountNumber}
                    accountName={accountName}
                    onAccountNameChange={setAccountName}
                    disabled={borrow.isPending || borrow.isConfirming}
                />

                {/* Loan Summary */}
                <LoanSummary
                    calculation={calculation}
                    bankId={selectedBank}
                    accountNumber={accountNumber}
                    xautPrice={goldPrice}
                />

                {/* Error Message */}
                {calculation.errorMessage && loanAmount > 0n && (
                    <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/50">
                        <p className="text-red-400 text-center font-semibold">
                            ⚠️ {calculation.errorMessage}
                        </p>
                    </div>
                )}

                {/* CTA Button */}
                <div className="space-y-3">
                    {needsApproval ? (
                        <Button
                            onClick={handleApprove}
                            disabled={xautApproval.isPending || xautApproval.isConfirming}
                            className="w-full h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold text-lg"
                        >
                            {xautApproval.isPending || xautApproval.isConfirming ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    {xautApproval.isPending ? 'Approving...' : 'Confirming...'}
                                </>
                            ) : (
                                'Approve Gold Access'
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleBorrow}
                            disabled={!isFormValid || borrow.isPending || borrow.isConfirming}
                            className="w-full h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold text-xl"
                        >
                            {borrow.isPending || borrow.isConfirming ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    {borrow.isPending ? 'Processing...' : 'Confirming...'}
                                </>
                            ) : (
                                <>💸 GET CASH {formatRupiah(calculation.amountReceived)}</>
                            )}
                        </Button>
                    )}

                    <p className="text-center text-sm text-white/60">
                        ⓘ Your gold will be secured automatically. Repay anytime to withdraw your gold.
                    </p>
                </div>

                {/* Repay Modal */}
                <RepayModal
                    isOpen={showRepayModal}
                    onClose={() => setShowRepayModal(false)}
                    debt={activeLoan.debt}
                    collateral={activeLoan.collateral}
                    idrxBalance={idrxBalance}
                    onRepay={handleRepay}
                    isProcessing={repay.isPending || repay.isConfirming}
                />

                {/* Processing Overlay */}
                {(borrow.isPending || borrow.isConfirming || repay.isPending || repay.isConfirming) && (
                    <ProcessingOverlay state={flowState} />
                )}

                {/* Success Modal */}
                <SuccessModal
                    isOpen={showSuccessModal}
                    onClose={() => {
                        setShowSuccessModal(false);
                        setFlowState({ step: 'idle', message: '' });
                    }}
                    type={successData.bankId ? 'borrow' : 'repay'}
                    data={successData}
                />
            </div>
        </div>
    );
}
