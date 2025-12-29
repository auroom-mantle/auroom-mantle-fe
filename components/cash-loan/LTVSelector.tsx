'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface LTVSelectorProps {
    selectedLTV: number;
    onLTVChange: (ltv: number) => void;
    disabled?: boolean;
}

export function LTVSelector({ selectedLTV, onLTVChange, disabled }: LTVSelectorProps) {
    const [mode, setMode] = useState<'default' | 'custom'>('default');

    const handleModeChange = (newMode: 'default' | 'custom') => {
        setMode(newMode);
        if (newMode === 'default') {
            onLTVChange(30); // Reset to 30% when switching to default
        }
    };

    const getLTVDescription = (ltv: number) => {
        if (ltv <= 30) {
            return {
                title: 'Very Safe',
                description: 'Your gold is well-protected. You can borrow more later if needed.',
                color: 'text-green-500',
                bgColor: 'bg-green-500/10',
                borderColor: 'border-green-500/30',
            };
        } else if (ltv <= 50) {
            return {
                title: 'Safe',
                description: 'Good balance between loan amount and safety.',
                color: 'text-blue-500',
                bgColor: 'bg-blue-500/10',
                borderColor: 'border-blue-500/30',
            };
        } else if (ltv <= 70) {
            return {
                title: 'Moderate',
                description: 'Higher loan, but watch gold price movements.',
                color: 'text-yellow-500',
                bgColor: 'bg-yellow-500/10',
                borderColor: 'border-yellow-500/30',
            };
        } else {
            return {
                title: 'Risky',
                description: 'Maximum loan, but small price drops could trigger liquidation.',
                color: 'text-red-500',
                bgColor: 'bg-red-500/10',
                borderColor: 'border-red-500/30',
            };
        }
    };

    const description = getLTVDescription(selectedLTV);

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30">
            <div className="flex items-start gap-2 mb-4">
                <h3 className="text-lg font-semibold text-white">⚖️ LOAN SAFETY LEVEL</h3>
                <div className="group relative">
                    <Info className="w-4 h-4 text-white/50 cursor-help" />
                    <div className="absolute left-0 top-6 w-64 p-3 bg-black border border-yellow-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <p className="text-xs text-white/80">
                            This controls how much you can borrow based on your gold value.
                            Lower = safer but smaller loan. Higher = bigger loan but riskier.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mode Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                    onClick={() => handleModeChange('default')}
                    disabled={disabled}
                    variant={mode === 'default' ? 'default' : 'outline'}
                    className={`h-12 ${mode === 'default'
                        ? 'bg-gradient-to-r from-green-400 to-green-600 text-black font-bold'
                        : 'border-yellow-500/30 hover:bg-yellow-500/10'
                        }`}
                >
                    ✅ Default (30%)
                    <span className="ml-2 text-xs opacity-80">Recommended</span>
                </Button>
                <Button
                    onClick={() => handleModeChange('custom')}
                    disabled={disabled}
                    variant={mode === 'custom' ? 'default' : 'outline'}
                    className={`h-12 ${mode === 'custom'
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold'
                        : 'border-yellow-500/30 hover:bg-yellow-500/10'
                        }`}
                >
                    ⚙️ Custom
                </Button>
            </div>

            {/* Custom Slider */}
            {mode === 'custom' && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-white/70 text-sm">Adjust your safety level:</span>
                            <span className="text-white font-bold text-lg">{selectedLTV}%</span>
                        </div>
                        <input
                            type="range"
                            min={10}
                            max={75}
                            step={5}
                            value={selectedLTV}
                            onChange={(e) => onLTVChange(Number(e.target.value))}
                            disabled={disabled}
                            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        />
                        <div className="flex items-center justify-between text-xs text-white/50">
                            <span>10% (Safest)</span>
                            <span>75% (Maximum)</span>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className={`p-4 rounded-xl border ${description.bgColor} ${description.borderColor}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`font-bold ${description.color}`}>{description.title}</span>
                        </div>
                        <p className="text-white/70 text-sm">{description.description}</p>
                    </div>
                </div>
            )}

            {/* Default Explanation */}
            {mode === 'default' && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <p className="text-white/80 text-sm">
                        <span className="font-semibold text-green-400">Default mode (30%)</span> is recommended for most users.
                        It provides a good balance between loan amount and safety. Your gold is well-protected from price fluctuations.
                    </p>
                </div>
            )}

            {/* Simple Explanation */}
            <div className="mt-4 p-3 rounded-lg bg-black/40 border border-yellow-500/20">
                <p className="text-white/60 text-xs">
                    💡 <span className="font-semibold">Simple explanation:</span> If you choose 30%, you can borrow up to 30% of your gold's value.
                    The remaining 70% acts as a safety buffer to protect you from gold price drops.
                </p>
            </div>
        </div>
    );
}
