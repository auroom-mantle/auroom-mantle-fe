'use client';

import { type LoanFlowState } from '@/lib/utils/loanFlow';
import { Loader2, XCircle } from 'lucide-react';

interface ProcessingOverlayProps {
    state: LoanFlowState;
}

export function ProcessingOverlay({ state }: ProcessingOverlayProps) {
    if (state.step === 'idle') return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border-2 border-yellow-500/30 rounded-2xl p-8 max-w-md w-full">
                {state.step === 'error' ? (
                    // Error State
                    <div className="text-center space-y-4">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <h3 className="text-xl font-bold text-white">{state.message}</h3>
                        {state.error && (
                            <p className="text-red-400 text-sm">{state.error}</p>
                        )}
                    </div>
                ) : (
                    // Processing State - Simplified
                    <div className="space-y-6 text-center">
                        {/* Spinner */}
                        <Loader2 className="w-16 h-16 text-yellow-500 animate-spin mx-auto" />

                        {/* Message */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{state.message}</h3>
                            <p className="text-white/60 text-sm">
                                Please confirm the transaction in your wallet
                            </p>
                        </div>

                        {/* Warning */}
                        <p className="text-white/50 text-xs">
                            ⓘ Please don't close this page
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
