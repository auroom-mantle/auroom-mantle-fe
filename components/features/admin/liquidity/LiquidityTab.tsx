"use client";

import { Card } from '@/components/ui/card';

/**
 * LiquidityTab - Liquidity management tab (verified users only)
 * Placeholder for future implementation
 */
export function LiquidityTab() {
    return (
        <Card className="p-6">
            <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Liquidity Management</h3>
                <p className="text-muted-foreground">
                    Liquidity pool management features coming soon...
                </p>
                <p className="text-sm text-muted-foreground">
                    This tab will include:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Pool overview (IDRX/USDC and XAUT/USDC)</li>
                    <li>Add liquidity to pools</li>
                    <li>Remove liquidity from pools</li>
                    <li>LP token balance tracking</li>
                </ul>
            </div>
        </Card>
    );
}
