'use client';

import { motion } from 'framer-motion';

const problems = [
    {
        icon: '🏦',
        title: 'Traditional Pawnshops',
        points: ['Long queues', 'Lots of paperwork', 'Limited operating hours'],
    },
    {
        icon: '💸',
        title: 'Selling Gold = Loss',
        points: ['Lose valuable assets', 'Bid-ask spread', 'Capital gains tax'],
    },
    {
        icon: '🏛️',
        title: 'Banks are Slow',
        points: ['Days-long process', 'Complex requirements', 'Inflexible collateral'],
    },
];

export function ProblemSolutionSection() {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-black">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Problem Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        😫 Common Problems
                    </h2>
                </motion.div>

                {/* Problem Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-red-950/20 border border-red-500/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300"
                        >
                            <div className="text-5xl mb-4 text-center">{problem.icon}</div>
                            <h3 className="text-xl font-semibold text-white mb-4 text-center">
                                {problem.title}
                            </h3>
                            <ul className="space-y-2">
                                {problem.points.map((point, idx) => (
                                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✗</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-px bg-gradient-to-r from-transparent via-[#F5A623]/50 to-transparent mb-16"
                />

                {/* Solution Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        ✨ Solution: <span className="text-[#F5A623]">AuRoom Cash Loans</span>
                    </h2>

                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                            Digital pawnshop that's simple, fast, and transparent. Collateralize your digital gold,
                            receive cash directly to your bank account. Your gold is safe and can be withdrawn anytime.
                        </p>

                        {/* Solution highlights */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: '⚡', text: 'Process < 5 min' },
                                { icon: '💰', text: '0.5% Fee' },
                                { icon: '🔒', text: 'Safe & Transparent' },
                                { icon: '🔄', text: 'Repay Anytime' },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-lg p-4 hover:bg-[#F5A623]/20 transition-all duration-300"
                                >
                                    <div className="text-3xl mb-2">{item.icon}</div>
                                    <div className="text-sm text-white font-medium">{item.text}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
