// API Route: Health Check
// GET /api/health

import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/idrx/client-factory';

export async function GET() {
    try {
        const isDemo = isDemoMode();

        return NextResponse.json({
            status: 'ok',
            isDemoMode: isDemo,
            mode: isDemo ? 'demo' : 'production',
            features: {
                idrxApi: isDemo ? 'mock' : 'real',
                blockchain: 'connected',
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: 'error',
                message: error.message,
            },
            { status: 500 }
        );
    }
}
