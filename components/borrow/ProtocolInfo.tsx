'use client';

import { formatIDR, formatLTV } from '@/lib/utils/borrow';

interface ProtocolInfoProps {
    xautPrice: bigint;
    borrowFee: bigint;
}

export function ProtocolInfo({ xautPrice, borrowFee }: ProtocolInfoProps) {
    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Protocol Information</h3>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-white/60">Current XAUT Price</span>
                    <span className="text-white font-medium">
                        {xautPrice > 0n ? formatIDR(xautPrice, 8) : 'Loading...'}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-white/60">Borrow Fee</span>
                    <span className="text-white font-medium">
                        {borrowFee > 0n ? formatLTV(borrowFee) : '0.50%'}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-white/60">Maximum LTV</span>
                    <span className="text-yellow-500 font-medium">75%</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-white/60">Warning LTV</span>
                    <span className="text-orange-500 font-medium">80%</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-white/60">Liquidation LTV</span>
                    <span className="text-red-500 font-medium">90%</span>
                </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-xs text-yellow-400">
                    ⚠️ Keep your LTV below 75% to maintain a healthy position. Positions above 90% LTV may be liquidated.
                </p>
            </div>
        </div>
    );
}
