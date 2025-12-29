import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    background?: 'default' | 'darker' | 'gradient';
    id?: string;
}

export function SectionWrapper({
    children,
    className,
    background = 'default',
    id
}: SectionWrapperProps) {
    const bgClasses = {
        default: 'bg-black',
        darker: 'bg-zinc-950',
        gradient: 'bg-gradient-to-br from-zinc-950 via-black to-zinc-950'
    };

    return (
        <section
            id={id}
            className={cn(
                'py-16 md:py-24 relative',
                bgClasses[background],
                className
            )}
        >
            {/* Subtle animated background gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {children}
            </div>
        </section>
    );
}
