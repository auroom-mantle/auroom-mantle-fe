'use client';

import { Loader2 } from 'lucide-react';

interface LoadingAnimationProps {
    message: string;
    progress?: number; // 0-100
    subMessage?: string;
}

export function LoadingAnimation({ message, progress, subMessage }: LoadingAnimationProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            {/* Spinner */}
            <div className="relative">
                <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" />
                {progress !== undefined && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-yellow-500">{Math.round(progress)}%</span>
                    </div>
                )}
            </div>

            {/* Message */}
            <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-white">{message}</p>
                {subMessage && <p className="text-sm text-white/60 mt-2">{subMessage}</p>}
            </div>

            {/* Progress Bar */}
            {progress !== undefined && (
                <div className="w-full max-w-md mt-6">
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Demo indicator */}
            <div className="mt-8 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-xs text-blue-400 text-center">
                    🎭 Demo Mode: Simulated verification process
                </p>
            </div>
        </div>
    );
}
