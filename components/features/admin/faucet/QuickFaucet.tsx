"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import { useMintToken } from '@/hooks/admin/useMintToken';
import { CONTRACTS } from '@/lib/contracts/addresses';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * QuickFaucet - One-click get all test tokens
 */
export function QuickFaucet() {
    const { address } = useAccount();
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const { mint: mintIDRX, isSuccess: idrxSuccess, isPending: idrxPending } = useMintToken(CONTRACTS.IDRX);
    const { mint: mintUSDC, isSuccess: usdcSuccess, isPending: usdcPending } = useMintToken(CONTRACTS.USDC);
    const { mint: mintXAUT, isSuccess: xautSuccess, isPending: xautPending } = useMintToken(CONTRACTS.XAUT);

    const handleQuickFaucet = async () => {
        if (!address) {
            toast({
                title: "Wallet not connected",
                description: "Please connect your wallet first",
                variant: "destructive",
            });
            return;
        }

        setIsProcessing(true);
        setCurrentStep(1);

        try {
            // Step 1: Mint IDRX
            toast({
                title: "Minting IDRX...",
                description: "Step 1/3: Minting 1,000,000 IDRX",
            });
            mintIDRX(address, parseUnits('1000000', 6));

            // Wait for IDRX to complete
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Step 2: Mint USDC
            setCurrentStep(2);
            toast({
                title: "Minting USDC...",
                description: "Step 2/3: Minting 1,000 USDC",
            });
            mintUSDC(address, parseUnits('1000', 6));

            // Wait for USDC to complete
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Step 3: Mint XAUT (only for admin)
            setCurrentStep(3);
            toast({
                title: "Minting XAUT...",
                description: "Step 3/3: Minting 10 XAUT",
            });
            mintXAUT(address, parseUnits('10', 6));

            toast({
                title: "Success!",
                description: "All test tokens have been minted to your wallet",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to mint tokens. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
            setCurrentStep(0);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Quick Faucet
                </CardTitle>
                <CardDescription>
                    Get all test tokens with one click
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                    <p className="font-medium">You will receive:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>1,000,000 IDRX</li>
                        <li>1,000 USDC</li>
                        <li>10 XAUT (requires admin access)</li>
                    </ul>
                </div>

                <Button
                    onClick={handleQuickFaucet}
                    disabled={!address || isProcessing}
                    className="w-full"
                    size="lg"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Minting... Step {currentStep}/3
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Get All Test Tokens
                        </>
                    )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                    ⚠️ XAUT minting requires verified address
                </p>
            </CardContent>
        </Card>
    );
}
