'use client';

import { motion } from 'framer-motion';
import { BenefitCard } from '@/components/ui/BenefitCard';

const benefits = [
    {
        icon: '⚡',
        title: 'Instant',
        description: 'Process completed in minutes. No need to wait days for approval.',
    },
    {
        icon: '💰',
        title: 'Low Fees',
        description: 'Only 0.5% service fee. No compound interest or hidden fees.',
    },
    {
        icon: '🔒',
        title: 'Secure',
        description: 'Gold secured by transparent smart contracts. Open source code, verifiable by anyone.',
    },
    {
        icon: '🕐',
        title: '24/7',
        description: 'Access anytime, anywhere. No operating hours, no holidays.',
    },
    {
        icon: '📱',
        title: '100% Online',
        description: 'All processes digital. No need to visit offices, no physical documents.',
    },
    {
        icon: '🔄',
        title: 'Flexible',
        description: 'Repay anytime without penalty. Once paid, gold immediately returns to your wallet.',
    },
];

const comparisonData = [
    { feature: 'Processing Time', auroom: '< 5 minutes ✅', traditional: 'Hours ❌' },
    { feature: 'Fees', auroom: '0.5% once ✅', traditional: 'Monthly interest ❌' },
    { feature: 'Access', auroom: '24/7 online ✅', traditional: 'Business hours only ❌' },
    { feature: 'Documents', auroom: 'Not required ✅', traditional: 'ID, etc ❌' },
    { feature: 'Queues', auroom: 'None ✅', traditional: 'Long ❌' },
    { feature: 'Repayment', auroom: 'Anytime ✅', traditional: 'Fixed term ❌' },
];

export function BenefitsSection() {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-black">
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
                        💎 Why Choose AuRoom?
                    </h2>
                </motion.div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                        AuRoom vs Traditional Pawnshops
                    </h3>

                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-[#F5A623]/10 border-b border-white/10">
                            <div className="text-gray-400 font-medium text-sm md:text-base"></div>
                            <div className="text-[#F5A623] font-bold text-center text-sm md:text-base">
                                AUROOM
                            </div>
                            <div className="text-gray-400 font-medium text-center text-sm md:text-base">
                                TRADITIONAL
                            </div>
                        </div>

                        {/* Table Rows */}
                        {comparisonData.map((row, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={`grid grid-cols-3 gap-4 p-4 ${index !== comparisonData.length - 1 ? 'border-b border-white/5' : ''
                                    } hover:bg-white/5 transition-colors`}
                            >
                                <div className="text-white font-medium text-sm md:text-base">
                                    {row.feature}
                                </div>
                                <div className="text-center text-sm md:text-base text-green-400">
                                    {row.auroom}
                                </div>
                                <div className="text-center text-sm md:text-base text-gray-400">
                                    {row.traditional}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
