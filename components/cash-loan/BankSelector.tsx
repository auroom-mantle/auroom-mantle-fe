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
        <div className="p-4 rounded-xl bg-zinc-900 border-2 border-yellow-500/30">
            <h3 className="text-base font-semibold text-white mb-3">
                🏦 TRANSFER TO
            </h3>

            <div className="space-y-3">
                {/* Bank Selection */}
                <div>
                    <label className="text-white/70 text-xs mb-1.5 block">Select Bank</label>
                    <div className="grid grid-cols-4 gap-2">
                        {mainBanks.map((bank) => (
                            <button
                                key={bank.id}
                                onClick={() => !disabled && onBankChange(bank.id)}
                                disabled={disabled}
                                className={cn(
                                    'p-3 rounded-lg border-2 transition-all',
                                    'flex flex-col items-center gap-1',
                                    'hover:scale-105 active:scale-95',
                                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                                    selectedBank === bank.id
                                        ? 'bg-yellow-500/20 border-yellow-500 shadow-lg'
                                        : 'bg-black/40 border-yellow-500/20 hover:border-yellow-500/40'
                                )}
                            >
                                <span className="text-xl font-bold text-white">{bank.shortName}</span>
                                {selectedBank === bank.id && (
                                    <span className="text-yellow-500 text-base">●</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account Number */}
                <div>
                    <label className="text-white/70 text-xs mb-1.5 block">Account Number</label>
                    <Input
                        type="text"
                        placeholder="1234567890"
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                        disabled={disabled}
                        className={cn(
                            "bg-black/40 border-yellow-500/30 text-white h-10 text-sm",
                            accountNumber && accountNumber.length < 10 && "border-red-500/50",
                            accountNumber && accountNumber.length >= 10 && accountNumber.length <= 12 && "border-green-500/50"
                        )}
                        maxLength={12}
                    />
                    <p className="text-xs text-white/50 mt-1">
                        {accountNumber.length > 0 && (
                            accountNumber.length < 10 ? (
                                <span className="text-red-400">⚠️ Minimum 10 digits ({accountNumber.length}/10)</span>
                            ) : accountNumber.length > 12 ? (
                                <span className="text-red-400">⚠️ Maximum 12 digits</span>
                            ) : (
                                <span className="text-green-400">✓ Valid ({accountNumber.length} digits)</span>
                            )
                        )}
                        {accountNumber.length === 0 && "Enter 10-12 digit account number"}
                    </p>
                </div>

                {/* Account Name */}
                <div>
                    <label className="text-white/70 text-xs mb-1.5 block">Account Holder Name</label>
                    <Input
                        type="text"
                        placeholder="JOHN DOE"
                        value={accountName}
                        onChange={handleAccountNameChange}
                        disabled={disabled}
                        className="bg-black/40 border-yellow-500/30 text-white h-10 text-sm uppercase"
                        maxLength={50}
                    />
                </div>
            </div>
        </div>
    );
}
