// Mock IDRX Client for Demo Mode

import type {
    IDRXRedeemRequest,
    IDRXRedeemResponse,
    TreasuryAssistedRequest,
    TreasuryAssistedResponse,
    RedeemStatusResponse,
} from './types';

export class MockIDRXClient {
    private requestCounter = 1000;

    /**
     * Simulate self-service redeem request
     */
    async submitRedeemRequest(
        request: IDRXRedeemRequest
    ): Promise<IDRXRedeemResponse> {
        // Simulate API delay
        await this.delay(500);

        // Generate mock reference number
        const custRefNumber = `DEMO${Date.now()}`;

        const response: IDRXRedeemResponse = {
            id: this.requestCounter++,
            custRefNumber,
            burnStatus: 'REQUESTED',
            amount: request.amount,
            bankName: request.bankName,
        };

        console.log('🎭 DEMO MODE: Mock redeem request submitted', response);

        return response;
    }

    /**
     * Simulate treasury-assisted redeem request
     */
    async submitTreasuryAssistedRequest(
        request: TreasuryAssistedRequest
    ): Promise<TreasuryAssistedResponse> {
        // Simulate API delay
        await this.delay(500);

        const response: TreasuryAssistedResponse = {
            status: 'PENDING',
            amount: request.amount,
            estimatedProcessingTime: '24 hours',
        };

        console.log('🎭 DEMO MODE: Mock treasury request submitted', response);

        return response;
    }

    /**
     * Simulate status check
     */
    async checkRedeemStatus(requestId: number): Promise<RedeemStatusResponse> {
        // Simulate API delay
        await this.delay(300);

        const response: RedeemStatusResponse = {
            id: requestId,
            status: 'PROCESSING',
            amount: '50000',
            custRefNumber: `DEMO${requestId}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        console.log('🎭 DEMO MODE: Mock status check', response);

        return response;
    }

    /**
     * Simulate delay
     */
    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
