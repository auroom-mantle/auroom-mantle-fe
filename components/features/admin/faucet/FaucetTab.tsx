"use client";

import { QuickFaucet } from './QuickFaucet';
import { MintTokenForm } from './MintTokenForm';
import { ExternalFaucet } from './ExternalFaucet';

/**
 * FaucetTab - Main wrapper for faucet tab
 */
export function FaucetTab() {
    return (
        <div className="space-y-6">
            <QuickFaucet />
            <MintTokenForm />
            <ExternalFaucet />
        </div>
    );
}
