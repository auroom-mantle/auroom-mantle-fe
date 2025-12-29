import Link from 'next/link';
import { SectionWrapper } from './shared/SectionWrapper';
import { StepCard } from './shared/StepCard';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon, ArrowRight, Lock, TrendingUp } from 'lucide-react';

export function HowItWorks() {
    return (
        <SectionWrapper id="how-it-works" background="darker">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        How It <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">Works</span>
                    </h2>
                    <p className="text-lg text-white/70">
                        Start your gold investment journey in 4 simple steps
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StepCard
                        step={1}
                        icon={LinkIcon}
                        title="Connect & Verify"
                        description="Connect your wallet and complete KYC verification for compliance and security."
                        time="~2 minutes"
                        iconColor="text-blue-400"
                        iconBgColor="bg-blue-500/10"
                    />
                    <StepCard
                        step={2}
                        icon={ArrowRight}
                        title="Swap IDRX to XAUT"
                        description="Enter your IDRX amount and we'll show you exactly how much XAUT you'll receive. Your gold arrives in seconds."
                        time="~30 seconds"
                        iconColor="text-purple-400"
                        iconBgColor="bg-purple-500/10"
                    />
                    <StepCard
                        step={3}
                        icon={Lock}
                        title="Stake in GoldVault"
                        description="Deposit your XAUT into the GoldVault to start earning yield. You'll receive gXAUT tokens representing your share."
                        time="~30 seconds"
                        iconColor="text-yellow-400"
                        iconBgColor="bg-yellow-500/10"
                    />
                    <StepCard
                        step={4}
                        icon={TrendingUp}
                        title="Earn & Withdraw"
                        description="Your gXAUT automatically accumulates yield. Withdraw to XAUT whenever you want - no lock-up periods, no penalties."
                        time="Instant"
                        iconColor="text-green-400"
                        iconBgColor="bg-green-500/10"
                    />
                </div>

                {/* CTA */}
                <div className="text-center pt-8">
                    <Button
                        asChild
                        size="lg"
                        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold text-lg px-8 py-6 shadow-2xl shadow-yellow-500/25"
                    >
                        <Link href="/swap">
                            🚀 Start Now - Go to Swap
                            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                        </Link>
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    );
}
