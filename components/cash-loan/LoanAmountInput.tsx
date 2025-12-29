'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatInputValue, parseRupiahInput } from '@/lib/utils/format';
import { parseUnits } from 'viem';

interface LoanAmountInputProps {
    value: string;
    onChange: (value: string) => void;
    maxLoan: bigint;
    disabled?: boolean;
}

export function LoanAmountInput({ value, onChange, maxLoan, disabled }: LoanAmountInputProps) {
    const quickAmounts = [
        { label: 'Rp 1jt', value: parseUnits('1000000', 6) },
        { label: 'Rp 5jt', value: parseUnits('5000000', 6) },
        { label: 'Rp 10jt', value: parseUnits('10000000', 6) },
        { label: 'Rp 50jt', value: parseUnits('50000000', 6) },
        { label: 'Rp 100jt', value: parseUnits('100000000', 6) },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        onChange(rawValue);
    };

    const handleQuickAmount = (amount: bigint) => {
        const value = (Number(amount) / 1e6).toString();
        onChange(value);
    };

    const displayValue = value ? formatInputValue(value) : '';

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30">
            <h3 className="text-lg font-semibold text-white mb-4">
                💵 HOW MUCH DO YOU NEED?
            </h3>

            <div className="space-y-4">
                {/* Input Field */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl font-semibold">
                        Rp
                    </div>
                    <Input
                        type="text"
                        placeholder="0"
                        value={displayValue}
                        onChange={handleInputChange}
                        disabled={disabled}
                        className="bg-black/40 border-yellow-500/30 text-white text-3xl h-20 pl-16 pr-4 text-right font-bold"
                    />
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-5 gap-2">
                    {quickAmounts.map((amount) => (
                        <Button
                            key={amount.label}
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickAmount(amount.value)}
                            disabled={disabled || amount.value > maxLoan}
                            className="border-yellow-500/30 hover:bg-yellow-500/10 text-xs font-semibold disabled:opacity-30"
                        >
                            {amount.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
