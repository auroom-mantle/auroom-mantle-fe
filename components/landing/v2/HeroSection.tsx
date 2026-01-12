'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export function HeroSection() {
    const router = useRouter();
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    // Removed: Auto-redirect to cash-loan when wallet connects
    // Users should stay on homepage after connecting

    const handleBorrowNow = () => {
        if (isConnected) {
            router.push('/cash-loan');
        } else {
            openConnectModal?.();
        }
    };


    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
                {/* Main Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
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
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto"
                >
                    Borrow cash with digital gold collateral. Fast, secure, and transparent.
                    Money directly to your bank account.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                    <button
                        onClick={handleBorrowNow}
                        className="group bg-[#F5A623] hover:bg-[#F5A623]/90 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20 hover:shadow-[#F5A623]/40 hover:scale-105"
                    >
                        Borrow Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => {
                            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-[#F5A623]/50 backdrop-blur-sm"
                    >
                        Learn More
                    </button>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap gap-6 justify-center"
                >
                    <div className="flex items-center gap-2 text-gray-200">
                        <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
                        <span className="text-sm md:text-base">No Queues</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                        <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
                        <span className="text-sm md:text-base">24/7</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                        <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
                        <span className="text-sm md:text-base">Low Fees</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
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
