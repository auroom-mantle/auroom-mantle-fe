'use client';

import { useAccount } from 'wagmi';
import { useUserPosition, useBorrowFee } from '@/hooks/contracts/useBorrowingProtocol';
import { PositionSummary } from '@/components/borrow/PositionSummary';
import { CollateralCard } from '@/components/borrow/CollateralCard';
import { BorrowCard } from '@/components/borrow/BorrowCard';
import { ProtocolInfo } from '@/components/borrow/ProtocolInfo';

export default function BorrowPage() {
    const { address, isConnected } = useAccount();

    // Get user position data
    const position = useUserPosition();
    const { data: borrowFee } = useBorrowFee();

    const handleSuccess = () => {
        // Refetch position data after successful transaction
        position.refetch();
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
                            Borrow IDRX
                        </h1>
                        <p className="text-white/60 text-lg">
                            Use your gold (XAUT) as collateral to borrow IDRX
                        </p>
                    </div>

                    {/* Not Connected State */}
                    {!isConnected && (
                        <div className="p-8 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 backdrop-blur-xl text-center">
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Connect Your Wallet
                            </h3>
                            <p className="text-white/60">
                                Please connect your wallet to start borrowing
                            </p>
                        </div>
                    )}

                    {/* Connected State */}
                    {isConnected && (
                        <div className="space-y-6">
                            {/* Position Summary */}
                            <PositionSummary
                                collateralBalance={position.collateralBalance}
                                collateralValue={position.collateralValue}
                                debtBalance={position.debtBalance}
                                maxBorrow={position.maxBorrow}
                                ltv={position.ltv}
                                isAtRisk={position.isAtRisk}
                                isLoading={position.isLoading}
                            />

                            {/* Action Cards Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <CollateralCard
                                    currentCollateral={position.collateralBalance}
                                    onSuccess={handleSuccess}
                                />
                                <BorrowCard
                                    maxBorrow={position.maxBorrow}
                                    currentDebt={position.debtBalance}
                                    onSuccess={handleSuccess}
                                />
                            </div>

                            {/* Protocol Info */}
                            <ProtocolInfo
                                xautPrice={position.xautPrice}
                                borrowFee={(borrowFee as bigint) ?? BigInt(50)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
