// LocalStorage service for KYC data
import type { KYCData, KYCSubmission } from './types';

export type { KYCSubmission };

const KYC_STORAGE_KEY = 'auroom_kyc_data';
const KYC_SUBMISSIONS_KEY = 'auroom_kyc_submissions';

/**
 * Save KYC progress for a wallet address
 */
export function saveKYCProgress(walletAddress: string, data: Partial<KYCData>): void {
    try {
        const allData = getAllKYCData();
        allData[walletAddress.toLowerCase()] = {
            ...allData[walletAddress.toLowerCase()],
            ...data,
            walletAddress: walletAddress.toLowerCase(),
        };
        localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(allData));
    } catch (error) {
        console.error('Error saving KYC progress:', error);
    }
}

/**
 * Get KYC data for a wallet address
 */
export function getKYCData(walletAddress: string): Partial<KYCData> | null {
    try {
        const allData = getAllKYCData();
        return allData[walletAddress.toLowerCase()] || null;
    } catch (error) {
        console.error('Error getting KYC data:', error);
        return null;
    }
}

/**
 * Get all KYC data (for internal use)
 */
function getAllKYCData(): Record<string, Partial<KYCData>> {
    try {
        const data = localStorage.getItem(KYC_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error parsing KYC data:', error);
        return {};
    }
}

/**
 * Reset KYC progress for a wallet address
 */
export function resetKYCProgress(walletAddress: string): void {
    try {
        const allData = getAllKYCData();
        delete allData[walletAddress.toLowerCase()];
        localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(allData));
    } catch (error) {
        console.error('Error resetting KYC progress:', error);
    }
}

/**
 * Submit KYC for admin review
 */
export function submitKYCForReview(data: KYCData): string {
    try {
        const submissions = getAllSubmissions();
        const id = `kyc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const submission: KYCSubmission = {
            ...data,
            id,
            status: 'submitted',
            submittedAt: Date.now(),
        };

        submissions.push(submission);
        localStorage.setItem(KYC_SUBMISSIONS_KEY, JSON.stringify(submissions));

        // Update progress status
        saveKYCProgress(data.walletAddress, { status: 'submitted', submittedAt: Date.now() });

        return id;
    } catch (error) {
        console.error('Error submitting KYC:', error);
        throw error;
    }
}

/**
 * Get all KYC submissions (for admin)
 */
export function getAllSubmissions(): KYCSubmission[] {
    try {
        const data = localStorage.getItem(KYC_SUBMISSIONS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting submissions:', error);
        return [];
    }
}

/**
 * Get submissions by status
 */
export function getSubmissionsByStatus(status: 'pending' | 'approved' | 'rejected'): KYCSubmission[] {
    const all = getAllSubmissions();
    return all.filter(s => s.status === status);
}

/**
 * Get submission by ID
 */
export function getSubmissionById(id: string): KYCSubmission | null {
    const all = getAllSubmissions();
    return all.find(s => s.id === id) || null;
}

/**
 * Get submission by wallet address
 */
export function getSubmissionByAddress(walletAddress: string): KYCSubmission | null {
    const all = getAllSubmissions();
    return all.find(s => s.walletAddress.toLowerCase() === walletAddress.toLowerCase()) || null;
}

/**
 * Update submission status (for admin)
 */
export function updateSubmissionStatus(
    id: string,
    status: 'approved' | 'rejected',
    reviewerAddress: string,
    rejectionReason?: string
): void {
    try {
        const submissions = getAllSubmissions();
        const index = submissions.findIndex(s => s.id === id);

        if (index === -1) {
            throw new Error('Submission not found');
        }

        submissions[index] = {
            ...submissions[index],
            status,
            reviewedAt: Date.now(),
            reviewedBy: reviewerAddress,
            rejectionReason,
        };

        localStorage.setItem(KYC_SUBMISSIONS_KEY, JSON.stringify(submissions));

        // Also update the user's KYC progress
        saveKYCProgress(submissions[index].walletAddress, {
            status,
            reviewedAt: Date.now(),
            reviewedBy: reviewerAddress,
            rejectionReason,
        });
    } catch (error) {
        console.error('Error updating submission status:', error);
        throw error;
    }
}

/**
 * Clear all KYC data (admin only - for testing)
 */
export function clearAllKYCData(): void {
    try {
        localStorage.removeItem(KYC_STORAGE_KEY);
        localStorage.removeItem(KYC_SUBMISSIONS_KEY);
    } catch (error) {
        console.error('Error clearing KYC data:', error);
    }
}
