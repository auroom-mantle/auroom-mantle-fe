import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    iconColor?: string;
    iconBgColor?: string;
}

export function FeatureCard({
    icon: Icon,
    title,
    description,
    iconColor = 'text-yellow-500',
    iconBgColor = 'bg-yellow-500/10'
}: FeatureCardProps) {
    return (
        <div className="group h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300">
            <div className={cn(
                'h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110',
                iconBgColor
            )}>
                <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-white/70 leading-relaxed">{description}</p>
        </div>
    );
}
