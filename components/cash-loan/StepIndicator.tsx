'use client';

import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
    id: number;
    title: string;
    description: string;
}

interface StepIndicatorProps {
    currentStep: number;
}

const STEPS: Step[] = [
    {
        id: 1,
        title: 'Enter Amount',
        description: 'How much cash do you need?',
    },
    {
        id: 2,
        title: 'Bank Details',
        description: 'Where to send the money',
    },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <div className="w-full py-8">
            {/* Desktop View */}
            <div className="hidden md:block">
                <div className="flex items-center justify-center max-w-2xl mx-auto">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className="flex items-center flex-1">
                            {/* Step Circle */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={cn(
                                        'w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                                        currentStep >= step.id
                                            ? 'bg-yellow-500 border-yellow-500 text-black shadow-lg shadow-yellow-500/50'
                                            : 'bg-zinc-900 border-yellow-500/30 text-white/50'
                                    )}
                                >
                                    {currentStep > step.id ? (
                                        <CheckCircle2 className="w-8 h-8" />
                                    ) : (
                                        <span className="font-bold text-2xl">{step.id}</span>
                                    )}
                                </div>
                                <div className="mt-4 text-center">
                                    <p
                                        className={cn(
                                            'text-base font-semibold transition-colors duration-300',
                                            currentStep >= step.id ? 'text-white' : 'text-white/50'
                                        )}
                                    >
                                        {step.title}
                                    </p>
                                    <p className="text-sm text-white/40 mt-1">{step.description}</p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < STEPS.length - 1 && (
                                <div className="flex-1 h-1 mx-6 -mt-20 rounded-full overflow-hidden bg-yellow-500/20">
                                    <div
                                        className={cn(
                                            'h-full transition-all duration-500 ease-out bg-yellow-500',
                                            currentStep > step.id ? 'w-full' : 'w-0'
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-3">
                {STEPS.map((step) => (
                    <div
                        key={step.id}
                        className={cn(
                            'flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300',
                            currentStep === step.id
                                ? 'bg-yellow-500/10 border-yellow-500 shadow-lg'
                                : currentStep > step.id
                                    ? 'bg-green-500/10 border-green-500/30'
                                    : 'bg-zinc-900 border-yellow-500/20'
                        )}
                    >
                        <div
                            className={cn(
                                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
                                currentStep > step.id
                                    ? 'bg-green-500 text-white'
                                    : currentStep === step.id
                                        ? 'bg-yellow-500 text-black'
                                        : 'bg-zinc-800 text-white/50'
                            )}
                        >
                            {currentStep > step.id ? (
                                <CheckCircle2 className="w-6 h-6" />
                            ) : (
                                <span className="text-base font-bold">{step.id}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <p
                                className={cn(
                                    'text-base font-semibold transition-colors duration-300',
                                    currentStep >= step.id ? 'text-white' : 'text-white/50'
                                )}
                            >
                                {step.title}
                            </p>
                            <p className="text-sm text-white/40">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
