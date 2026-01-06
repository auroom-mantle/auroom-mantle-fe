// IDRX Client Factory - Switch between Demo and Production

import { MockIDRXClient } from './mock-client';
import { IDRXApiClient } from './api-client';

export type IDRXClient = MockIDRXClient | IDRXApiClient;

/**
 * Create IDRX client based on environment mode
 */
export function createIDRXClient(): IDRXClient {
    const mode = process.env.IDRX_MODE || 'demo';

    if (mode === 'production') {
        const apiKey = process.env.IDRX_API_KEY;
        const apiSecret = process.env.IDRX_API_SECRET;
        const baseUrl = process.env.IDRX_API_BASE_URL;

        if (!apiKey || !apiSecret) {
            throw new Error(
                'IDRX_API_KEY and IDRX_API_SECRET must be set in production mode'
            );
        }

        console.log('🔐 Production Mode: Using real IDRX API');
        return new IDRXApiClient(apiKey, apiSecret, baseUrl);
    }

    console.log('🎭 Demo Mode: Using mock IDRX client');
    return new MockIDRXClient();
}

/**
 * Check if running in demo mode
 */
export function isDemoMode(): boolean {
    return (process.env.IDRX_MODE || 'demo') === 'demo';
}
