// Hook: useRedeemStatus
// Check status of redeem request

'use client';

import { useState, useCallback } from 'react';

interface StatusResponse {
    success: boolean;
    data?: {
        id: number;
        status: string;
        amount: string;
        custRefNumber?: string;
        createdAt: string;
        updatedAt: string;
    };
    isDemoMode: boolean;
    error?: string;
}

export function useRedeemStatus() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<StatusResponse | null>(null);

    const checkStatus = useCallback(async (requestId: number): Promise<StatusResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/redeem/status/${requestId}`);
            const result: StatusResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to check status');
            }

            setData(result);
            return result;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to check status';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    };

    return {
        checkStatus,
        loading,
        error,
        data,
        reset,
    };
}
