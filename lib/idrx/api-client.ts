// Real IDRX API Client for Production Mode

import crypto from 'crypto';
import type {
    IDRXRedeemRequest,
    IDRXRedeemResponse,
    TreasuryAssistedRequest,
    TreasuryAssistedResponse,
    RedeemStatusResponse,
} from './types';

export class IDRXApiClient {
    private apiKey: string;
    private apiSecret: string;
    private baseUrl: string;

    constructor(apiKey: string, apiSecret: string, baseUrl?: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        // Use provided baseUrl, then env variable, then fallback
        this.baseUrl = baseUrl || process.env.IDRX_API_BASE_URL || 'http://localhost:3001';
    }

    /**
     * Submit self-service redeem request to IDRX API
     */
    async submitRedeemRequest(
        request: IDRXRedeemRequest
    ): Promise<IDRXRedeemResponse> {
        const endpoint = '/v1/redeem/burn';
        const payload = {
            txHash: request.txHash,
            amount: request.amount,
            bankAccount: request.bankAccount,
            bankCode: request.bankCode,
            bankName: request.bankName,
            bankAccountName: request.bankAccountName,
            walletAddress: request.walletAddress,
        };

        const signature = this.generateHMAC(payload);

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey,
                'X-Signature': signature,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit redeem request');
        }

        return response.json();
    }

    /**
     * Submit treasury-assisted redeem request
     */
    async submitTreasuryAssistedRequest(
        request: TreasuryAssistedRequest
    ): Promise<TreasuryAssistedResponse> {
        const endpoint = '/v1/redeem/treasury';
        const payload = {
            amount: request.amount,
            bankAccount: request.bankAccount,
            bankCode: request.bankCode,
            bankName: request.bankName,
            bankAccountName: request.bankAccountName,
            walletAddress: request.walletAddress,
        };

        const signature = this.generateHMAC(payload);

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey,
                'X-Signature': signature,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit treasury request');
        }

        return response.json();
    }

    /**
     * Check redeem status
     */
    async checkRedeemStatus(requestId: number): Promise<RedeemStatusResponse> {
        const endpoint = `/v1/redeem/status/${requestId}`;
        const signature = this.generateHMAC({ requestId });

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'X-API-Key': this.apiKey,
                'X-Signature': signature,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to check status');
        }

        return response.json();
    }

    /**
     * Generate HMAC signature for API authentication
     */
    private generateHMAC(payload: any): string {
        const message = JSON.stringify(payload);
        const hmac = crypto.createHmac('sha256', this.apiSecret);
        hmac.update(message);
        return hmac.digest('hex');
    }
}
