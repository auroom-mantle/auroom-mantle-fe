'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Coins, Shield } from 'lucide-react';
import { Beams } from '@/components/ui/ethereal-beams-hero';
import { useLandingStats } from '@/hooks/useLandingStats';

export function Hero() {
    const stats = useLandingStats();

    const scrollToNext = () => {
        const nextSection = document.getElementById('what-is-auroom');
        nextSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Beams Background */}
            <div className="absolute inset-0 z-0">
                <Beams
                    beamWidth={2.5}
                    beamHeight={18}
                    beamNumber={15}
                    lightColor="#FFD700"
                    speed={2.5}
                    noiseIntensity={2}
                    scale={0.15}
                    rotation={43}
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex min-h-screen items-center">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center rounded-full bg-white/5 backdrop-blur-xl border border-yellow-500/20 px-4 py-2 text-sm text-white/90">
                            <Shield className="mr-2 h-4 w-4 text-yellow-500" />
                            {"Backed by Real Gold Assets"}
                        </div>

                        {/* Brand Logo */}
                        <div className="mb-4">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                                    AuRoom
                                </span>
                            </h1>
                        </div>

                        {/* Main Heading */}
                        <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Transform Rupiah into{" "}
                            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
                                Yield-Bearing
                            </span>{" "}
                            Gold
                        </h2>

                        {/* Subtitle */}
                        <p className="mb-10 text-lg leading-8 text-white/80 sm:text-xl lg:text-2xl max-w-3xl mx-auto">
                            The first DeFi protocol that lets you swap Indonesian Rupiah for tokenized gold that generates real yield.
                            Backed by real-world assets, powered by blockchain technology.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Button
                                asChild
                                size="lg"
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold text-lg px-8 py-6 shadow-2xl shadow-yellow-500/25 transition-all"
                            >
                                <Link href="/swap">
                                    <Coins className="mr-2 h-5 w-5" />
                                    Start Swapping
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                </Link>
                            </Button>
                            <Button
                                onClick={scrollToNext}
                                variant="outline"
                                size="lg"
                                className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30 font-semibold text-lg px-8 py-6"
                            >
                                Learn More
                                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">
                                    {stats.isLoading ? '...' : `$${stats.tvlUsd}`}
                                </div>
                                <div className="text-white/60 text-sm">Total Value Locked</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">
                                    {stats.isLoading ? '...' : stats.estimatedApy}
                                </div>
                                <div className="text-white/60 text-sm">Estimated APY</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">
                                    {stats.isLoading ? '...' : `${parseFloat(stats.tvl).toFixed(2)} XAUT`}
                                </div>
                                <div className="text-white/60 text-sm">Gold Reserves</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
        </div>
    );
}
