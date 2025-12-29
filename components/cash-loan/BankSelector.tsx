'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { BANKS, type Bank } from '@/lib/config/banks';
import { cn } from '@/lib/utils';

interface BankSelectorProps {
    selectedBank: string;
    onBankChange: (bankId: string) => void;
    accountNumber: string;
    onAccountNumberChange: (value: string) => void;
    accountName: string;
    onAccountNameChange: (value: string) => void;
    disabled?: boolean;
}

export function BankSelector({
    selectedBank,
    onBankChange,
    accountNumber,
    onAccountNumberChange,
    accountName,
    onAccountNameChange,
    disabled,
}: BankSelectorProps) {
    // Show first 4 banks by default
    const mainBanks = BANKS.slice(0, 4);

    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers
        const value = e.target.value.replace(/[^\d]/g, '');
        onAccountNumberChange(value);
    };

    const handleAccountNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Auto uppercase
        const value = e.target.value.toUpperCase();
        onAccountNameChange(value);
    };

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30">
            <h3 className="text-lg font-semibold text-white mb-4">
                🏦 TRANSFER TO
            </h3>

            <div className="space-y-4">
                {/* Bank Selection */}
                <div>
                    <label className="text-white/70 text-sm mb-2 block">Select Bank</label>
                    <div className="grid grid-cols-4 gap-3">
                        {mainBanks.map((bank) => (
                            <button
                                key={bank.id}
                                onClick={() => !disabled && onBankChange(bank.id)}
                                disabled={disabled}
                                className={cn(
                                    'p-4 rounded-xl border-2 transition-all',
                                    'flex flex-col items-center gap-2',
                                    'hover:scale-105 active:scale-95',
                                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                                    selectedBank === bank.id
                                        ? 'bg-yellow-500/20 border-yellow-500 shadow-lg'
                                        : 'bg-black/40 border-yellow-500/20 hover:border-yellow-500/40'
                                )}
                            >
                                <span className="text-2xl font-bold text-white">{bank.shortName}</span>
                                {selectedBank === bank.id && (
                                    <span className="text-yellow-500 text-xl">●</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account Number */}
                <div>
                    <label className="text-white/70 text-sm mb-2 block">Account Number</label>
                    <Input
                        type="text"
                        placeholder="1234567890"
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                        disabled={disabled}
                        className="bg-black/40 border-yellow-500/30 text-white h-12"
                        maxLength={20}
                    />
                </div>

                {/* Account Name */}
                <div>
                    <label className="text-white/70 text-sm mb-2 block">Account Holder Name</label>
                    <Input
                        type="text"
                        placeholder="JOHN DOE"
                        value={accountName}
                        onChange={handleAccountNameChange}
                        disabled={disabled}
                        className="bg-black/40 border-yellow-500/30 text-white h-12 uppercase"
                        maxLength={50}
                    />
                </div>
            </div>
        </div>
    );
}
