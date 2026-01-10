'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { ActiveLoanCard } from '@/components/cash-loan/ActiveLoanCard';
import { RepayModal } from '@/components/cash-loan/RepayModal';
import { useActiveLoan, useIDRXBalance, useRepay } from '@/hooks/useLoan';
import { formatRupiah, formatXAUT } from '@/lib/utils/format';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

// Types
type LoanStatus = 'completed' | 'pending' | 'failed';
type LoanType = 'borrow' | 'repay';

interface LoanHistoryItem {
    id: string;
    date: string;
    type: LoanType;
    amount: bigint;
    collateral: bigint;
    status: LoanStatus;
    txHash: string;
}

// Mock data for loan history
const mockLoanHistory: LoanHistoryItem[] = [
    {
        id: '1',
        date: '2026-01-05',
        type: 'borrow',
        amount: 10_000_000n * BigInt(1e6), // 10M IDR
        collateral: 515_000n, // 0.515 XAUT
        status: 'completed',
        txHash: '0x1234...5678',
    },
    {
        id: '2',
        date: '2026-01-05',
        type: 'repay',
        amount: 10_000_000n * BigInt(1e6),
        collateral: 515_000n,
        status: 'completed',
        txHash: '0xabcd...efgh',
    },
    {
        id: '3',
        date: '2026-01-03',
        type: 'borrow',
        amount: 5_000_000n * BigInt(1e6),
        collateral: 257_500n,
        status: 'completed',
        txHash: '0x9876...5432',
    },
];

export default function MyLoansPage() {
    const router = useRouter();
    const { isConnected } = useAccount();
    const activeLoan = useActiveLoan();
    const { balance: idrxBalance } = useIDRXBalance();
    const repay = useRepay();

    const [showRepayModal, setShowRepayModal] = useState(false);

    // Redirect to landing page if wallet disconnects
    useEffect(() => {
        if (!isConnected) {
            router.push('/');
        }
    }, [isConnected, router]);

    // Handle repay success
    useEffect(() => {
        if (repay.isSuccess) {
            // Close modal
            setShowRepayModal(false);
            // Refresh loan data
            activeLoan.refetch();
            // Reset repay state
            repay.reset();
        }
    }, [repay.isSuccess]);

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-black py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">💼 MY LOANS</h1>
                    <p className="text-white/70 text-lg mb-8">
                        Manage your loans and view transaction history
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
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
                        My Loans
                    </h1>
                    <p className="text-white/60">Manage your active loans and view transaction history</p>
                </div>

                {/* Active Loan Section */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span>📊</span>
                        Active Loan
                    </h2>
                    {activeLoan.hasActiveLoan ? (
                        <ActiveLoanCard
                            collateral={activeLoan.collateral}
                            debt={activeLoan.debt}
                            collateralValue={activeLoan.collateralValue}
                            ltv={activeLoan.ltv}
                            onRepayClick={() => setShowRepayModal(true)}
                            isLoading={activeLoan.isLoading}
                        />
                    ) : (
                        <div className="bg-zinc-900/50 border-2 border-yellow-500/30 rounded-2xl p-8 text-center">
                            <div className="text-6xl mb-4">🎉</div>
                            <h3 className="text-xl font-bold text-white mb-2">No Active Loans</h3>
                            <p className="text-white/70 mb-6">
                                You don't have any active loans at the moment
                            </p>
                            <a
                                href="/cash-loan"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold rounded-xl transition-all"
                            >
                                Get a Cash Loan
                            </a>
                        </div>
                    )}
                </div>

                {/* Loan History Section */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span>📜</span>
                        Loan History
                    </h2>

                    {mockLoanHistory.length > 0 ? (
                        <div className="space-y-3">
                            {mockLoanHistory.map((loan) => (
                                <div
                                    key={loan.id}
                                    className="bg-zinc-900/50 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Left: Type & Date */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                {loan.type === 'borrow' ? (
                                                    <span className="text-2xl">💰</span>
                                                ) : (
                                                    <span className="text-2xl">✅</span>
                                                )}
                                                <h3 className="text-white font-bold">
                                                    {loan.type === 'borrow' ? 'Borrowed' : 'Repaid'}
                                                </h3>
                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${loan.status === 'completed'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : loan.status === 'pending'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {loan.status === 'completed' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                                                    {loan.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                                                    {loan.status === 'failed' && <XCircle className="w-3 h-3 inline mr-1" />}
                                                    {loan.status}
                                                </span>
                                            </div>
                                            <p className="text-white/50 text-sm">
                                                {new Date(loan.date).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>

                                        {/* Right: Amount & Collateral */}
                                        <div className="text-right">
                                            <p className="text-yellow-500 font-bold text-lg">
                                                {formatRupiah(loan.amount)}
                                            </p>
                                            <p className="text-white/70 text-sm">
                                                {formatXAUT(loan.collateral)} XAUT
                                            </p>
                                            <a
                                                href={`https://sepolia-blockscout.lisk.com/tx/${loan.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-yellow-400 hover:text-yellow-300 text-xs mt-1 inline-block"
                                            >
                                                View TX ↗
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900/50 border border-yellow-500/20 rounded-xl p-8 text-center">
                            <div className="text-4xl mb-3">📭</div>
                            <p className="text-white/70">No loan history yet</p>
                            <p className="text-white/50 text-sm mt-2">
                                Your loan transactions will appear here
                            </p>
                        </div>
                    )}
                </div>

                {/* Repay Modal */}
                <RepayModal
                    isOpen={showRepayModal}
                    onClose={() => setShowRepayModal(false)}
                    debt={activeLoan.debt}
                    collateral={activeLoan.collateral}
                    idrxBalance={idrxBalance}
                    onRepay={(repayAmount, isFullRepay) => {
                        // Execute repay transaction
                        // For full repay: withdraw all collateral
                        // For partial repay: withdraw 0 (collateral stays locked)
                        const withdrawAmount = isFullRepay ? activeLoan.collateral : 0n;
                        repay.execute(repayAmount, withdrawAmount);
                    }}
                    isProcessing={repay.isPending || repay.isConfirming}
                />
            </div>
        </div>
    );
}
