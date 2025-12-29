'use client';

import { type LoanFlowState } from '@/lib/utils/loanFlow';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface ProcessingOverlayProps {
    state: LoanFlowState;
}

export function ProcessingOverlay({ state }: ProcessingOverlayProps) {
    if (state.step === 'idle') return null;

    const steps = [
        { id: 'checking-approval', label: 'Checking access permission' },
        { id: 'approving', label: 'Approving gold access' },
        { id: 'borrowing', label: 'Securing gold collateral' },
        { id: 'transferring', label: 'Transferring to account' },
    ];

    const getStepStatus = (stepId: string) => {
        const currentIndex = steps.findIndex(s => s.id === state.step);
        const stepIndex = steps.findIndex(s => s.id === stepId);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'pending';
    };

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
                    // Processing State
                    <div className="space-y-6">
                        {/* Spinner */}
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white">{state.message}</h3>
                        </div>

                        {/* Steps */}
                        <div className="space-y-3">
                            {steps.map((step, index) => {
                                const status = getStepStatus(step.id);
                                return (
                                    <div key={step.id} className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div className="flex-shrink-0">
                                            {status === 'completed' ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            ) : status === 'active' ? (
                                                <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />
                                            ) : (
                                                <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                                            )}
                                        </div>

                                        {/* Label */}
                                        <span className={`text-sm ${status === 'completed' ? 'text-green-400' :
                                                status === 'active' ? 'text-white font-semibold' :
                                                    'text-white/40'
                                            }`}>
                                            Step {index + 1}: {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Warning */}
                        <p className="text-white/50 text-xs text-center">
                            ⓘ Please don't close this page
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
