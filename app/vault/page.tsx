'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TOKENS } from '@/lib/contracts/tokens';
import { CONTRACTS } from '@/lib/contracts/addresses';
import { useTokenBalance } from '@/hooks/contracts/useTokenBalance';
import { useTokenAllowance } from '@/hooks/contracts/useTokenAllowance';
import { useTokenApproval } from '@/hooks/contracts/useTokenApproval';
import { useGoldVault } from '@/hooks/contracts/useGoldVault';
import { useIdentityRegistry } from '@/hooks/contracts/useIdentityRegistry';
import { parseTokenAmount, formatTokenAmount, formatCompactNumber, getExplorerTxUrl } from '@/lib/utils/format';
import { isValidAmount } from '@/lib/utils/validation';

export default function VaultPage() {
    const { address, isConnected } = useAccount();
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    // Check verification status
    const { useIsVerified } = useIdentityRegistry();
    const { data: isVerified } = useIsVerified(address);

    // Vault hooks
    const vault = useGoldVault();
    const { data: totalAssets } = vault.useTotalAssets();
    const { data: totalSupply } = vault.useTotalSupply();

    // Get balances
    const { data: xautBalance } = useTokenBalance(TOKENS.XAUT.address, address);
    const { data: gxautBalance } = useTokenBalance(CONTRACTS.GoldVault, address);

    // Parse amounts
    const parsedDepositAmount = depositAmount && isValidAmount(depositAmount)
        ? parseTokenAmount(depositAmount, TOKENS.XAUT.decimals)
        : BigInt(0);

    const parsedWithdrawAmount = withdrawAmount && isValidAmount(withdrawAmount)
        ? parseTokenAmount(withdrawAmount, TOKENS.gXAUT.decimals)
        : BigInt(0);

    // Preview deposit/withdraw
    const { data: previewDepositShares } = vault.usePreviewDeposit(parsedDepositAmount);
    const { data: previewRedeemAssets } = vault.usePreviewRedeem(parsedWithdrawAmount);

    // Check allowance for deposits
    const { data: allowance } = useTokenAllowance(
        TOKENS.XAUT.address,
        address,
        CONTRACTS.GoldVault
    );

    const needsApproval = allowance !== undefined && allowance !== null && parsedDepositAmount > BigInt(0) && (allowance as bigint) < parsedDepositAmount;

    // Approval hook
    const approval = useTokenApproval(TOKENS.XAUT.address);

    // Calculate share price
    const sharePrice = totalAssets && totalSupply && (totalSupply as bigint) > BigInt(0)
        ? Number(totalAssets as bigint) / Number(totalSupply as bigint)
        : 1.0;

    // Calculate user's XAUT value
    const userXautValue = gxautBalance && totalAssets && totalSupply && (totalSupply as bigint) > BigInt(0)
        ? ((gxautBalance as bigint) * (totalAssets as bigint)) / (totalSupply as bigint)
        : BigInt(0);

    // Handle max buttons
    const handleMaxDeposit = () => {
        if (xautBalance) {
            setDepositAmount(formatTokenAmount(xautBalance as bigint, TOKENS.XAUT.decimals, 6));
        }
    };

    const handleMaxWithdraw = () => {
        if (gxautBalance) {
            setWithdrawAmount(formatTokenAmount(gxautBalance as bigint, TOKENS.gXAUT.decimals, 6));
        }
    };

    // Handle approve
    const handleApprove = () => {
        approval.approve(CONTRACTS.GoldVault);
    };

    // Handle deposit
    const handleDeposit = () => {
        if (!address || !parsedDepositAmount) return;
        vault.deposit(parsedDepositAmount, address);
    };

    // Handle withdraw
    const handleWithdraw = () => {
        if (!address || !parsedWithdrawAmount) return;
        vault.redeem(parsedWithdrawAmount, address, address);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Vault Stats */}
                {totalAssets !== undefined && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Gold Vault Stats</CardTitle>
                            <CardDescription>
                                Stake XAUT to earn yield from LP provision
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <div className="text-sm text-muted-foreground">Total Value Locked</div>
                                    <div className="text-2xl font-bold">
                                        ${totalAssets ? formatCompactNumber(Number(formatTokenAmount(totalAssets as bigint, 6, 2))) : '0'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Share Price</div>
                                    <div className="text-2xl font-bold">
                                        {sharePrice.toFixed(4)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">APY</div>
                                    <div className="text-2xl font-bold text-green-600">
                                        ~5.2%
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* User Position */}
                {isConnected && gxautBalance && (gxautBalance as bigint) > BigInt(0) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Position</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-muted-foreground">gXAUT Balance</div>
                                    <div className="text-xl font-semibold">
                                        {formatTokenAmount(gxautBalance as bigint, TOKENS.gXAUT.decimals, 4)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">XAUT Value</div>
                                    <div className="text-xl font-semibold">
                                        {formatTokenAmount(userXautValue, TOKENS.XAUT.decimals, 4)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Deposit/Withdraw */}
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Position</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="deposit">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="deposit">Deposit</TabsTrigger>
                                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                            </TabsList>

                            {/* Deposit Tab */}
                            <TabsContent value="deposit" className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">XAUT Balance</span>
                                        <span>{xautBalance ? formatTokenAmount(xautBalance as bigint, TOKENS.XAUT.decimals, 4) : '0.0000'}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="0.0"
                                            value={depositAmount}
                                            onChange={(e) => setDepositAmount(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button variant="outline" onClick={handleMaxDeposit}>
                                            MAX
                                        </Button>
                                    </div>
                                </div>

                                {previewDepositShares && (previewDepositShares as bigint) > BigInt(0) ? (
                                    <div className="p-3 bg-muted rounded-lg text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">You will receive</span>
                                            <span className="font-medium">
                                                {formatTokenAmount(previewDepositShares as bigint, TOKENS.gXAUT.decimals, 4)} gXAUT
                                            </span>
                                        </div>
                                    </div>
                                ) : null}

                                <Button
                                    className="w-full"
                                    onClick={needsApproval ? handleApprove : handleDeposit}
                                    disabled={
                                        !isConnected ||
                                        !isVerified ||
                                        !depositAmount ||
                                        !isValidAmount(depositAmount) ||
                                        Boolean(xautBalance && parsedDepositAmount > (xautBalance as bigint)) ||
                                        Boolean(approval.isPending) ||
                                        Boolean(approval.isConfirming) ||
                                        Boolean(vault.isPending) ||
                                        Boolean(vault.isConfirming)
                                    }
                                >
                                    {!isConnected
                                        ? 'Connect Wallet'
                                        : !isVerified
                                            ? 'Not Verified'
                                            : !depositAmount || !isValidAmount(depositAmount)
                                                ? 'Enter Amount'
                                                : xautBalance && parsedDepositAmount > (xautBalance as bigint)
                                                    ? 'Insufficient Balance'
                                                    : needsApproval
                                                        ? approval.isPending || approval.isConfirming
                                                            ? 'Approving...'
                                                            : 'Approve XAUT'
                                                        : vault.isPending || vault.isConfirming
                                                            ? 'Depositing...'
                                                            : 'Deposit'}
                                </Button>

                                {vault.isSuccess && vault.hash && (
                                    <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-800 dark:text-green-200">
                                        <p className="font-medium mb-1">Deposit successful!</p>
                                        <a
                                            href={getExplorerTxUrl(vault.hash)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
                                        >
                                            View transaction: {vault.hash.slice(0, 10)}...{vault.hash.slice(-8)}
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                )}

                                {approval.error && (
                                    <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-800 dark:text-red-200">
                                        <p className="font-medium">Approval Error:</p>
                                        <p className="mt-1">{approval.error.message}</p>
                                    </div>
                                )}

                                {vault.error && (
                                    <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-800 dark:text-red-200">
                                        <p className="font-medium">Deposit Error:</p>
                                        <p className="mt-1">{vault.error.message}</p>
                                    </div>
                                )}
                            </TabsContent>

                            {/* Withdraw Tab */}
                            <TabsContent value="withdraw" className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">gXAUT Balance</span>
                                        <span>{gxautBalance ? formatTokenAmount(gxautBalance as bigint, TOKENS.gXAUT.decimals, 4) : '0.0000'}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="0.0"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button variant="outline" onClick={handleMaxWithdraw}>
                                            MAX
                                        </Button>
                                    </div>
                                </div>

                                {previewRedeemAssets && (previewRedeemAssets as bigint) > BigInt(0) ? (
                                    <div className="p-3 bg-muted rounded-lg text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">You will receive</span>
                                            <span className="font-medium">
                                                {formatTokenAmount(previewRedeemAssets as bigint, TOKENS.XAUT.decimals, 4)} XAUT
                                            </span>
                                        </div>
                                    </div>
                                ) : null}

                                <Button
                                    className="w-full"
                                    onClick={handleWithdraw}
                                    disabled={
                                        !isConnected ||
                                        !isVerified ||
                                        !withdrawAmount ||
                                        !isValidAmount(withdrawAmount) ||
                                        Boolean(gxautBalance && parsedWithdrawAmount > (gxautBalance as bigint)) ||
                                        Boolean(vault.isPending) ||
                                        Boolean(vault.isConfirming)
                                    }
                                >
                                    {!isConnected
                                        ? 'Connect Wallet'
                                        : !isVerified
                                            ? 'Not Verified'
                                            : !withdrawAmount || !isValidAmount(withdrawAmount)
                                                ? 'Enter Amount'
                                                : gxautBalance && parsedWithdrawAmount > (gxautBalance as bigint)
                                                    ? 'Insufficient Balance'
                                                    : vault.isPending || vault.isConfirming
                                                        ? 'Withdrawing...'
                                                        : 'Withdraw'}
                                </Button>

                                {vault.isSuccess && vault.hash && (
                                    <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-800 dark:text-green-200">
                                        <p className="font-medium mb-1">Withdrawal successful!</p>
                                        <a
                                            href={getExplorerTxUrl(vault.hash)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
                                        >
                                            View transaction: {vault.hash.slice(0, 10)}...{vault.hash.slice(-8)}
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                )}

                                {vault.error && (
                                    <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-800 dark:text-red-200">
                                        <p className="font-medium">Withdrawal Error:</p>
                                        <p className="mt-1">{vault.error.message}</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
