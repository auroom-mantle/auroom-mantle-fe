'use client';

import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    label: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: {
        value: string;
        period: string;
        isPositive?: boolean;
    };
    isLoading?: boolean;
    animate?: boolean;
    className?: string;
}

export function StatCard({
    label,
    value,
    icon: Icon,
    trend,
    isLoading = false,
    animate = false,
    className
}: StatCardProps) {
    const [displayValue, setDisplayValue] = useState(animate ? '0' : value);

    useEffect(() => {
        if (animate && typeof value === 'number') {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setDisplayValue(value);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        } else {
            setDisplayValue(value);
        }
    }, [value, animate]);

    if (isLoading) {
        return (
            <div className={cn('p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center space-y-2', className)}>
                <div className="h-8 w-32 bg-white/10 animate-pulse rounded mx-auto" />
                <div className="h-4 w-24 bg-white/10 animate-pulse rounded mx-auto" />
            </div>
        );
    }

    return (
        <div className={cn('p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300 text-center space-y-2', className)}>
            <div className="flex items-center justify-center gap-2">
                {Icon && <Icon className="h-5 w-5 text-yellow-500" />}
                <div className="text-3xl md:text-4xl font-bold font-mono bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    {displayValue}
                </div>
            </div>
            <div className="text-sm text-white/70">{label}</div>
            {trend && (
                <div className={cn(
                    'text-xs font-medium',
                    trend.isPositive ? 'text-green-400' : 'text-red-400'
                )}>
                    {trend.isPositive ? '↑' : '↓'} {trend.value} ({trend.period})
                </div>
            )}
        </div>
    );
}
