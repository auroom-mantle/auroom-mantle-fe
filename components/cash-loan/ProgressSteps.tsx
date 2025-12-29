'use client';

import { CheckCircle2, Circle } from 'lucide-react';

interface Step {
    id: number;
    title: string;
    description: string;
}

interface ProgressStepsProps {
    currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
    const steps: Step[] = [
        {
            id: 1,
            title: 'Enter Amount',
            description: 'How much cash do you need?',
        },
        {
            id: 2,
            title: 'Set Safety Level',
            description: 'Choose default or custom',
        },
        {
            id: 3,
            title: 'Bank Details',
            description: 'Where to send the money',
        },
        {
            id: 4,
            title: 'Review & Confirm',
            description: 'Check and submit',
        },
    ];

    return (
        <div className="w-full py-8">
            {/* Desktop View */}
            <div className="hidden md:block">
                <div className="flex items-center justify-between max-w-3xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center flex-1">
                            {/* Step Circle */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${currentStep >= step.id
                                            ? 'bg-yellow-500 border-yellow-500 text-black'
                                            : 'bg-zinc-900 border-yellow-500/30 text-white/50'
                                        }`}
                                >
                                    {currentStep > step.id ? (
                                        <CheckCircle2 className="w-6 h-6" />
                                    ) : (
                                        <span className="font-bold">{step.id}</span>
                                    )}
                                </div>
                                <div className="mt-3 text-center">
                                    <p
                                        className={`text-sm font-semibold ${currentStep >= step.id ? 'text-white' : 'text-white/50'
                                            }`}
                                    >
                                        {step.title}
                                    </p>
                                    <p className="text-xs text-white/40 mt-1">{step.description}</p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-0.5 mx-4 -mt-16">
                                    <div
                                        className={`h-full transition-all ${currentStep > step.id ? 'bg-yellow-500' : 'bg-yellow-500/20'
                                            }`}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-3">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${currentStep === step.id
                                ? 'bg-yellow-500/10 border-yellow-500'
                                : currentStep > step.id
                                    ? 'bg-green-500/10 border-green-500/30'
                                    : 'bg-zinc-900 border-yellow-500/20'
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${currentStep > step.id
                                    ? 'bg-green-500 text-white'
                                    : currentStep === step.id
                                        ? 'bg-yellow-500 text-black'
                                        : 'bg-zinc-800 text-white/50'
                                }`}
                        >
                            {currentStep > step.id ? (
                                <CheckCircle2 className="w-5 h-5" />
                            ) : (
                                <span className="text-sm font-bold">{step.id}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <p
                                className={`text-sm font-semibold ${currentStep >= step.id ? 'text-white' : 'text-white/50'
                                    }`}
                            >
                                {step.title}
                            </p>
                            <p className="text-xs text-white/40">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
