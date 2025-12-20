"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useInjectYield } from '@/hooks/admin/useInjectYield';
import { useGoldVault } from '@/hooks/contracts/useGoldVault';
import { parseUnits, formatUnits } from 'viem';
import { Loader2, TrendingUp, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * VaultTab - Vault management tab (admin only)
 */
export function VaultTab() {
    const { toast } = useToast();
    const [yieldAmount, setYieldAmount] = useState('');
    const { useTotalAssets, useTotalSupply } = useGoldVault();
    const { data: totalAssets } = useTotalAssets();
    const { data: totalSupply } = useTotalSupply();
    const { injectYield, isPending, isConfirming, isSuccess } = useInjectYield();

    // Calculate current share price
    const currentSharePrice = totalAssets && totalSupply && totalSupply > BigInt(0)
        ? Number(formatUnits(totalAssets, 6)) / Number(formatUnits(totalSupply, 6))
        : 1;

    // Calculate new share price after injection
    const yieldAmountNum = parseFloat(yieldAmount) || 0;
    const newTotalAssets = totalAssets ? Number(formatUnits(totalAssets, 6)) + yieldAmountNum : yieldAmountNum;
    const newSharePrice = totalSupply && totalSupply > BigInt(0)
        ? newTotalAssets / Number(formatUnits(totalSupply, 6))
        : 1;
    const yieldPercentage = ((newSharePrice - currentSharePrice) / currentSharePrice) * 100;

    const handleInjectYield = () => {
        if (!yieldAmount || yieldAmountNum <= 0) {
            toast({
                title: "Invalid amount",
                description: "Please enter a valid yield amount",
                variant: "destructive",
            });
            return;
        }

        const amountBigInt = parseUnits(yieldAmount, 6);
        injectYield(amountBigInt);

        toast({
            title: "Injecting yield...",
            description: `Minting ${yieldAmount} XAUT to vault`,
        });
    };

    const handlePresetYield = (percentage: number) => {
        if (!totalAssets) return;
        const currentTVL = Number(formatUnits(totalAssets, 6));
        const amount = (currentTVL * percentage) / 100;
        setYieldAmount(amount.toFixed(6));
    };

    return (
        <div className="space-y-6">
            {/* Vault Statistics */}
            <Card>
                <CardHeader>
                    <CardTitle>Vault Statistics</CardTitle>
                    <CardDescription>Current state of the Gold Vault</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">TVL</p>
                            <p className="text-2xl font-bold">
                                {totalAssets ? parseFloat(formatUnits(totalAssets, 6)).toFixed(2) : '0.00'}
                            </p>
                            <p className="text-xs text-muted-foreground">XAUT</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Shares</p>
                            <p className="text-2xl font-bold">
                                {totalSupply ? parseFloat(formatUnits(totalSupply, 6)).toFixed(2) : '0.00'}
                            </p>
                            <p className="text-xs text-muted-foreground">gXAUT</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Share Price</p>
                            <p className="text-2xl font-bold">
                                {currentSharePrice.toFixed(6)}
                            </p>
                            <p className="text-xs text-muted-foreground">XAUT/gXAUT</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Est. APY</p>
                            <p className="text-2xl font-bold">~12.5%</p>
                            <p className="text-xs text-muted-foreground">(Simulated)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Yield Injector */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Inject Yield (Simulate Profit)
                    </CardTitle>
                    <CardDescription>
                        Mint XAUT directly to vault to simulate yield generation
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Current State */}
                    <div className="p-4 rounded-lg border bg-muted/50">
                        <p className="text-sm font-medium mb-2">Current State</p>
                        <div className="space-y-1 text-sm">
                            <p>Total Assets: <span className="font-mono">{totalAssets ? formatUnits(totalAssets, 6) : '0.000000'} XAUT</span></p>
                            <p>Total Shares: <span className="font-mono">{totalSupply ? formatUnits(totalSupply, 6) : '0.000000'} gXAUT</span></p>
                            <p>Share Price: <span className="font-mono">{currentSharePrice.toFixed(6)} XAUT per gXAUT</span></p>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="space-y-2">
                        <Label htmlFor="yieldAmount">Inject Amount (XAUT)</Label>
                        <Input
                            id="yieldAmount"
                            type="number"
                            placeholder="0.00"
                            value={yieldAmount}
                            onChange={(e) => setYieldAmount(e.target.value)}
                            step="0.000001"
                            min="0"
                        />
                    </div>

                    {/* Preview */}
                    {yieldAmountNum > 0 && (
                        <div className="p-4 rounded-lg border bg-primary/5">
                            <p className="text-sm font-medium mb-2">Preview After Injection</p>
                            <div className="space-y-1 text-sm">
                                <p>New Total Assets: <span className="font-mono">{newTotalAssets.toFixed(6)} XAUT</span></p>
                                <p>New Share Price: <span className="font-mono">{newSharePrice.toFixed(6)} XAUT per gXAUT</span></p>
                                <p>Yield Generated: <span className="font-mono text-green-600 dark:text-green-400">+{yieldPercentage.toFixed(2)}%</span></p>
                            </div>
                        </div>
                    )}

                    <Button
                        onClick={handleInjectYield}
                        disabled={!yieldAmount || yieldAmountNum <= 0 || isPending || isConfirming}
                        className="w-full"
                    >
                        {isPending || isConfirming ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Injecting...
                            </>
                        ) : (
                            <>
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Inject Yield
                            </>
                        )}
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        ⚠️ This will mint XAUT directly to vault to simulate yield from LP fees or other revenue sources
                    </p>
                </CardContent>
            </Card>

            {/* Quick Yield Presets */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Quick Yield Presets
                    </CardTitle>
                    <CardDescription>
                        Based on current TVL ({totalAssets ? parseFloat(formatUnits(totalAssets, 6)).toFixed(2) : '0.00'} XAUT)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Button variant="outline" onClick={() => handlePresetYield(1)}>
                            +1% = {totalAssets ? (Number(formatUnits(totalAssets, 6)) * 0.01).toFixed(2) : '0.00'} XAUT
                        </Button>
                        <Button variant="outline" onClick={() => handlePresetYield(5)}>
                            +5% = {totalAssets ? (Number(formatUnits(totalAssets, 6)) * 0.05).toFixed(2) : '0.00'} XAUT
                        </Button>
                        <Button variant="outline" onClick={() => handlePresetYield(10)}>
                            +10% = {totalAssets ? (Number(formatUnits(totalAssets, 6)) * 0.10).toFixed(2) : '0.00'} XAUT
                        </Button>
                        <Button variant="outline" onClick={() => handlePresetYield(25)}>
                            +25% = {totalAssets ? (Number(formatUnits(totalAssets, 6)) * 0.25).toFixed(2) : '0.00'} XAUT
                        </Button>
                        <Button variant="outline" onClick={() => handlePresetYield(50)}>
                            +50% = {totalAssets ? (Number(formatUnits(totalAssets, 6)) * 0.50).toFixed(2) : '0.00'} XAUT
                        </Button>
                        <Button variant="outline" onClick={() => handlePresetYield(100)}>
                            +100% = {totalAssets ? (Number(formatUnits(totalAssets, 6)) * 1.00).toFixed(2) : '0.00'} XAUT
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
