'use client';

import { SectionWrapper } from './shared/SectionWrapper';
import { StatCard } from './shared/StatCard';
import { useLandingStats } from '@/hooks/useLandingStats';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export function HowYieldWorks() {
    const stats = useLandingStats();

    return (
        <SectionWrapper background="darker" id="how-yield-works">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        How is <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">Yield Generated</span>?
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Transparency is our priority. Here's exactly how your gold generates returns.
                    </p>
                </div>

                {/* Yield Flow Diagram */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-center mb-8 text-white">The AuRoom Yield Mechanism</h3>

                    <div className="space-y-6">
                        {/* Flow Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="text-center p-4 bg-zinc-900 border-2 border-yellow-500/50 rounded-xl">
                                <div className="font-bold mb-2 text-yellow-400">1. Deposit</div>
                                <div className="text-sm text-white">Your XAUT</div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-yellow-500 mx-auto" />
                            <div className="text-center p-4 bg-zinc-900 border-2 border-blue-500/50 rounded-xl">
                                <div className="font-bold mb-2 text-blue-400">2. Vault</div>
                                <div className="text-sm text-white">Get gXAUT</div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-yellow-500 mx-auto" />
                            <div className="text-center p-4 bg-zinc-900 border-2 border-green-500/50 rounded-xl">
                                <div className="font-bold mb-2 text-green-400">3. Earn</div>
                                <div className="text-sm text-white">LP Fees</div>
                            </div>
                        </div>

                        {/* Detailed Explanation */}
                        <div className="space-y-4 pt-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold mb-1 text-white">Deposit</h4>
                                    <p className="text-sm text-white/70">
                                        You deposit XAUT into the GoldVault and receive gXAUT (Gold Vault Tokens) representing your share.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold mb-1 text-white">Liquidity Provision</h4>
                                    <p className="text-sm text-white/70">
                                        The vault's XAUT is paired with USDC in liquidity pools, enabling trading on the decentralized exchange.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-bold mb-1 text-white">Fee Generation</h4>
                                    <p className="text-sm text-white/70">
                                        Every time someone swaps tokens, they pay a 0.3% fee. This fee is distributed to liquidity providers.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black flex items-center justify-center font-bold">4</div>
                                <div>
                                    <h4 className="font-bold mb-1 text-white">Yield Accumulation</h4>
                                    <p className="text-sm text-white/70">
                                        Fees accumulate in the vault, increasing total assets. Your gXAUT stays the same, but it's worth MORE XAUT.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black flex items-center justify-center font-bold">5</div>
                                <div>
                                    <h4 className="font-bold mb-1 text-white">Withdraw</h4>
                                    <p className="text-sm text-white/70">
                                        When you redeem gXAUT, you get back more XAUT than you deposited. That's your yield!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Points */}
                <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                    <div className="space-y-2">
                        <div className="font-bold mb-3 text-white">💡 Key Points:</div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✅</span>
                                <span className="text-white/80">Yield comes from REAL trading activity, not token inflation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✅</span>
                                <span className="text-white/80">0.3% fee on every swap goes to liquidity providers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✅</span>
                                <span className="text-white/80">No lock-up period - withdraw your gold anytime</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✅</span>
                                <span className="text-white/80">Yield varies based on trading volume</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                <span className="text-white/80">APY is NOT guaranteed and depends on market activity</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                <span className="text-white/80">Past performance does not guarantee future results</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Current Vault Stats */}
                <div>
                    <h3 className="text-2xl font-bold text-center mb-8 text-white">Current Vault Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            label="Total Value Locked"
                            value={stats.isLoading ? '...' : `${parseFloat(stats.tvl).toFixed(2)} XAUT`}
                            isLoading={stats.isLoading}
                        />
                        <StatCard
                            label="Share Price (gXAUT)"
                            value={stats.isLoading ? '...' : parseFloat(stats.sharePrice).toFixed(4)}
                            isLoading={stats.isLoading}
                        />
                        <StatCard
                            label="Estimated APY"
                            value={stats.estimatedApy}
                            isLoading={stats.isLoading}
                        />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
