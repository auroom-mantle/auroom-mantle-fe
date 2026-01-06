// API Route: Treasury-Assisted Redeem
// POST /api/redeem/treasury-assisted

import { NextRequest, NextResponse } from 'next/server';
import { createIDRXClient, isDemoMode } from '@/lib/idrx/client-factory';
import type { TreasuryAssistedRequest } from '@/lib/idrx/types';

export async function POST(request: NextRequest) {
    try {
        const body: TreasuryAssistedRequest = await request.json();

        // Validation
        if (!body.amount || !body.bankAccount || !body.walletAddress) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate wallet address format
        if (!/^0x[a-fA-F0-9]{40}$/.test(body.walletAddress)) {
            return NextResponse.json(
                { error: 'Invalid wallet address format' },
                { status: 400 }
            );
        }

        // Validate bank account (10-12 digits)
        if (!/^\d{10,12}$/.test(body.bankAccount)) {
            return NextResponse.json(
                { error: 'Invalid bank account number (must be 10-12 digits)' },
                { status: 400 }
            );
        }

        // Validate amount (positive number)
        const amount = parseFloat(body.amount);
        if (isNaN(amount) || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Create IDRX client
        const client = createIDRXClient();

        // Submit treasury-assisted request
        const result = await client.submitTreasuryAssistedRequest(body);

        // Return response
        return NextResponse.json({
            success: true,
            data: result,
            message: isDemoMode()
                ? '✅ DEMO MODE: Redeem request queued (simulated)'
                : 'Redeem request queued for treasury processing',
            estimatedProcessingTime: '24 hours',
            isDemoMode: isDemoMode(),
        });
    } catch (error: any) {
        console.error('Treasury-assisted redeem error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to submit treasury request',
            },
            { status: 500 }
        );
    }
}
