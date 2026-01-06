'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle2, Loader2 } from 'lucide-react';
import { LoadingAnimation } from '../LoadingAnimation';
import { simulateGovernmentValidation } from '@/lib/kyc/demoHelpers';
import type { KYCData } from '@/lib/kyc/types';

interface Step4IdentityValidationProps {
    data: Partial<KYCData>;
    onComplete: (data: Partial<KYCData>) => void;
    onSubmit: () => Promise<void>;
}

export function Step4IdentityValidation({ data, onComplete, onSubmit }: Step4IdentityValidationProps) {
    const [isValidating, setIsValidating] = useState(false);
    const [validationProgress, setValidationProgress] = useState(0);
    const [currentCheck, setCurrentCheck] = useState('');
    const [validationResult, setValidationResult] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Auto-start validation when component mounts
        if (!validationResult) {
            startValidation();
        }
    }, []);

    const startValidation = async () => {
        setIsValidating(true);
        setValidationProgress(0);

        try {
            // Check 1: NIK Verification
            setCurrentCheck('Verifying NIK with Dukcapil...');
            setValidationProgress(25);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Check 2: Face Verification
            setCurrentCheck('Verifying face biometric...');
            setValidationProgress(50);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Check 3: Liveness Detection
            setCurrentCheck('Confirming liveness detection...');
            setValidationProgress(75);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check 4: Data Consistency
            setCurrentCheck('Cross-checking all data...');
            setValidationProgress(90);
            const result = await simulateGovernmentValidation(data.nik || '');

            setValidationProgress(100);
            setValidationResult(result);

            // Save validation results
            onComplete({
                validationResults: {
                    nikVerified: result.nikVerified,
                    faceVerified: result.faceVerified,
                    livenessVerified: result.livenessVerified,
                    dataConsistent: result.dataConsistent,
                },
            });

            setTimeout(() => setIsValidating(false), 500);
        } catch (error) {
            setIsValidating(false);
            alert('Validation error. Please try again.');
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onSubmit();
        } catch (error) {
            alert('Error submitting KYC. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isValidating) {
        return (
            <LoadingAnimation
                message={currentCheck}
                progress={validationProgress}
                subMessage="Validating with government database..."
            />
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Demo Notice */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                    <div className="text-2xl">🎭</div>
                    <div>
                        <h3 className="font-semibold text-blue-400 mb-1">Demo Mode - Validation Simulation</h3>
                        <p className="text-sm text-blue-300/80">
                            This simulates validation with government databases (Dukcapil). In production, this would connect to real verification services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Step Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
                    <Shield className="w-8 h-8 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Official Identity Validation</h2>
                <p className="text-white/60">
                    Final verification with government database
                </p>
            </div>

            {validationResult && (
                <div className="space-y-6">
                    {/* Validation Checks */}
                    <div className="space-y-3">
                        {/* NIK Verification */}
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-medium text-green-400">NIK Verified with Dukcapil</p>
                                    <p className="text-xs text-green-300/60 mt-1">
                                        Identity number confirmed in government database
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Face Verification */}
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-medium text-green-400">Face Match Confirmed</p>
                                    <p className="text-xs text-green-300/60 mt-1">
                                        Biometric data matches ID card ({data.faceMatchScore}% confidence)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Liveness Detection */}
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-medium text-green-400">Liveness Detection Passed</p>
                                    <p className="text-xs text-green-300/60 mt-1">
                                        Real person verified, not a photo or video
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Data Consistency */}
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-medium text-green-400">Data Consistency Check</p>
                                    <p className="text-xs text-green-300/60 mt-1">
                                        All information is consistent across documents
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="p-6 bg-zinc-900 border-2 border-yellow-500/30 rounded-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Verification Summary</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-white/60">Full Name:</span>
                                <span className="text-white font-medium">{data.fullName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60">NIK:</span>
                                <span className="text-white font-mono">{data.nik}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60">Date of Birth:</span>
                                <span className="text-white">{data.dateOfBirth}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60">Phone:</span>
                                <span className="text-white">{data.phoneNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60">Wallet Address:</span>
                                <span className="text-white font-mono text-xs">
                                    {data.walletAddress?.slice(0, 6)}...{data.walletAddress?.slice(-4)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="p-6 bg-gradient-to-r from-green-500/10 to-yellow-500/10 border border-green-500/30 rounded-xl text-center">
                        <div className="text-4xl mb-3">✅</div>
                        <h3 className="text-xl font-bold text-green-400 mb-2">All Checks Passed!</h3>
                        <p className="text-sm text-white/80">
                            Your identity has been successfully validated. Click below to submit for final admin review.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold text-lg py-6"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Shield className="w-5 h-5 mr-2" />
                                Submit for Admin Review
                            </>
                        )}
                    </Button>

                    <p className="text-xs text-center text-white/40">
                        After submission, an admin will review your KYC and approve your wallet address for protocol access.
                    </p>
                </div>
            )}
        </div>
    );
}
