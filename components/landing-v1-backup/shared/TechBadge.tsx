import { cn } from '@/lib/utils';

interface TechBadgeProps {
    name: string;
    description?: string;
    icon?: string;
    size?: 'sm' | 'lg';
    className?: string;
}

export function TechBadge({
    name,
    description,
    icon,
    size = 'lg',
    className
}: TechBadgeProps) {
    if (size === 'sm') {
        return (
            <div className={cn(
                'px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:border-yellow-500/30 hover:scale-105',
                className
            )}>
                {name}
            </div>
        );
    }

    return (
        <div className={cn('p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all hover:scale-105 text-center space-y-3', className)}>
            {icon && (
                <div className="text-4xl">{icon}</div>
            )}
            <div className="font-bold text-lg text-white">{name}</div>
            {description && (
                <p className="text-sm text-white/70">{description}</p>
            )}
        </div>
    );
}
