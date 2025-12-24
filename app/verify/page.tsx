'use client';

import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Shield } from 'lucide-react';
import { useIdentityRegistry } from '@/hooks/contracts/useIdentityRegistry';
import { useState } from 'react';
import { isValidAddress } from '@/lib/utils/validation';
import type { Address } from 'viem';

export default function VerifyPage() {
    const { address, isConnected } = useAccount();
    const [addressToRegister, setAddressToRegister] = useState('');

    const { useIsVerified, registerIdentity, isPending, isConfirming, isSuccess, error } = useIdentityRegistry();
    const { data: isVerified, isLoading } = useIsVerified(address);

    const handleRegister = () => {
        if (isValidAddress(addressToRegister)) {
            registerIdentity(addressToRegister as Address);
        }
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                            <Shield className="h-8 w-8 text-yellow-500" />
                            Verification
                        </h1>
                        <p className="text-white/60">KYC verification is required to use the protocol</p>
                    </div>

                    {/* Verification Status */}
                    <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30">
                        <h2 className="text-xl font-bold text-white mb-4">Verification Status</h2>
                        {!isConnected ? (
                            <div className="text-center py-8">
                                <p className="text-white/60">
                                    Please connect your wallet to check verification status
                                </p>
                            </div>
                        ) : isLoading ? (
                            <div className="text-center py-8">
                                <p className="text-white/60">Checking verification status...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-black/30">
                                    <div>
                                        <div className="font-medium text-white">Your Address</div>
                                        <div className="text-sm text-white/60 font-mono">
                                            {address}
                                        </div>
                                    </div>
                                    <Badge
                                        variant={isVerified ? 'default' : 'destructive'}
                                        className={`flex items-center gap-1 ${isVerified
                                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                                            }`}
                                    >
                                        {isVerified ? (
                                            <>
                                                <CheckCircle2 className="h-3 w-3" />
                                                Verified
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-3 w-3" />
                                                Not Verified
                                            </>
                                        )}
                                    </Badge>
                                </div>

                                {!isVerified && (
                                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                        <p className="text-sm text-yellow-400">
                                            Your address is not verified. Please contact the protocol admin to complete KYC verification.
                                        </p>
                                    </div>
                                )}

                                {isVerified && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                                        <p className="text-sm text-green-400">
                                            Your address is verified! You can now use all protocol features.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Admin Panel */}
                    {isConnected && (
                        <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-yellow-500/30">
                            <h2 className="text-xl font-bold text-white mb-2">Admin Panel</h2>
                            <p className="text-sm text-white/60 mb-4">Register new addresses (admin only)</p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">Address to Register</label>
                                    <Input
                                        type="text"
                                        placeholder="0x..."
                                        value={addressToRegister}
                                        onChange={(e) => setAddressToRegister(e.target.value)}
                                        className="bg-black border-white/20 text-white placeholder:text-white/40"
                                    />
                                </div>

                                <Button
                                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold"
                                    onClick={handleRegister}
                                    disabled={
                                        !addressToRegister ||
                                        !isValidAddress(addressToRegister) ||
                                        isPending ||
                                        isConfirming
                                    }
                                >
                                    {isPending || isConfirming ? 'Registering...' : 'Register Address'}
                                </Button>

                                {isSuccess && (
                                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-400">
                                        Address registered successfully!
                                    </div>
                                )}

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                                        Error: {error.message}
                                    </div>
                                )}

                                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400">
                                    <p className="font-medium mb-1">Note:</p>
                                    <p>Only the contract deployer can register new addresses. If you're not the admin, this function will fail.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
