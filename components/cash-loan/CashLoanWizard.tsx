'use client';

import { useState, useEffect } from 'react';
import { StepIndicator } from './StepIndicator';
import { AmountStep } from './AmountStep';
import { BankDetailsStep } from './BankDetailsStep';

interface CashLoanWizardProps {
    // Gold data
    goldBalance: bigint;
    goldValue: bigint;
    goldPrice: bigint;
    goldLoading: boolean;

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
    approvalSuccess: boolean;

    // Borrow
    onBorrow: (collateral: bigint, amount: bigint) => void;
    borrowPending: boolean;
    borrowConfirming: boolean;
    borrowSuccess: boolean;

    // Loan input state (controlled from parent)
    loanInput: string;
    onLoanInputChange: (value: string) => void;
    selectedLTV: number;
    onLTVChange: (ltv: number) => void;

    // Bank details state (controlled from parent)
    selectedBank: string;
    onBankChange: (bankId: string) => void;
    accountNumber: string;
    onAccountNumberChange: (value: string) => void;
    accountName: string;
    onAccountNameChange: (value: string) => void;

    // Callbacks
    onComplete: (data: {
        loanAmount: bigint;
        amountReceived: bigint;
        bankId: string;
        accountNumber: string;
        accountName: string;
    }) => void;
}

export function CashLoanWizard({
    goldBalance,
    goldValue,
    goldPrice,
    goldLoading,
    calculation,
    needsApproval,
    onApprove,
    approvalPending,
    approvalConfirming,
    approvalSuccess,
    onBorrow,
    borrowPending,
    borrowConfirming,
    borrowSuccess,
    loanInput,
    onLoanInputChange,
    selectedLTV,
    onLTVChange,
    selectedBank,
    onBankChange,
    accountNumber,
    onAccountNumberChange,
    accountName,
    onAccountNameChange,
    onComplete,
}: CashLoanWizardProps) {
    const [currentStep, setCurrentStep] = useState<1 | 2>(1);
    const [completedLoanData, setCompletedLoanData] = useState<{
        loanAmount: bigint;
        amountReceived: bigint;
    } | null>(null);

    const loanAmount = loanInput ? BigInt(loanInput) * BigInt(1e6) : 0n;

    // Handle Step 1 Continue (execute borrow transaction)
    const handleStep1Continue = () => {
        onBorrow(calculation.collateralRequired, loanAmount);
    };

    // When borrow succeeds, move to Step 2
    useEffect(() => {
        if (borrowSuccess && currentStep === 1) {
            setCompletedLoanData({
                loanAmount,
                amountReceived: calculation.amountReceived,
            });
            setCurrentStep(2);
            // Scroll to top smoothly when moving to step 2
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [borrowSuccess, currentStep, loanAmount, calculation.amountReceived]);

    // Handle Step 2 Submit
    const handleStep2Submit = () => {
        if (completedLoanData) {
            onComplete({
                loanAmount: completedLoanData.loanAmount,
                amountReceived: completedLoanData.amountReceived,
                bankId: selectedBank,
                accountNumber,
                accountName,
            });
        }
    };

    // Handle back navigation
    const handleBack = () => {
        setCurrentStep(1);
        // Scroll to top smoothly when going back
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-8">
            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} />

            {/* Step Content */}
            {currentStep === 1 ? (
                <AmountStep
                    goldBalance={goldBalance}
                    goldValue={goldValue}
                    goldPrice={goldPrice}
                    goldLoading={goldLoading}
                    loanInput={loanInput}
                    onLoanInputChange={onLoanInputChange}
                    selectedLTV={selectedLTV}
                    onLTVChange={onLTVChange}
                    calculation={calculation}
                    needsApproval={needsApproval}
                    onApprove={onApprove}
                    approvalPending={approvalPending}
                    approvalConfirming={approvalConfirming}
                    onContinue={handleStep1Continue}
                    continuePending={borrowPending}
                    continueConfirming={borrowConfirming}
                    disabled={false}
                />
            ) : (
                <BankDetailsStep
                    selectedBank={selectedBank}
                    onBankChange={onBankChange}
                    accountNumber={accountNumber}
                    onAccountNumberChange={onAccountNumberChange}
                    accountName={accountName}
                    onAccountNameChange={onAccountNameChange}
                    loanAmount={completedLoanData?.loanAmount || 0n}
                    amountReceived={completedLoanData?.amountReceived || 0n}
                    onBack={handleBack}
                    onSubmit={handleStep2Submit}
                    isProcessing={false}
                    disabled={false}
                />
            )}
        </div>
    );
}
