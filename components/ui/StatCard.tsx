'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
    label: string;
    value: string | number;
    subtext?: string;
    icon?: React.ReactNode;
    delay?: number;
}

export function StatCard({ label, value, subtext, icon, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#F5A623]/50 transition-all duration-300"
        >
            {icon && (
                <div className="text-3xl mb-3">
                    {icon}
                </div>
            )}
            <div className="text-3xl md:text-4xl font-bold text-[#F5A623] mb-2">
                {value}
            </div>
            <div className="text-base md:text-lg font-medium text-white mb-1">
                {label}
            </div>
            {subtext && (
                <div className="text-sm text-gray-400">
                    {subtext}
                </div>
            )}
        </motion.div>
    );
}
