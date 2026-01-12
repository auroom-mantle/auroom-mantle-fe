'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownUp } from 'lucide-react';
import { TOKENS } from '@/lib/contracts/tokens';
import { BASE_CONTRACTS as CONTRACTS } from '@/lib/contracts/base_addresses';
import { useTokenBalance } from '@/hooks/contracts/useTokenBalance';
import { useTokenAllowance } from '@/hooks/contracts/useTokenAllowance';
import { useTokenApproval } from '@/hooks/contracts/useTokenApproval';
import { useSwapRouter } from '@/hooks/contracts/useSwapRouter';
import { useIdentityRegistry } from '@/hooks/contracts/useIdentityRegistry';
import { parseTokenAmount, formatTokenAmount, getExplorerTxUrl } from '@/lib/utils/format';
import { calculateMinimumReceived } from '@/lib/utils/calculations';
import { isValidAmount } from '@/lib/utils/validation';
import { DEFAULT_SLIPPAGE_BPS } from '@/lib/utils/constants';
import { VerificationBanner } from '@/components/shared/VerificationBanner';

export default function SwapPage() {
    const { address, isConnected } = useAccount();
    const [fromToken, setFromToken] = useState<'IDRX' | 'XAUT'>('IDRX');
    const [toToken, setToToken] = useState<'IDRX' | 'XAUT'>('XAUT');
    const [inputAmount, setInputAmount] = useState('');
    const [slippageBps, setSlippageBps] = useState(DEFAULT_SLIPPAGE_BPS);

    // Check verification status
    const { useIsVerified } = useIdentityRegistry();
    const { data: isVerified } = useIsVerified(address);

    // Get token balances
    const { data: fromBalance } = useTokenBalance(
        fromToken === 'IDRX' ? TOKENS.IDRX.address : TOKENS.XAUT.address,
        address
    ) as { data: bigint | undefined };

    // Parse input amount
    const parsedAmount = inputAmount && isValidAmount(inputAmount)
        ? parseTokenAmount(inputAmount, TOKENS[fromToken].decimals)
        : BigInt(0);

    // Get quote
    const swapRouter = useSwapRouter();
    const quoteHook = fromToken === 'IDRX'
        ? swapRouter.useQuoteIDRXtoXAUT(parsedAmount)
        : swapRouter.useQuoteXAUTtoIDRX(parsedAmount);

    const outputAmount = (quoteHook.data as bigint) || BigInt(0);

    // Check allowance
    const { data: allowance } = useTokenAllowance(
        fromToken === 'IDRX' ? TOKENS.IDRX.address : TOKENS.XAUT.address,
        address,
        CONTRACTS.SwapRouter
    );

    const needsApproval = allowance !== undefined && allowance !== null && typeof allowance === 'bigint' && parsedAmount > BigInt(0) && allowance < parsedAmount;

    // Approval hook
    const approval = useTokenApproval(
        fromToken === 'IDRX' ? TOKENS.IDRX.address : TOKENS.XAUT.address
    );

    // Handle switch tokens
    const handleSwitch = () => {
        setFromToken(toToken);
        setToToken(fromToken);
        setInputAmount('');
    };

    // Handle max button
    const handleMax = () => {
        if (fromBalance) {
            setInputAmount(formatTokenAmount(fromBalance, TOKENS[fromToken].decimals, 6));
        }
    };

    // Handle approve
    const handleApprove = () => {
        approval.approve(CONTRACTS.SwapRouter);
    };

    // Handle swap
    const handleSwap = () => {
        if (!address || !parsedAmount || !outputAmount) return;

        const minOutput = calculateMinimumReceived(outputAmount, slippageBps);

        if (fromToken === 'IDRX') {
            swapRouter.swapIDRXtoXAUT(parsedAmount, minOutput, address);
        } else {
            swapRouter.swapXAUTtoIDRX(parsedAmount, minOutput, address);
        }
    };

    // Determine button state
    const getButtonContent = () => {
        if (!isConnected) return 'Connect Wallet';
        if (!isVerified) return 'Not Verified - Go to Verify Page';
        if (!inputAmount || !isValidAmount(inputAmount)) return 'Enter Amount';
        if (fromBalance && parsedAmount > fromBalance) return 'Insufficient Balance';
        if (needsApproval) {
            if (approval.isPending || approval.isConfirming) return 'Approving...';
            return `Approve ${fromToken}`;
        }
        if (swapRouter.isPending || swapRouter.isConfirming) return 'Swapping...';
        return 'Swap';
    };

    const isButtonDisabled = () => {
        if (!isConnected) return false;
        if (!isVerified) return true;
        if (!inputAmount || !isValidAmount(inputAmount)) return true;
        if (fromBalance && parsedAmount > fromBalance) return true;
        if (approval.isPending || approval.isConfirming) return true;
        if (swapRouter.isPending || swapRouter.isConfirming) return true;
        return false;
    };

    const handleButtonClick = () => {
        if (!isConnected) {
            // User should use wallet button in header
            return;
        }
        if (needsApproval) {
            handleApprove();
        } else {
            handleSwap();
        }
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
                            Swap Tokens
                        </h1>
                        <p className="text-white/60">Exchange IDRX for XAUT and vice versa</p>
                    </div>

                    {/* Verification Banner */}
                    <VerificationBanner />

                    {/* Main Swap Card */}
                    <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30 backdrop-blur-xl">
                        <div className="space-y-4">
                            {/* From Token */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">From</span>
                                    <span className="text-white/60">
                                        Balance: {fromBalance ? formatTokenAmount(fromBalance, TOKENS[fromToken].decimals, 4) : '0.0000'}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="0.0"
                                        value={inputAmount}
                                        onChange={(e) => setInputAmount(e.target.value)}
                                        className="flex-1 bg-black border-white/20 text-white placeholder:text-white/40"
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={handleMax}
                                        className="border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300"
                                    >
                                        MAX
                                    </Button>
                                    <div className="flex items-center gap-2 px-3 py-2 border-2 border-yellow-500/30 rounded-md bg-yellow-500/10">
                                        <span className="font-medium text-yellow-400">{fromToken}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Switch Button */}
                            <div className="flex justify-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleSwitch}
                                    className="rounded-full border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300"
                                >
                                    <ArrowDownUp className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* To Token */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">To</span>
                                    <span className="text-white/60">
                                        {toToken}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="0.0"
                                        value={outputAmount ? formatTokenAmount(outputAmount, TOKENS[toToken].decimals, 4) : ''}
                                        disabled
                                        className="flex-1 bg-black border-white/20 text-white placeholder:text-white/40"
                                    />
                                    <div className="flex items-center gap-2 px-3 py-2 border-2 border-yellow-500/30 rounded-md bg-yellow-500/10">
                                        <span className="font-medium text-yellow-400">{toToken}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quote Details */}
                            {outputAmount > BigInt(0) && (
                                <div className="space-y-2 p-3 bg-black/50 border border-white/10 rounded-lg text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-white/60 flex items-center gap-1">
                                            Rate
                                            <span className="text-xs" title="Rate is fetched from SwapRouter smart contract based on Uniswap V2 pool reserves">ⓘ</span>
                                        </span>
                                        <span className="text-white">
                                            {outputAmount && parsedAmount ? (() => {
                                                const rate = Number(outputAmount) / Number(parsedAmount);
                                                if (rate < 0.0001) {
                                                    const invertedRate = Number(parsedAmount) / Number(outputAmount);
                                                    return `1 ${toToken} = ${invertedRate.toFixed(2)} ${fromToken}`;
                                                }
                                                return `1 ${fromToken} = ${rate.toFixed(6)} ${toToken}`;
                                            })() : '0'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Slippage Tolerance</span>
                                        <span className="text-white">{(slippageBps / 100).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Minimum Received</span>
                                        <span className="text-white">
                                            {formatTokenAmount(
                                                calculateMinimumReceived(outputAmount, slippageBps),
                                                TOKENS[toToken].decimals,
                                                4
                                            )} {toToken}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Swap Button */}
                            <Button
                                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold"
                                onClick={handleButtonClick}
                                disabled={isButtonDisabled()}
                            >
                                {getButtonContent()}
                            </Button>

                            {/* Transaction Status */}
                            {/* Approval Success */}
                            {approval.isSuccess && approval.hash && !swapRouter.isSuccess && (
                                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm">
                                    <p className="font-medium mb-1 text-green-400">Approval successful!</p>
                                    <a
                                        href={getExplorerTxUrl(approval.hash)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 hover:text-green-300 hover:underline flex items-center gap-1"
                                    >
                                        View transaction: {approval.hash.slice(0, 10)}...{approval.hash.slice(-8)}
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                    <p className="text-white/60 mt-2 text-xs">You can now proceed with the swap</p>
                                </div>
                            )}

                            {/* Swap Success */}
                            {swapRouter.isSuccess && swapRouter.hash && (
                                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm">
                                    <p className="font-medium mb-1 text-green-400">Swap successful!</p>
                                    <a
                                        href={getExplorerTxUrl(swapRouter.hash)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 hover:text-green-300 hover:underline flex items-center gap-1"
                                    >
                                        View transaction: {swapRouter.hash.slice(0, 10)}...{swapRouter.hash.slice(-8)}
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            )}

                            {/* Approval Error */}
                            {approval.error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                                    Approval Error: {approval.error.message}
                                </div>
                            )}

                            {/* Swap Error */}
                            {swapRouter.error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                                    Swap Error: {swapRouter.error.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
