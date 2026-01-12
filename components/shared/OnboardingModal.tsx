'use client';

import { useState, useEffect } from 'react';
import { X, Coins, Banknote, ArrowRight, CheckCircle2 } from 'lucide-react';

const ONBOARDING_KEY = 'auroom_onboarding_completed';

const steps = [
    {
        icon: Coins,
        title: 'Deposit Gold as Collateral',
        description: 'Use your XAUT (digital gold) as collateral to secure your loan.',
    },
    {
        icon: Banknote,
        title: 'Receive Cash Instantly',
        description: 'Get IDRX (digital Rupiah) deposited directly—no paperwork, no delays.',
    },
    {
        icon: CheckCircle2,
        title: 'Repay & Reclaim',
        description: 'Pay back your loan anytime and get your gold returned immediately.',
    },
];

export function OnboardingModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if user has completed onboarding
        const completed = localStorage.getItem(ONBOARDING_KEY);
        if (!completed) {
            // Small delay to let the app load first
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="relative p-6 pb-4 bg-gradient-to-b from-yellow-500/10 to-transparent">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold text-white">
                        Welcome to <span className="text-yellow-400">AuRoom</span>
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                        Digital Pawnshop for Gold Holders
                    </p>
                </div>

                {/* Steps */}
                <div className="p-6 pt-2 space-y-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                <step.icon className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{step.title}</h3>
                                <p className="text-sm text-white/60">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="p-6 pt-2">
                    <button
                        onClick={handleClose}
                        className="w-full flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
