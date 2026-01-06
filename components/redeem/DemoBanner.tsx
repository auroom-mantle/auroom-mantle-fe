// Component: DemoBanner
// Show demo mode indicator banner

'use client';

import { useBackendHealth } from '@/hooks/useBackendHealth';
import { AlertCircle } from 'lucide-react';

export function DemoBanner() {
    const { isDemoMode, isLoading } = useBackendHealth();

    if (isLoading || !isDemoMode) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <p className="text-yellow-100 font-semibold text-sm md:text-base">
                        🎭 <span className="font-bold">DEMO MODE ACTIVE</span> - No real
                        transactions will be processed
                    </p>
                </div>
            </div>
        </div>
    );
}
