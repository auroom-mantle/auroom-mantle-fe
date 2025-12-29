import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepCardProps {
    step: number;
    icon: LucideIcon;
    title: string;
    description: string;
    time?: string;
    iconColor?: string;
    iconBgColor?: string;
}

export function StepCard({
    step,
    icon: Icon,
    title,
    description,
    time,
    iconColor = 'text-yellow-500',
    iconBgColor = 'bg-yellow-500/10'
}: StepCardProps) {
    return (
        <div className="h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300">
            <div className={cn(
                'h-12 w-12 rounded-xl flex items-center justify-center mb-4',
                iconBgColor
            )}>
                <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-yellow-500">{step}.</span>
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            {time && (
                <div className="text-xs text-yellow-500/80 mb-3">⏱️ {time}</div>
            )}
            <p className="text-sm text-white/70 leading-relaxed">{description}</p>
        </div>
    );
}
