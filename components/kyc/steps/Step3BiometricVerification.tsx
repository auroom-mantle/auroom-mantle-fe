'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, CheckCircle2, User } from 'lucide-react';
import { LoadingAnimation } from '../LoadingAnimation';
import { simulateFaceMatch, simulateLivenessCheck } from '@/lib/kyc/demoHelpers';
import type { KYCData } from '@/lib/kyc/types';
import Image from 'next/image';

interface Step3BiometricVerificationProps {
    data: Partial<KYCData>;
    onComplete: (data: Partial<KYCData>) => void;
}

export function Step3BiometricVerification({ data, onComplete }: Step3BiometricVerificationProps) {
    const [selfieImage, setSelfieImage] = useState(data.selfieImage || '');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<{ faceMatch: number; liveness: boolean } | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            setSelfieImage(base64);

            // Start biometric verification
            await processBiometric(file, base64);
        };
        reader.readAsDataURL(file);
    };

    const processBiometric = async (file: File, base64Image: string) => {
        setIsProcessing(true);
        setProgress(0);

        try {
            // Step 1: Face Detection
            setProcessingStep('Detecting face...');
            setProgress(20);
            await new Promise(resolve => setTimeout(resolve, 800));

            // Step 2: Liveness Check
            setProcessingStep('Checking liveness...');
            setProgress(50);
            const livenessResult = await simulateLivenessCheck(file);

            // Step 3: Face Matching
            setProcessingStep('Matching with ID card...');
            setProgress(75);
            // Create a dummy file for ID card (in real app, would use actual ID card image)
            const dummyIdCard = new File([''], 'idcard.jpg', { type: 'image/jpeg' });
            const faceMatchScore = await simulateFaceMatch(file, dummyIdCard);

            setProgress(100);
            setResult({
                faceMatch: faceMatchScore,
                liveness: livenessResult,
            });

            setTimeout(() => setIsProcessing(false), 500);
        } catch (error) {
            setIsProcessing(false);
            alert('Error processing biometric data. Please try again.');
        }
    };

    const handleConfirm = () => {
        if (!result) return;

        onComplete({
            selfieImage,
            faceMatchScore: result.faceMatch,
            livenessCheckPassed: result.liveness,
        });
    };

    if (isProcessing) {
        return (
            <LoadingAnimation
                message={processingStep}
                progress={progress}
                subMessage="Analyzing biometric data..."
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
                        <h3 className="font-semibold text-blue-400 mb-1">Demo Mode - Biometric Simulation</h3>
                        <p className="text-sm text-blue-300/80">
                            Upload any selfie photo. We'll simulate face matching and liveness detection with demo results (always 95-99% match).
                        </p>
                    </div>
                </div>
            </div>

            {/* Step Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
                    <User className="w-8 h-8 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Biometric Verification</h2>
                <p className="text-white/60">
                    Take a selfie for face matching and liveness detection
                </p>
            </div>

            {!selfieImage ? (
                /* Upload Selfie */
                <div className="space-y-6">
                    <label className="block">
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-yellow-500/50 transition-colors cursor-pointer bg-zinc-900/50">
                            <Camera className="w-12 h-12 text-white/40 mx-auto mb-4" />
                            <p className="text-white font-medium mb-2">Take or Upload Selfie</p>
                            <p className="text-sm text-white/60">PNG, JPG up to 5MB</p>
                            <p className="text-xs text-white/40 mt-2">
                                Make sure your face is clearly visible
                            </p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            capture="user"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            ) : (
                /* Show Results */
                <div className="space-y-6">
                    {/* Selfie Preview */}
                    <div className="relative">
                        <div className="aspect-square max-w-sm mx-auto relative rounded-xl overflow-hidden border-2 border-yellow-500/30">
                            <Image
                                src={selfieImage}
                                alt="Selfie"
                                fill
                                className="object-cover"
                            />
                            {result && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-400">{result.faceMatch}%</div>
                                        <div className="text-sm text-white/80">Face Match</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button
                            onClick={() => {
                                setSelfieImage('');
                                setResult(null);
                            }}
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 border-white/20 bg-black/80 text-white hover:bg-black"
                        >
                            Retake
                        </Button>
                    </div>

                    {/* Verification Results */}
                    {result && (
                        <div className="space-y-4">
                            {/* Face Match Score */}
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        <span className="font-medium text-green-400">Face Match</span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-400">{result.faceMatch}%</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-1000"
                                        style={{ width: `${result.faceMatch}%` }}
                                    />
                                </div>
                            </div>

                            {/* Liveness Check */}
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        <span className="font-medium text-green-400">Liveness Detection</span>
                                    </div>
                                    <span className="text-green-400 font-semibold">PASSED</span>
                                </div>
                                <p className="text-xs text-green-300/60 mt-2">
                                    Real person detected, not a photo or video
                                </p>
                            </div>

                            {/* Success Message */}
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-center">
                                <p className="text-sm text-yellow-400 font-medium">
                                    ✅ Biometric verification successful!
                                </p>
                                <p className="text-xs text-yellow-300/60 mt-1">
                                    Your face matches the ID card with high confidence
                                </p>
                            </div>

                            <Button
                                onClick={handleConfirm}
                                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold"
                            >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Continue to Validation
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
