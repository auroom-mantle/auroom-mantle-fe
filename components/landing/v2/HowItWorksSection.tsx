'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
    {
        number: 1,
        icon: '🥇',
        title: 'Collateralize Gold',
        description: 'Your digital gold (XAUT) in your wallet is automatically collateralized to a secure smart contract.',
    },
    {
        number: 2,
        icon: '💵',
        title: 'Set Amount',
        description: 'Enter the amount of cash you need. The system automatically calculates the gold collateral required.',
    },
    {
        number: 3,
        icon: '🏦',
        title: 'Receive Cash',
        description: 'Money is directly transferred to your chosen bank account. Done!',
    },
];

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="pt-8 md:pt-12 pb-16 md:pb-24 bg-gradient-to-b from-black to-black/95">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-[#F5A623] font-semibold">
                        As Easy as 1 - 2 - 3
                    </p>
                </motion.div>

                {/* Steps Flow */}
                <div className="relative">
                    {/* Connection lines (desktop) */}
                    <div className="hidden md:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-[#F5A623]/20 via-[#F5A623]/50 to-[#F5A623]/20 transform -translate-y-1/2" />

                    <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative"
                            >
                                {/* Step Card */}
                                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-[#F5A623]/50 transition-all duration-300 hover:scale-105 relative z-10">
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#F5A623] rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-[#F5A623]/50">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className="text-6xl mb-6 text-center">
                                        {step.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-300 text-center leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow (desktop only, not after last step) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/3 -right-3 transform -translate-y-1/2 z-20">
                                        <ArrowRight className="w-6 h-6 text-[#F5A623]" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Time Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-full px-6 py-3">
                        <span className="text-lg font-semibold text-[#F5A623]">
                            Process &lt; 5 minutes
                        </span>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/cash-loan"
                        className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#F5A623]/90 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#F5A623]/20 hover:shadow-[#F5A623]/40 hover:scale-105"
                    >
                        Start Borrowing Now
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
