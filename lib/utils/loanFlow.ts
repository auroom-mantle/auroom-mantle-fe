/**
 * Loan Flow Management for Pinjam Tunai
 * 
 * Orchestrates multi-step loan process with user-friendly messaging
 */

export type LoanStep =
    | 'idle'
    | 'checking-approval'
    | 'approving'
    | 'borrowing'
    | 'transferring'
    | 'success'
    | 'error';

export interface LoanFlowState {
    step: LoanStep;
    message: string;
    txHash?: string;
    error?: string;
}

export interface BankDetails {
    bankId: string;
    accountNumber: string;
    accountName: string;
}

/**
 * Execute loan flow:
 * 1. Check XAUT approval
 * 2. Approve XAUT if needed
 * 3. Call depositAndBorrow()
 * 4. Simulate bank transfer
 * 5. Show success
 */
export async function executeLoanFlow(
    collateralAmount: bigint,
    borrowAmount: bigint,
    bankDetails: BankDetails,
    callbacks: {
        onStepChange: (state: LoanFlowState) => void;
        checkAllowance: () => Promise<bigint>;
        approve: () => Promise<void>;
        depositAndBorrow: () => Promise<string>; // returns txHash
    }
): Promise<void> {
    const { onStepChange, checkAllowance, approve, depositAndBorrow } = callbacks;

    try {
        // Step 1: Check approval
        onStepChange({ step: 'checking-approval', message: 'Checking access permission...' });
        const allowance = await checkAllowance();

        // Step 2: Approve if needed
        if (allowance < collateralAmount) {
            onStepChange({ step: 'approving', message: 'Approving gold access...' });
            await approve();
        }

        // Step 3: Deposit and borrow
        onStepChange({ step: 'borrowing', message: 'Securing gold collateral...' });
        const txHash = await depositAndBorrow();

        // Step 4: Simulate transfer (3-5 seconds)
        onStepChange({ step: 'transferring', message: 'Transferring to account...', txHash });
        await simulateTransfer();

        // Step 5: Success
        onStepChange({ step: 'success', message: 'Loan successful!', txHash });

    } catch (error) {
        onStepChange({
            step: 'error',
            message: 'An error occurred',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
    }
}

/**
 * Execute repay flow:
 * 1. Check IDRX approval
 * 2. Approve IDRX if needed
 * 3. Call closePosition() or repayAndWithdraw()
 * 4. Show success
 */
export async function executeRepayFlow(
    repayAmount: bigint,
    isFullRepay: boolean,
    callbacks: {
        onStepChange: (state: LoanFlowState) => void;
        checkAllowance: () => Promise<bigint>;
        approve: () => Promise<void>;
        closePosition: () => Promise<string>;
        repayAndWithdraw?: (repay: bigint, withdraw: bigint) => Promise<string>;
    }
): Promise<void> {
    const { onStepChange, checkAllowance, approve, closePosition } = callbacks;

    try {
        // Step 1: Check approval
        onStepChange({ step: 'checking-approval', message: 'Checking access permission...' });
        const allowance = await checkAllowance();

        // Step 2: Approve if needed
        if (allowance < repayAmount) {
            onStepChange({ step: 'approving', message: 'Approving access...' });
            await approve();
        }

        // Step 3: Execute repay
        onStepChange({ step: 'borrowing', message: 'Repaying loan...' });

        // For now, always use closePosition for simplicity
        const txHash = await closePosition();

        // Step 4: Success
        onStepChange({ step: 'success', message: 'Repayment successful!', txHash });

    } catch (error) {
        onStepChange({
            step: 'error',
            message: 'An error occurred',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
    }
}

/**
 * Simulate bank transfer delay (3-5 seconds)
 */
async function simulateTransfer(): Promise<void> {
    const delay = 3000 + Math.random() * 2000; // 3-5 seconds
    await new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Generate reference number for transaction
 */
export function generateReferenceNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TRX-${timestamp}-${random}`;
}
