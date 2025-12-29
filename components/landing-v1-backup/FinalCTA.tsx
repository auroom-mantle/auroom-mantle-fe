import Link from 'next/link';
import { SectionWrapper } from './shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight, Coins } from 'lucide-react';

export function FinalCTA() {
    return (
        <SectionWrapper id="final-cta" background="gradient">
            <div className="max-w-3xl mx-auto">
                <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-yellow-500/20 backdrop-blur-xl border-2 border-yellow-500/30 rounded-3xl p-12 text-center space-y-8">
                    {/* Animated background glow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
                    </div>

                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Ready to Start Your <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">Gold Journey</span>?
                        </h2>
                        <p className="text-lg text-white/80">
                            Join users who are already earning yield on their gold investments with AuRoom.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold text-lg px-8 shadow-2xl shadow-yellow-500/25"
                        >
                            <Link href="/swap">
                                <Coins className="mr-2 h-5 w-5" />
                                Start Swapping
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30 font-semibold text-lg px-8"
                        >
                            <Link href="/vault">
                                🏦 Stake Gold
                                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                            </Link>
                        </Button>
                    </div>

                    <p className="relative z-10 text-sm text-white/60 pt-4">
                        No minimum investment. Start with any amount.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}
