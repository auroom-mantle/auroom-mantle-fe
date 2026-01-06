// KYC Data Types and Interfaces

export interface KYCData {
    // Step 1: Phone Verification
    phoneNumber: string;
    phoneVerified: boolean;
    otpCode?: string;

    // Step 2: Document Scanning (OCR)
    idCardImage: string; // base64
    nik: string; // 16-digit Indonesian ID number
    fullName: string;
    dateOfBirth: string; // DD/MM/YYYY
    address: string;
    province: string;
    city: string;

    // Step 3: Biometric Verification
    selfieImage: string; // base64
    faceMatchScore: number; // 0-100
    livenessCheckPassed: boolean;

    // Step 4: Identity Validation
    validationResults: {
        nikVerified: boolean;
        faceVerified: boolean;
        livenessVerified: boolean;
        dataConsistent: boolean;
    };

    // Metadata
    walletAddress: string;
    currentStep: 1 | 2 | 3 | 4;
    completedSteps: number[];
    status: 'in-progress' | 'submitted' | 'approved' | 'rejected';
    submittedAt?: number;
    reviewedAt?: number;
    reviewedBy?: string;
    rejectionReason?: string;
}

export interface KYCSubmission extends KYCData {
    id: string;
    status: 'submitted' | 'approved' | 'rejected';
}

export interface OCRResult {
    nik: string;
    fullName: string;
    dateOfBirth: string;
    address: string;
    province: string;
    city: string;
}

export interface ValidationResult {
    nikVerified: boolean;
    faceVerified: boolean;
    livenessVerified: boolean;
    dataConsistent: boolean;
    message: string;
}

export type KYCStep = 1 | 2 | 3 | 4;

export const KYC_STEP_TITLES = {
    1: 'Phone Number Verification',
    2: 'Document Scanning (OCR ID Card)',
    3: 'Biometric Verification',
    4: 'Official Identity Validation',
} as const;

export const KYC_STEP_DESCRIPTIONS = {
    1: 'Verify your phone number with OTP code',
    2: 'Upload and scan your KTP/ID card',
    3: 'Take a selfie for face verification',
    4: 'Final validation with government database',
} as const;
