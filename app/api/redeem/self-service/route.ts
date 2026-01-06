// API Route: Self-Service Redeem
// POST /api/redeem/self-service

import { NextRequest, NextResponse } from 'next/server';
import { createIDRXClient, isDemoMode } from '@/lib/idrx/client-factory';
import type { IDRXRedeemRequest } from '@/lib/idrx/types';

export async function POST(request: NextRequest) {
    try {
        const body: IDRXRedeemRequest = await request.json();

        // Validation
        if (!body.txHash || !body.amount || !body.bankAccount || !body.walletAddress) {
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

        // Check if amount exceeds self-service limit (250M IDR)
        if (amount > 250_000_000) {
            return NextResponse.json(
                {
                    error: 'Amount exceeds self-service limit (250M IDR)',
                    suggestion: 'Please use treasury-assisted mode for amounts > 250M IDR',
                },
                { status: 400 }
            );
        }

        // Create IDRX client
        const client = createIDRXClient();

        // Submit redeem request
        const result = await client.submitRedeemRequest(body);

        // Return response
        return NextResponse.json({
            success: true,
            data: result,
            message: isDemoMode()
                ? '✅ DEMO MODE: Redeem request simulated successfully'
                : 'Redeem request submitted successfully',
            isDemoMode: isDemoMode(),
        });
    } catch (error: any) {
        console.error('Self-service redeem error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to submit redeem request',
            },
            { status: 500 }
        );
    }
}
