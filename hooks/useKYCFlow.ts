// Custom hook for managing KYC wizard flow
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import type { KYCData, KYCStep } from '@/lib/kyc/types';
import {
    saveKYCProgress,
    getKYCData,
    resetKYCProgress,
    submitKYCForReview,
    getSubmissionByAddress,
} from '@/lib/kyc/storage';

export function useKYCFlow(manualAddress?: string) {
    const { address: connectedAddress } = useAccount();
    // Use manual address if provided, otherwise use connected wallet
    const address = manualAddress || connectedAddress;
    const [kycData, setKycData] = useState<Partial<KYCData> | null>(null);
    const [currentStep, setCurrentStep] = useState<KYCStep>(1);
    const [isLoading, setIsLoading] = useState(true);

    // Load KYC data on mount or when address changes
    useEffect(() => {
        if (address) {
            const data = getKYCData(address);
            if (data) {
                setKycData(data);
                setCurrentStep(data.currentStep || 1);
            } else {
                // Initialize new KYC data
                const initialData: Partial<KYCData> = {
                    walletAddress: address,
                    currentStep: 1,
                    completedSteps: [],
                    status: 'in-progress',
                    phoneVerified: false,
                    livenessCheckPassed: false,
                    faceMatchScore: 0,
                };
                setKycData(initialData);
                saveKYCProgress(address, initialData);
            }
            setIsLoading(false);
        }
    }, [address]);

    // Save step data
    const saveStepData = useCallback(
        (step: KYCStep, data: Partial<KYCData>) => {
            if (!address) return;

            const updatedData: Partial<KYCData> = {
                ...kycData,
                ...data,
                currentStep: step,
                completedSteps: [...(kycData?.completedSteps || []), step].filter(
                    (v, i, a) => a.indexOf(v) === i
                ), // Unique steps
            };

            setKycData(updatedData);
            saveKYCProgress(address, updatedData);
        },
        [address, kycData]
    );

    // Go to next step
    const goToNextStep = useCallback(() => {
        if (currentStep < 4) {
            const nextStep = (currentStep + 1) as KYCStep;
            setCurrentStep(nextStep);
            if (address) {
                saveKYCProgress(address, { currentStep: nextStep });
            }
        }
    }, [currentStep, address]);

    // Go to previous step
    const goToPreviousStep = useCallback(() => {
        if (currentStep > 1) {
            const prevStep = (currentStep - 1) as KYCStep;
            setCurrentStep(prevStep);
            if (address) {
                saveKYCProgress(address, { currentStep: prevStep });
            }
        }
    }, [currentStep, address]);

    // Go to specific step
    const goToStep = useCallback(
        (step: KYCStep) => {
            setCurrentStep(step);
            if (address) {
                saveKYCProgress(address, { currentStep: step });
            }
        },
        [address]
    );

    // Submit KYC for review
    const submitKYC = useCallback(async () => {
        if (!address || !kycData) {
            throw new Error('No KYC data to submit');
        }

        // Validate all required fields
        if (
            !kycData.phoneVerified ||
            !kycData.nik ||
            !kycData.fullName ||
            !kycData.idCardImage ||
            !kycData.selfieImage ||
            !kycData.validationResults
        ) {
            throw new Error('Please complete all KYC steps');
        }

        const submissionId = submitKYCForReview(kycData as KYCData);
        return submissionId;
    }, [address, kycData]);

    // Reset KYC progress
    const resetKYC = useCallback(() => {
        if (!address) return;
        resetKYCProgress(address);
        setKycData(null);
        setCurrentStep(1);
    }, [address]);

    // Check if step is completed
    const isStepCompleted = useCallback(
        (step: KYCStep): boolean => {
            return kycData?.completedSteps?.includes(step) || false;
        },
        [kycData]
    );

    // Get submission status
    const getSubmissionStatus = useCallback(() => {
        if (!address) return null;
        return getSubmissionByAddress(address);
    }, [address]);

    return {
        kycData,
        currentStep,
        isLoading,
        saveStepData,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        submitKYC,
        resetKYC,
        isStepCompleted,
        getSubmissionStatus,
    };
}
