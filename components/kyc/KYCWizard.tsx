'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { StepProgress } from './StepProgress';
import { Step1PhoneVerification } from './steps/Step1PhoneVerification';
import { Step2DocumentScanning } from './steps/Step2DocumentScanning';
import { Step3BiometricVerification } from './steps/Step3BiometricVerification';
import { Step4IdentityValidation } from './steps/Step4IdentityValidation';
import { useKYCFlow } from '@/hooks/useKYCFlow';
import type { KYCData } from '@/lib/kyc/types';
import { useToast } from '@/hooks/use-toast';

interface KYCWizardProps {
    manualAddress?: string;
}

export function KYCWizard({ manualAddress }: KYCWizardProps = {}) {
    const router = useRouter();
    const { toast } = useToast();
    const {
        kycData,
        currentStep,
        isLoading,
        saveStepData,
        goToNextStep,
        goToPreviousStep,
        submitKYC,
        isStepCompleted,
    } = useKYCFlow(manualAddress);

    const handleStepComplete = (data: Partial<KYCData>) => {
        saveStepData(currentStep, data);
        goToNextStep();
    };

    const handleFinalSubmit = async () => {
        try {
            const submissionId = await submitKYC();

            toast({
                title: 'KYC Submitted Successfully!',
                description: 'Your KYC application has been submitted for admin review.',
            });

            // Redirect to verify page
            router.push('/verify');
        } catch (error: any) {
            toast({
                title: 'Submission Failed',
                description: error.message || 'Please try again',
                variant: 'destructive',
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60">Loading KYC data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Progress Indicator */}
            <StepProgress
                currentStep={currentStep}
                completedSteps={kycData?.completedSteps || []}
            />

            {/* Step Content */}
            <div className="min-h-[500px]">
                {currentStep === 1 && (
                    <Step1PhoneVerification
                        data={kycData || {}}
                        onComplete={handleStepComplete}
                    />
                )}

                {currentStep === 2 && (
                    <Step2DocumentScanning
                        data={kycData || {}}
                        onComplete={handleStepComplete}
                    />
                )}

                {currentStep === 3 && (
                    <Step3BiometricVerification
                        data={kycData || {}}
                        onComplete={handleStepComplete}
                    />
                )}

                {currentStep === 4 && (
                    <Step4IdentityValidation
                        data={kycData || {}}
                        onComplete={handleStepComplete}
                        onSubmit={handleFinalSubmit}
                    />
                )}
            </div>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
                <div className="flex justify-between max-w-2xl mx-auto pt-6 border-t border-white/10">
                    <Button
                        onClick={goToPreviousStep}
                        disabled={currentStep === 1}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>

                    <Button
                        onClick={goToNextStep}
                        disabled={!isStepCompleted(currentStep)}
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold"
                    >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
        </div>
    );
}
