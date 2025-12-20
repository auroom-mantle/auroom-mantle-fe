"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useIdentityRegistry } from '@/hooks/contracts/useIdentityRegistry';
import { isAddress } from 'viem';
import { Loader2, Search, UserPlus, UserMinus, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * IdentityTab - Identity management tab (admin only)
 */
export function IdentityTab() {
    const { toast } = useToast();
    const [checkAddress, setCheckAddress] = useState('');
    const [registerAddress, setRegisterAddress] = useState('');
    const [batchAddresses, setBatchAddresses] = useState('');
    const [removeAddress, setRemoveAddress] = useState('');

    const { registerIdentity, removeIdentity, isPending } = useIdentityRegistry();

    const handleCheckVerification = () => {
        if (!isAddress(checkAddress)) {
            toast({
                title: "Invalid address",
                description: "Please enter a valid Ethereum address",
                variant: "destructive",
            });
            return;
        }

        // In a real implementation, you would query the contract
        toast({
            title: "Check verification",
            description: `Checking verification status for ${checkAddress.slice(0, 6)}...${checkAddress.slice(-4)}`,
        });
    };

    const handleRegisterSingle = () => {
        if (!isAddress(registerAddress)) {
            toast({
                title: "Invalid address",
                description: "Please enter a valid Ethereum address",
                variant: "destructive",
            });
            return;
        }

        registerIdentity(registerAddress as `0x${string}`);
        toast({
            title: "Registering identity...",
            description: `Registering ${registerAddress.slice(0, 6)}...${registerAddress.slice(-4)}`,
        });
    };

    const handleBatchRegister = () => {
        const addresses = batchAddresses
            .split('\n')
            .map(addr => addr.trim())
            .filter(addr => addr.length > 0);

        const validAddresses = addresses.filter(addr => isAddress(addr));

        if (validAddresses.length === 0) {
            toast({
                title: "No valid addresses",
                description: "Please enter at least one valid Ethereum address",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Batch registration",
            description: `Registering ${validAddresses.length} addresses...`,
        });

        // In a real implementation, you would call batchRegisterIdentity
    };

    const handleRemoveIdentity = () => {
        if (!isAddress(removeAddress)) {
            toast({
                title: "Invalid address",
                description: "Please enter a valid Ethereum address",
                variant: "destructive",
            });
            return;
        }

        removeIdentity(removeAddress as `0x${string}`);
        toast({
            title: "Removing identity...",
            description: `Removing ${removeAddress.slice(0, 6)}...${removeAddress.slice(-4)}`,
        });
    };

    return (
        <div className="space-y-6">
            {/* Check Verification Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" />
                        Check Verification Status
                    </CardTitle>
                    <CardDescription>
                        Check if an address is verified
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="checkAddress">Address</Label>
                        <div className="flex gap-2">
                            <Input
                                id="checkAddress"
                                placeholder="0x..."
                                value={checkAddress}
                                onChange={(e) => setCheckAddress(e.target.value)}
                            />
                            <Button onClick={handleCheckVerification}>
                                Check
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Register Identity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-primary" />
                        Register Identity (Admin Only)
                    </CardTitle>
                    <CardDescription>
                        Register single or multiple addresses
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Single Registration */}
                    <div className="space-y-2">
                        <Label htmlFor="registerAddress">Single Registration</Label>
                        <div className="flex gap-2">
                            <Input
                                id="registerAddress"
                                placeholder="0x..."
                                value={registerAddress}
                                onChange={(e) => setRegisterAddress(e.target.value)}
                            />
                            <Button
                                onClick={handleRegisterSingle}
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    'Register'
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                OR
                            </span>
                        </div>
                    </div>

                    {/* Batch Registration */}
                    <div className="space-y-2">
                        <Label htmlFor="batchAddresses">Batch Registration</Label>
                        <Textarea
                            id="batchAddresses"
                            placeholder="0x1234567890123456789012345678901234567890&#10;0xabcdefabcdefabcdefabcdefabcdefabcdefabcd&#10;(one address per line)"
                            value={batchAddresses}
                            onChange={(e) => setBatchAddresses(e.target.value)}
                            rows={5}
                        />
                        <p className="text-sm text-muted-foreground">
                            Addresses found: {batchAddresses.split('\n').filter(addr => addr.trim().length > 0).length}
                        </p>
                        <Button
                            onClick={handleBatchRegister}
                            disabled={isPending}
                            className="w-full"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Registering...
                                </>
                            ) : (
                                `Register ${batchAddresses.split('\n').filter(addr => addr.trim().length > 0).length} Addresses`
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Remove Identity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserMinus className="h-5 w-5 text-destructive" />
                        Remove Identity (Admin Only)
                    </CardTitle>
                    <CardDescription>
                        Remove verification from an address
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10">
                        <p className="text-sm font-medium text-destructive mb-2">⚠️ Warning</p>
                        <p className="text-sm text-muted-foreground">
                            User will lose access to:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li>XAUT transfers</li>
                            <li>Swaps involving XAUT</li>
                            <li>Vault deposits</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="removeAddress">Address</Label>
                        <Input
                            id="removeAddress"
                            placeholder="0x..."
                            value={removeAddress}
                            onChange={(e) => setRemoveAddress(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleRemoveIdentity}
                        disabled={isPending}
                        variant="destructive"
                        className="w-full"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Removing...
                            </>
                        ) : (
                            'Remove Identity'
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
