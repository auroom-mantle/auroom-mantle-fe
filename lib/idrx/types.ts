// IDRX API Types and Interfaces

export interface IDRXRedeemRequest {
    txHash: string;
    amount: string;
    bankAccount: string;
    bankCode: string;
    bankName: string;
    bankAccountName: string;
    walletAddress: string;
}

export interface IDRXRedeemResponse {
    id: number;
    custRefNumber: string;
    burnStatus: 'REQUESTED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    amount: string;
    bankName: string;
}

export interface TreasuryAssistedRequest {
    amount: string;
    bankAccount: string;
    bankCode: string;
    bankName: string;
    bankAccountName: string;
    walletAddress: string;
}

export interface TreasuryAssistedResponse {
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    amount: string;
    estimatedProcessingTime: string;
}

export interface RedeemStatusResponse {
    id: number;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    amount: string;
    custRefNumber?: string;
    createdAt: string;
    updatedAt: string;
}

export interface HealthCheckResponse {
    status: 'ok' | 'error';
    isDemoMode: boolean;
    mode: 'demo' | 'production';
    features: {
        idrxApi: 'mock' | 'real';
        blockchain: 'connected' | 'disconnected';
    };
}

// Bank codes mapping
export const BANK_CODES: Record<string, string> = {
    bca: '014',
    mandiri: '008',
    bni: '009',
    bri: '002',
    cimb: '022',
    permata: '013',
    danamon: '011',
    btn: '200',
};

// Bank names mapping
export const BANK_NAMES: Record<string, string> = {
    bca: 'BANK CENTRAL ASIA',
    mandiri: 'BANK MANDIRI',
    bni: 'BANK NEGARA INDONESIA',
    bri: 'BANK RAKYAT INDONESIA',
    cimb: 'BANK CIMB NIAGA',
    permata: 'BANK PERMATA',
    danamon: 'BANK DANAMON',
    btn: 'BANK TABUNGAN NEGARA',
};
