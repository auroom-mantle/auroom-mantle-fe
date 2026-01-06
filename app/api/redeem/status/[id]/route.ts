// API Route: Check Redeem Status
// GET /api/redeem/status/[id]

import { NextRequest, NextResponse } from 'next/server';
import { createIDRXClient, isDemoMode } from '@/lib/idrx/client-factory';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const requestId = parseInt(id, 10);

        if (isNaN(requestId)) {
            return NextResponse.json(
                { error: 'Invalid request ID' },
                { status: 400 }
            );
        }

        // Create IDRX client
        const client = createIDRXClient();

        // Check status
        const result = await client.checkRedeemStatus(requestId);

        // Return response
        return NextResponse.json({
            success: true,
            data: result,
            isDemoMode: isDemoMode(),
        });
    } catch (error: any) {
        console.error('Status check error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to check redeem status',
            },
            { status: 500 }
        );
    }
}
