"use client";

import { BalanceTable } from './BalanceTable';

/**
 * DebugTab - Main wrapper for debug tab
 */
export function DebugTab() {
    return (
        <div className="space-y-6">
            <BalanceTable />
            {/* More debug tools will be added here */}
        </div>
    );
}
