"use client";

import { ContractAddresses } from './ContractAddresses';
import { NetworkInfo } from './NetworkInfo';

/**
 * InfoTab - Main wrapper for info tab
 */
export function InfoTab() {
    return (
        <div className="space-y-6">
            <ContractAddresses />
            <NetworkInfo />
        </div>
    );
}
