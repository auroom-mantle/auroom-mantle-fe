// API Route: Self-Service Redeem
// POST /api/redeem/self-service

import { NextRequest, NextResponse } from 'next/server';
import { createIDRXClient, isDemoMode } from '@/lib/idrx/client-factory';
import type { IDRXRedeemRequest } from '@/lib/idrx/types';

export async function POST(request: NextRequest) {
    console.log('\n🔔 [API] Incoming POST /api/redeem/self-service');

    try {
        const body: IDRXRedeemRequest = await request.json();

        console.log('📦 [API] Request body:', body);

        // Validation
        if (!body.txHash || !body.amount || !body.bankAccount || !body.walletAddress) {
            console.error('❌ [API] Validation failed: Missing required fields');
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate wallet address format
        if (!/^0x[a-fA-F0-9]{40}$/.test(body.walletAddress)) {
            console.error('❌ [API] Validation failed: Invalid wallet address format');
            return NextResponse.json(
                { error: 'Invalid wallet address format' },
                { status: 400 }
            );
        }

        // Validate bank account (10-12 digits)
        if (!/^\d{10,12}$/.test(body.bankAccount)) {
            console.error('❌ [API] Validation failed: Invalid bank account number');
            return NextResponse.json(
                { error: 'Invalid bank account number (must be 10-12 digits)' },
                { status: 400 }
            );
        }

        // Validate amount (positive number)
        const amount = parseFloat(body.amount);
        if (isNaN(amount) || amount <= 0) {
            console.error('❌ [API] Validation failed: Invalid amount');
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Check if amount exceeds self-service limit (250M IDR)
        if (amount > 250_000_000) {
            console.error('❌ [API] Validation failed: Amount exceeds self-service limit');
            return NextResponse.json(
                {
                    error: 'Amount exceeds self-service limit (250M IDR)',
                    suggestion: 'Please use treasury-assisted mode for amounts > 250M IDR',
                },
                { status: 400 }
            );
        }

        console.log('✅ [API] All validations passed');
        console.log('🔗 [API] Creating IDRX client...');

        // Create IDRX client
        const client = createIDRXClient();

        console.log('📤 [API] Submitting redeem request to IDRX client...');

        // Submit redeem request
        const result = await client.submitRedeemRequest(body);

        console.log('📥 [API] IDRX client response:', result);
        console.log('✅ [API] Redeem request processed successfully');

        // Return response with statusCode field
        return NextResponse.json({
            statusCode: 201,
            message: isDemoMode()
                ? 'success'
                : 'Redeem request submitted successfully',
            data: result,
            isDemoMode: isDemoMode(),
        });
    } catch (error: any) {
        console.error('❌ [API] Self-service redeem error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to submit redeem request',
            },
            { status: 500 }
        );
    }
}
