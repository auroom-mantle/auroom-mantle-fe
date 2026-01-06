// Hook: useBackendHealth
// Check backend health and demo mode status

'use client';

import { useEffect, useState } from 'react';

interface HealthCheckResponse {
    status: 'ok' | 'error';
    isDemoMode: boolean;
    mode: 'demo' | 'production';
    features: {
        idrxApi: 'mock' | 'real';
        blockchain: 'connected' | 'disconnected';
    };
}

export function useBackendHealth() {
    const [isDemoMode, setIsDemoMode] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<HealthCheckResponse | null>(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const response = await fetch('/api/health');
                const result: HealthCheckResponse = await response.json();

                if (response.ok) {
                    setData(result);
                    setIsDemoMode(result.isDemoMode);
                } else {
                    setError('Failed to check backend health');
                }
            } catch (err: any) {
                setError(err.message);
                console.error('Health check error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        checkHealth();
    }, []);

    return {
        isDemoMode,
        isLoading,
        error,
        data,
    };
}
