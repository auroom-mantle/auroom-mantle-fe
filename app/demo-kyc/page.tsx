'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Shield, AlertTriangle, Info, Wallet } from 'lucide-react';
import { KYCWizard } from '@/components/kyc/KYCWizard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidAddress } from '@/lib/utils/validation';

export default function DemoKYCPage() {
    const { address: connectedAddress, isConnected } = useAccount();
    const router = useRouter();
    const [manualAddress, setManualAddress] = useState('');
    const [useManualMode, setUseManualMode] = useState(true); // Default to manual mode for demo
    const [confirmedAddress, setConfirmedAddress] = useState('');

    // Determine which address to use
    const activeAddress = useManualMode ? confirmedAddress : connectedAddress;

    const handleConfirmAddress = () => {
        if (!isValidAddress(manualAddress)) {
            alert('Please enter a valid Ethereum address (0x...)');
            return;
        }
        setConfirmedAddress(manualAddress);
    };

    const handleUseDemoAddress = (demoAddr: string) => {
        setManualAddress(demoAddr);
        setConfirmedAddress(demoAddr);
    };

    // Show address input if in manual mode and no address confirmed
    if (useManualMode && !confirmedAddress) {
        return (
            <div className="min-h-screen bg-black py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
                                <Shield className="w-10 h-10 text-yellow-500" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
                                KYC Verification - Demo
                            </h1>
                            <p className="text-white/60">
                                Enter your wallet address to start verification
                            </p>
                        </div>

                        {/* Demo Notice */}
                        <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-2xl">
                            <div className="flex items-start gap-4">
                                <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-blue-400 mb-2">
                                        🎭 Demo Mode - No Wallet Connection Required
                                    </h3>
                                    <p className="text-sm text-blue-300/90">
                                        For demo purposes, you can simply <strong>enter your wallet address</strong> without connecting a wallet.
                                        This makes it easier to test the KYC flow. After completing verification, an admin will approve your address.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Address Input */}
                        <div className="p-8 bg-zinc-900 border-2 border-yellow-500/30 rounded-2xl space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Your Wallet Address <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    type="text"
                                    placeholder="0x742812a2Ff08b76f968dffA7ca6892A428cAeBb1"
                                    value={manualAddress}
                                    onChange={(e) => setManualAddress(e.target.value)}
                                    className="bg-black border-white/20 text-white placeholder:text-white/40 font-mono"
                                />
                                <p className="text-xs text-white/40 mt-2">
                                    Enter the Ethereum address you want to verify
                                </p>
                            </div>

                            {/* Demo Addresses */}
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                                <p className="text-sm font-medium text-yellow-400 mb-3">
                                    💡 Quick Demo Addresses:
                                </p>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleUseDemoAddress('0x742812a2Ff08b76f968dffA7ca6892A428cAeBb1')}
                                        className="w-full text-left p-2 bg-black/50 hover:bg-black rounded text-xs font-mono text-white/80 hover:text-white transition-colors"
                                    >
                                        0x742812a2Ff08b76f968dffA7ca6892A428cAeBb1
                                    </button>
                                    <button
                                        onClick={() => handleUseDemoAddress('0x1234567890123456789012345678901234567890')}
                                        className="w-full text-left p-2 bg-black/50 hover:bg-black rounded text-xs font-mono text-white/80 hover:text-white transition-colors"
                                    >
                                        0x1234567890123456789012345678901234567890
                                    </button>
                                    <button
                                        onClick={() => handleUseDemoAddress('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd')}
                                        className="w-full text-left p-2 bg-black/50 hover:bg-black rounded text-xs font-mono text-white/80 hover:text-white transition-colors"
                                    >
                                        0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
                                    </button>
                                </div>
                            </div>

                            <Button
                                onClick={handleConfirmAddress}
                                disabled={!manualAddress}
                                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold text-lg py-6"
                            >
                                Start KYC Verification
                            </Button>

                            {/* Alternative: Connect Wallet */}
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-sm text-white/60 text-center mb-3">
                                    Or connect your wallet for full Web3 experience
                                </p>
                                <Button
                                    onClick={() => setUseManualMode(false)}
                                    variant="outline"
                                    className="w-full border-white/20 text-white hover:bg-white/10"
                                >
                                    <Wallet className="w-4 h-4 mr-2" />
                                    Switch to Wallet Connection Mode
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show wallet connection requirement if in wallet mode and not connected
    if (!useManualMode && !isConnected) {
        return (
            <div className="min-h-screen bg-black py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
                                <Shield className="w-10 h-10 text-yellow-500" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
                                KYC Verification
                            </h1>
                            <p className="text-white/60">
                                Complete your identity verification to access the protocol
                            </p>
                        </div>

                        {/* Connect Wallet Notice */}
                        <div className="p-8 bg-zinc-900 border-2 border-yellow-500/30 rounded-2xl text-center space-y-4">
                            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-white mb-2">Wallet Not Connected</h2>
                            <p className="text-white/60 mb-6">
                                Please connect your wallet to start the KYC verification process
                            </p>
                            <div className="space-y-3">
                                <Button
                                    onClick={() => router.push('/')}
                                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold"
                                >
                                    Go to Home Page
                                </Button>
                                <Button
                                    onClick={() => setUseManualMode(true)}
                                    variant="outline"
                                    className="w-full border-white/20 text-white hover:bg-white/10"
                                >
                                    Use Manual Address Input (Demo Mode)
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main KYC Flow
    return (
        <div className="min-h-screen bg-black py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
                        <Shield className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
                        KYC Verification - Demo
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Complete the 4-step verification process to access swap, borrow, and vault features
                    </p>

                    {/* Show active address */}
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-yellow-500/30 rounded-lg">
                        <span className="text-sm text-white/60">Verifying address:</span>
                        <code className="text-sm text-yellow-400 font-mono">
                            {activeAddress?.slice(0, 6)}...{activeAddress?.slice(-4)}
                        </code>
                        {useManualMode && (
                            <Button
                                onClick={() => {
                                    setConfirmedAddress('');
                                    setManualAddress('');
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-xs text-white/60 hover:text-white"
                            >
                                Change
                            </Button>
                        )}
                    </div>
                </div>

                {/* Important Demo Notice */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-2xl">
                        <div className="flex items-start gap-4">
                            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-blue-400 mb-2">
                                    🎭 Demo Mode - For Educational Purposes Only
                                </h3>
                                <div className="text-sm text-blue-300/90 space-y-2">
                                    <p>
                                        This is a <strong>demonstration</strong> of a professional KYC verification flow inspired by Verihubs.
                                        All verification processes use <strong>simulated data</strong> and do not connect to real services:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Phone verification uses demo OTP (any 6-digit code works)</li>
                                        <li>Document scanning simulates OCR with random Indonesian data</li>
                                        <li>Face matching always returns 95-99% match score</li>
                                        <li>Government validation simulates Dukcapil database checks</li>
                                    </ul>
                                    <p className="mt-3">
                                        After completing all steps, an <strong>admin will manually approve</strong> your wallet address
                                        on the blockchain to grant protocol access.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KYC Wizard */}
                <div className="max-w-6xl mx-auto">
                    <div className="p-8 bg-zinc-900/50 border border-white/10 rounded-2xl">
                        <KYCWizard manualAddress={useManualMode ? confirmedAddress : undefined} />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="max-w-4xl mx-auto mt-8 text-center">
                    <p className="text-xs text-white/40">
                        Your data is stored locally in your browser for demo purposes. In production, this would be securely transmitted to verification services.
                    </p>
                </div>
            </div>
        </div>
    );
}
