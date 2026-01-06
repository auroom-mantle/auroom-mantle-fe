// Hook: useRedeemTreasuryAssisted
// Submit treasury-assisted redeem request (>250M IDR)

'use client';

import { useState } from 'react';

interface TreasuryRequest {
    amount: string;
    bankAccount: string;
    bankCode: string;
    bankName: string;
    bankAccountName: string;
    walletAddress: string;
}

interface TreasuryResponse {
    success: boolean;
    data?: {
        status: string;
        amount: string;
    };
    message: string;
    estimatedProcessingTime: string;
    isDemoMode: boolean;
    error?: string;
}

export function useRedeemTreasuryAssisted() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<TreasuryResponse | null>(null);

    const submitTreasuryRedeem = async (
        request: TreasuryRequest
    ): Promise<TreasuryResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/redeem/treasury-assisted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            const result: TreasuryResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit treasury request');
            }

            setData(result);
            return result;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to submit treasury request';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    };

    return {
        submitTreasuryRedeem,
        loading,
        error,
        data,
        reset,
    };
}
