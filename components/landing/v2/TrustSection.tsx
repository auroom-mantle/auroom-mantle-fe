'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StatCard } from '@/components/ui/StatCard';
import { useLandingStats } from '@/hooks/useLandingStats';

const securityFeatures = [
    {
        icon: '🔐',
        title: 'Smart Contract',
        description: 'Gold stored on blockchain, not on hackable servers',
    },
    {
        icon: '✅',
        title: 'KYC Verified',
        description: 'All users verified for security',
    },
    {
        icon: '📜',
        title: 'Open Source',
        description: 'Smart contract code is open, verifiable by anyone',
    },
];

const techPartners = [
    {
        name: 'Lisk Network',
        description: 'Fast & low-cost Ethereum Layer 2',
        logo: '/lisk-logo.svg', // Placeholder
    },
    {
        name: 'IDRX',
        description: 'Indonesian Rupiah Stablecoin',
        logo: '/idrx-logo.svg', // Placeholder
    },
    {
        name: 'Tether Gold',
        description: 'XAUT - backed by real gold',
        logo: '/xaut-logo.svg', // Placeholder
    },
];

export function TrustSection() {
    const stats = useLandingStats();

    return (
        <section className="pt-8 md:pt-12 pb-8 md:pb-12 bg-gradient-to-b from-black via-black to-black">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Live Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Live Statistics
                    </h2>
                    <p className="text-gray-400 mb-12">
                        Real-time data from blockchain
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <StatCard
                            label="Total Loans Disbursed"
                            value={stats.totalLoans}
                            icon=""
                            delay={0}
                        />
                        <StatCard
                            label="Gold Collateralized"
                            value={`${stats.totalCollateral} XAUT`}
                            subtext={stats.totalCollateralIDR}
                            icon=""
                            delay={0.1}
                        />
                        <StatCard
                            label="Current Gold Price"
                            value={stats.xautPriceIdrx}
                            subtext="per XAUT"
                            icon=""
                            delay={0.2}
                        />
                    </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-px bg-gradient-to-r from-transparent via-[#F5A623]/50 to-transparent mb-16"
                />

                {/* Security Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Security
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {securityFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#F5A623]/50 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-3 text-center">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 text-center leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-px bg-gradient-to-r from-transparent via-[#F5A623]/50 to-transparent mb-16"
                />

                {/* Technology Partners */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Built With Technology
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {techPartners.map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-[#F5A623]/50 transition-all duration-300 text-center"
                            >
                                {/* Logo placeholder - will be replaced with actual logos */}
                                <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center text-3xl">
                                    {partner.name === 'Lisk Network' && '🔷'}
                                    {partner.name === 'IDRX' && '🇮🇩'}
                                    {partner.name === 'Tether Gold' && '🥇'}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {partner.name}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {partner.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
