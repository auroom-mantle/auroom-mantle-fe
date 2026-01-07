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
    statusCode: number;
    success?: boolean; // For backward compatibility
    message: string;
    data?: {
        id: number;
        chainId: number;
        userId: number;
        requester: string;
        txHash: string;
        fromAddress: string;
        amount: string;
        bankName: string;
        bankCode: string;
        bankAccountNumber: string;
        bankAccountName: string;
        bankAccountNumberHash: string | null;
        custRefNumber: string;
        disburseId: number;
        burnStatus: string;
        createdAt: string;
        updatedAt: string;
        deleted: boolean;
        reportStatus: string;
        notes: string | null;
    };
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

        console.log('🌐 [HTTP] POST /api/redeem/self-service');
        console.log('📤 Request body:', request);

        try {
            const response = await fetch('/api/redeem/self-service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            console.log('📡 [HTTP] Response status:', response.status, response.statusText);

            const result: RedeemResponse = await response.json();

            console.log('📥 [HTTP] Response body:', result);

            // Check if HTTP request was successful (200-299 range)
            if (!response.ok) {
                console.error('❌ [HTTP] Request failed - HTTP Status:', response.status);
                console.error('Error:', result.error || result.message);
                throw new Error(result.error || result.message || 'Failed to submit redeem request');
            }

            // Backward compatibility: Check both old format (success) and new format (statusCode)
            const isSuccess = result.success === true || result.statusCode === 201;

            if (!isSuccess) {
                console.error('❌ [HTTP] Backend returned error');
                console.error('Response:', result);
                throw new Error(result.error || result.message || 'Failed to submit redeem request');
            }

            console.log('✅ [HTTP] Request successful');
            setData(result);
            return result;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to submit redeem request';
            console.error('❌ [HTTP] Exception:', errorMessage);
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
