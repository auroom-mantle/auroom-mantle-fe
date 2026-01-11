import { SectionWrapper } from './shared/SectionWrapper';
import { FeatureCard } from './shared/FeatureCard';
import { Globe, DollarSign, CheckCircle } from 'lucide-react';

export function WhatIsAuRoom() {
    return (
        <SectionWrapper id="what-is-auroom" background="default">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        What is <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">AuRoom</span>?
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4 text-lg text-white/80">
                        <p>
                            AuRoom is a Real World Asset (RWA) protocol built on Base Network
                            that enables anyone to convert Indonesian Rupiah (IDRX) into
                            tokenized gold (XAUT) and earn yield through our innovative vault system.
                        </p>
                        <p className="text-white/70">
                            We believe gold investment should be:
                        </p>
                    </div>
                </div>

                {/* Three Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Globe}
                        title="🌍 Accessible"
                        description="Swap from Rupiah to gold in minutes. No minimum investment, no bank visits."
                        iconColor="text-yellow-500"
                        iconBgColor="bg-yellow-500/10"
                    />
                    <FeatureCard
                        icon={DollarSign}
                        title="💰 Productive"
                        description="Your gold earns yield through DeFi liquidity provision. No more idle assets."
                        iconColor="text-amber-500"
                        iconBgColor="bg-amber-500/10"
                    />
                    <FeatureCard
                        icon={CheckCircle}
                        title="✅ Compliant"
                        description="Identity verification ensures secure, legitimate transactions for all users."
                        iconColor="text-yellow-400"
                        iconBgColor="bg-yellow-400/10"
                    />
                </div>
            </div>
        </SectionWrapper>
    );
}
