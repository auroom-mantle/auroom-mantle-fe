'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { LoadingAnimation } from '../LoadingAnimation';
import { generateDemoOTP, validateDemoOTP, formatPhoneNumber } from '@/lib/kyc/demoHelpers';
import type { KYCData } from '@/lib/kyc/types';

interface Step1PhoneVerificationProps {
    data: Partial<KYCData>;
    onComplete: (data: Partial<KYCData>) => void;
}

export function Step1PhoneVerification({ data, onComplete }: Step1PhoneVerificationProps) {
    const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || '');
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [demoOTP, setDemoOTP] = useState('');

    const handleSendOTP = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate sending OTP
        await new Promise(resolve => setTimeout(resolve, 1500));

        const otp = generateDemoOTP();
        setDemoOTP(otp);
        setOtpSent(true);
        setIsLoading(false);
    };

    const handleVerifyOTP = () => {
        if (!validateDemoOTP(otpCode)) {
            setError('Please enter a 6-digit OTP code');
            return;
        }

        // In demo mode, any 6-digit code works
        onComplete({
            phoneNumber,
            phoneVerified: true,
            otpCode,
        });
    };

    if (isLoading) {
        return (
            <LoadingAnimation
                message="Sending OTP..."
                subMessage="Please wait while we send the verification code"
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
                        <h3 className="font-semibold text-blue-400 mb-1">Demo Mode</h3>
                        <p className="text-sm text-blue-300/80">
                            This is a demonstration of the KYC verification process. No real SMS will be sent.
                            Any 6-digit code will work for verification.
                        </p>
                    </div>
                </div>
            </div>

            {/* Step Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
                    <Phone className="w-8 h-8 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Phone Number Verification</h2>
                <p className="text-white/60">
                    Verify your phone number to continue with the KYC process
                </p>
            </div>

            {!otpSent ? (
                /* Phone Number Input */
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Phone Number <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                                +62
                            </div>
                            <Input
                                type="tel"
                                placeholder="812-3456-7890"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    setError('');
                                }}
                                className="pl-14 bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>
                        <p className="text-xs text-white/40 mt-2">
                            Enter your Indonesian phone number without the country code
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleSendOTP}
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold"
                        disabled={!phoneNumber}
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send OTP Code
                    </Button>
                </div>
            ) : (
                /* OTP Verification */
                <div className="space-y-6">
                    {/* Success notification */}
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <div>
                                <p className="text-sm font-medium text-green-400">OTP Code Sent!</p>
                                <p className="text-xs text-green-300/80 mt-1">
                                    Verification code sent to {formatPhoneNumber(phoneNumber)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Demo OTP Display */}
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="text-2xl">💡</div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-yellow-400">Demo OTP Code</p>
                                <p className="text-2xl font-bold text-yellow-300 mt-1 tracking-wider">{demoOTP}</p>
                                <p className="text-xs text-yellow-300/60 mt-1">
                                    In demo mode, you can enter any 6-digit code
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* OTP Input */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Enter OTP Code <span className="text-red-400">*</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="000000"
                            value={otpCode}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setOtpCode(value);
                                setError('');
                            }}
                            className="text-center text-2xl tracking-widest bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                            maxLength={6}
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            onClick={() => {
                                setOtpSent(false);
                                setOtpCode('');
                                setError('');
                            }}
                            variant="outline"
                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                        >
                            Change Number
                        </Button>
                        <Button
                            onClick={handleVerifyOTP}
                            className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold"
                            disabled={otpCode.length !== 6}
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Verify OTP
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
