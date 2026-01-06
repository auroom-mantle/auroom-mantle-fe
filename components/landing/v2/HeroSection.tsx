'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export function HeroSection() {
    const router = useRouter();
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    // Auto-redirect to cash-loan when wallet connects
    useEffect(() => {
        if (isConnected) {
            router.push('/cash-loan');
        }
    }, [isConnected, router]);

    const handleBorrowNow = () => {
        if (isConnected) {
            router.push('/cash-loan');
        } else {
            openConnectModal?.();
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-black/95 to-black/90">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5A623]/10 via-transparent to-transparent" />

            <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Logo/Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <h1 className="text-2xl md:text-3xl font-bold text-[#F5A623] mb-2">
                                AUROOM
                            </h1>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                        >
                            Need Cash?
                            <br />
                            <span className="text-[#F5A623]">Collateralize Gold,</span>
                            <br />
                            Get Instant Liquidity
                        </motion.h2>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            Borrow cash with digital gold collateral. Fast, secure, and transparent.
                            Money directly to your bank account.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                        >
                            <button
                                onClick={handleBorrowNow}
                                className="group bg-[#F5A623] hover:bg-[#F5A623]/90 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20 hover:shadow-[#F5A623]/40 hover:scale-105"
                            >
                                🚀 Borrow Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => {
                                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-[#F5A623]/50"
                            >
                                📖 Learn More
                            </button>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-6 justify-center lg:justify-start"
                        >
                            <div className="flex items-center gap-2 text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
                                <span className="text-sm md:text-base">No Queues</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
                                <span className="text-sm md:text-base">24/7</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
                                <span className="text-sm md:text-base">Low Fees</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Hero Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Glowing background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#F5A623]/20 to-transparent rounded-full blur-3xl" />

                            {/* Illustration placeholder - will be replaced with generated image */}
                            <div className="relative bg-gradient-to-br from-[#F5A623]/10 to-transparent border border-[#F5A623]/20 rounded-3xl p-12 backdrop-blur-sm flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-8xl mb-6">🥇</div>
                                    <div className="text-6xl mb-6">→</div>
                                    <div className="text-8xl">💵</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-gray-400"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
