'use client';

import { motion } from 'framer-motion';

interface BenefitCardProps {
    icon: string;
    title: string;
    description: string;
    delay?: number;
}

export function BenefitCard({ icon, title, description, delay = 0 }: BenefitCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#F5A623]/50 transition-all duration-300 hover:scale-105"
        >
            <div className="text-4xl mb-4">
                {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {title}
            </h3>
            <p className="text-base text-gray-300 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
