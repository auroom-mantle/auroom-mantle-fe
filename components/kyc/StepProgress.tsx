'use client';

import { KYCStep, KYC_STEP_TITLES } from '@/lib/kyc/types';
import { CheckCircle2, Circle } from 'lucide-react';

interface StepProgressProps {
    currentStep: KYCStep;
    completedSteps: number[];
}

export function StepProgress({ currentStep, completedSteps }: StepProgressProps) {
    const steps: KYCStep[] = [1, 2, 3, 4];

    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step);
                    const isCurrent = currentStep === step;
                    const isAccessible = step <= currentStep;

                    return (
                        <div key={step} className="flex items-center flex-1">
                            {/* Step Circle */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
                    transition-all duration-300
                    ${isCompleted
                                            ? 'bg-green-500 text-white'
                                            : isCurrent
                                                ? 'bg-yellow-500 text-black ring-4 ring-yellow-500/30'
                                                : isAccessible
                                                    ? 'bg-zinc-800 text-white border-2 border-yellow-500/50'
                                                    : 'bg-zinc-900 text-white/40 border-2 border-white/10'
                                        }
                  `}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-6 h-6" />
                                    ) : (
                                        <span>{step}</span>
                                    )}
                                </div>
                                <div className="mt-2 text-xs text-center max-w-[100px]">
                                    <div
                                        className={`font-medium ${isCurrent ? 'text-yellow-400' : isCompleted ? 'text-green-400' : 'text-white/60'
                                            }`}
                                    >
                                        Step {step}
                                    </div>
                                    <div className="text-white/40 text-[10px] leading-tight mt-1 hidden sm:block">
                                        {KYC_STEP_TITLES[step]}
                                    </div>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-0.5 mx-2 relative">
                                    <div className="absolute inset-0 bg-white/10" />
                                    <div
                                        className={`absolute inset-0 transition-all duration-500 ${completedSteps.includes(step) ? 'bg-green-500' : 'bg-transparent'
                                            }`}
                                        style={{
                                            width: completedSteps.includes(step) ? '100%' : '0%',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
