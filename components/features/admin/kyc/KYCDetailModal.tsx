'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    X,
    CheckCircle2,
    XCircle,
    Phone,
    FileText,
    User,
    Shield,
    Loader2,
} from 'lucide-react';
import { updateSubmissionStatus, type KYCSubmission } from '@/lib/kyc/storage';
import { useIdentityRegistry } from '@/hooks/contracts/useIdentityRegistry';
import { useToast } from '@/hooks/use-toast';
import type { Address } from 'viem';
import Image from 'next/image';

interface KYCDetailModalProps {
    submission: KYCSubmission;
    onClose: () => void;
    reviewerAddress: string;
}

export function KYCDetailModal({ submission, onClose, reviewerAddress }: KYCDetailModalProps) {
    const { toast } = useToast();
    const { registerIdentity, isPending, isConfirming, isSuccess, error } = useIdentityRegistry();
    const [rejectionReason, setRejectionReason] = useState('');
    const [isRejecting, setIsRejecting] = useState(false);

    const handleApprove = async () => {
        try {
            // Call smart contract to register identity
            registerIdentity(submission.walletAddress as Address);

            // Wait for transaction confirmation
            // The useIdentityRegistry hook handles the transaction state
        } catch (err: any) {
            toast({
                title: 'Approval Failed',
                description: err.message || 'Failed to approve KYC',
                variant: 'destructive',
            });
        }
    };

    // Update local storage when blockchain transaction succeeds
    if (isSuccess && submission.status === 'submitted') {
        updateSubmissionStatus(submission.id, 'approved', reviewerAddress);
        toast({
            title: 'KYC Approved!',
            description: `Wallet ${submission.walletAddress.slice(0, 6)}...${submission.walletAddress.slice(-4)} has been verified on blockchain`,
        });
        onClose();
    }

    const handleReject = () => {
        if (!rejectionReason.trim()) {
            toast({
                title: 'Rejection Reason Required',
                description: 'Please provide a reason for rejection',
                variant: 'destructive',
            });
            return;
        }

        updateSubmissionStatus(submission.id, 'rejected', reviewerAddress, rejectionReason);

        toast({
            title: 'KYC Rejected',
            description: 'The submission has been rejected',
        });

        onClose();
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'submitted':
                return (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Pending Review
                    </Badge>
                );
            case 'approved':
                return (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Approved
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        Rejected
                    </Badge>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border-2 border-yellow-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-zinc-900 border-b border-white/10 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">KYC Submission Details</h2>
                        <p className="text-sm text-white/60">Review all verification steps</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {getStatusBadge(submission.status)}
                        <Button
                            onClick={onClose}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Step 1: Phone Verification */}
                    <div className="p-4 bg-zinc-800 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                <Phone className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Step 1: Phone Verification</h3>
                                <p className="text-xs text-white/60">OTP verified</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto" />
                        </div>
                        <div className="text-sm text-white/80">
                            <span className="text-white/60">Phone Number:</span> {submission.phoneNumber}
                        </div>
                    </div>

                    {/* Step 2: Document Scanning */}
                    <div className="p-4 bg-zinc-800 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Step 2: Document Scanning</h3>
                                <p className="text-xs text-white/60">ID card verified</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto" />
                        </div>

                        {/* ID Card Image */}
                        {submission.idCardImage && (
                            <div className="mb-4 aspect-[16/10] relative rounded-lg overflow-hidden border border-white/10">
                                <Image
                                    src={submission.idCardImage}
                                    alt="ID Card"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}

                        {/* Extracted Data */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-white/60">NIK:</span>
                                <div className="text-white font-mono">{submission.nik}</div>
                            </div>
                            <div>
                                <span className="text-white/60">Full Name:</span>
                                <div className="text-white">{submission.fullName}</div>
                            </div>
                            <div>
                                <span className="text-white/60">Date of Birth:</span>
                                <div className="text-white">{submission.dateOfBirth}</div>
                            </div>
                            <div>
                                <span className="text-white/60">Province:</span>
                                <div className="text-white">{submission.province}</div>
                            </div>
                            <div className="col-span-2">
                                <span className="text-white/60">Address:</span>
                                <div className="text-white">{submission.address}</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Biometric Verification */}
                    <div className="p-4 bg-zinc-800 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Step 3: Biometric Verification</h3>
                                <p className="text-xs text-white/60">Face match confirmed</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Selfie Image */}
                            {submission.selfieImage && (
                                <div className="aspect-square relative rounded-lg overflow-hidden border border-white/10">
                                    <Image
                                        src={submission.selfieImage}
                                        alt="Selfie"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Biometric Results */}
                            <div className="space-y-3">
                                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                                    <div className="text-xs text-green-300/80 mb-1">Face Match Score</div>
                                    <div className="text-2xl font-bold text-green-400">{submission.faceMatchScore}%</div>
                                </div>
                                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                                    <div className="text-xs text-green-300/80 mb-1">Liveness Check</div>
                                    <div className="text-sm font-semibold text-green-400">
                                        {submission.livenessCheckPassed ? 'PASSED ✓' : 'FAILED ✗'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Identity Validation */}
                    <div className="p-4 bg-zinc-800 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Step 4: Identity Validation</h3>
                                <p className="text-xs text-white/60">Government database verified</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {submission.validationResults?.nikVerified && (
                                <div className="flex items-center gap-2 text-sm text-green-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>NIK Verified</span>
                                </div>
                            )}
                            {submission.validationResults?.faceVerified && (
                                <div className="flex items-center gap-2 text-sm text-green-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Face Verified</span>
                                </div>
                            )}
                            {submission.validationResults?.livenessVerified && (
                                <div className="flex items-center gap-2 text-sm text-green-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Liveness Verified</span>
                                </div>
                            )}
                            {submission.validationResults?.dataConsistent && (
                                <div className="flex items-center gap-2 text-sm text-green-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Data Consistent</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Wallet Address */}
                    <div className="p-4 bg-zinc-800 rounded-xl">
                        <div className="text-sm text-white/60 mb-1">Wallet Address</div>
                        <code className="text-yellow-400 font-mono">{submission.walletAddress}</code>
                    </div>

                    {/* Rejection Reason (if rejected) */}
                    {submission.status === 'rejected' && submission.rejectionReason && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <div className="text-sm font-medium text-red-400 mb-1">Rejection Reason</div>
                            <div className="text-sm text-red-300/80">{submission.rejectionReason}</div>
                        </div>
                    )}

                    {/* Actions (only for pending submissions) */}
                    {submission.status === 'submitted' && (
                        <div className="space-y-4 pt-4 border-t border-white/10">
                            {!isRejecting ? (
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => setIsRejecting(true)}
                                        variant="outline"
                                        className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                                    >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject
                                    </Button>
                                    <Button
                                        onClick={handleApprove}
                                        disabled={isPending || isConfirming}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold"
                                    >
                                        {isPending || isConfirming ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                {isPending ? 'Approving...' : 'Confirming...'}
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Approve & Verify on Blockchain
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Rejection Reason <span className="text-red-400">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter reason for rejection..."
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            className="bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() => {
                                                setIsRejecting(false);
                                                setRejectionReason('');
                                            }}
                                            variant="outline"
                                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleReject}
                                            disabled={!rejectionReason.trim()}
                                            className="flex-1 bg-red-500 hover:bg-red-400 text-white font-semibold"
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Confirm Rejection
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                                    Error: {error.message}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
