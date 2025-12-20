"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAllBalances } from '@/hooks/admin/useAllBalances';
import { useGoldVault } from '@/hooks/contracts/useGoldVault';
import { useIdentityRegistry } from '@/hooks/contracts/useIdentityRegistry';
import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { Coins, Vault, Shield, TrendingUp } from 'lucide-react';

/**
 * AdminDashboard - Overview dashboard with key stats
 */
export function AdminDashboard() {
    const { address } = useAccount();
    const { balances } = useAllBalances();
    const { data: nativeBalance } = useBalance({ address });
    const { useTotalAssets, useTotalSupply } = useGoldVault();
    const { data: totalAssets } = useTotalAssets();
    const { data: totalSupply } = useTotalSupply();
    const { useIsVerified } = useIdentityRegistry();
    const { data: isVerified } = useIsVerified(address);

    // Calculate share price
    const sharePrice = totalAssets && totalSupply && totalSupply > BigInt(0)
        ? Number(formatUnits(totalAssets, 6)) / Number(formatUnits(totalSupply, 6))
        : 0;

    const idrxBalance = balances.find(b => b.symbol === 'IDRX');
    const usdcBalance = balances.find(b => b.symbol === 'USDC');
    const xautBalance = balances.find(b => b.symbol === 'XAUT');
    const gxautBalance = balances.find(b => b.symbol === 'gXAUT');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Helper Tools</h1>
                <p className="text-muted-foreground mt-2">
                    Testing and debugging utilities for AuRoom Protocol
                </p>
            </div>

            {/* User Info */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Connected Wallet</p>
                            <p className="font-mono text-sm">
                                {address ? `${address.slice(0, 10)}...${address.slice(-8)}` : 'Not connected'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Verification Status</p>
                            <p className="text-sm font-medium">
                                {isVerified ? (
                                    <span className="text-green-600 dark:text-green-400">✓ Verified</span>
                                ) : (
                                    <span className="text-amber-600 dark:text-amber-400">⚠ Not Verified</span>
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Network</p>
                            <p className="text-sm font-medium">Mantle Sepolia (5003)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Coins className="h-4 w-4 text-rose-500" />
                            IDRX
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {idrxBalance ? parseFloat(idrxBalance.formatted).toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0.00'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Indonesian Rupiah</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Coins className="h-4 w-4 text-blue-500" />
                            USDC
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {usdcBalance ? parseFloat(usdcBalance.formatted).toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0.00'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">USD Coin</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Coins className="h-4 w-4 text-amber-500" />
                            XAUT
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {xautBalance ? parseFloat(xautBalance.formatted).toFixed(6) : '0.000000'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Tether Gold</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Vault className="h-4 w-4 text-yellow-500" />
                            gXAUT
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {gxautBalance ? parseFloat(gxautBalance.formatted).toFixed(6) : '0.000000'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Gold Vault Token</p>
                    </CardContent>
                </Card>
            </div>

            {/* Vault Stats */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Vault Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Value Locked</p>
                            <p className="text-xl font-bold">
                                {totalAssets ? parseFloat(formatUnits(totalAssets, 6)).toFixed(2) : '0.00'} XAUT
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Share Price</p>
                            <p className="text-xl font-bold">
                                {sharePrice.toFixed(6)} XAUT/gXAUT
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Shares</p>
                            <p className="text-xl font-bold">
                                {totalSupply ? parseFloat(formatUnits(totalSupply, 6)).toFixed(2) : '0.00'} gXAUT
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
