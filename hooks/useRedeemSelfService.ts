// Hook: useRedeemSelfService
// Submit self-service redeem request (≤250M IDR)

'use client';

import { useState } from 'react';

interface RedeemRequest {
    txHash: string;
    amount: string;
    bankAccount: string;
    bankCode: string;
    bankName: string;
    bankAccountName: string;
    walletAddress: string;
}

interface RedeemResponse {
    success: boolean;
    data?: {
        id: number;
        custRefNumber: string;
        burnStatus: string;
        amount: string;
        bankName: string;
    };
    message: string;
    isDemoMode: boolean;
    error?: string;
}

export function useRedeemSelfService() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<RedeemResponse | null>(null);

    const submitRedeem = async (request: RedeemRequest): Promise<RedeemResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/redeem/self-service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            const result: RedeemResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit redeem request');
            }

            setData(result);
            return result;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to submit redeem request';
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
        submitRedeem,
        loading,
        error,
        data,
        reset,
    };
}
