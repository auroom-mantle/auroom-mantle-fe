'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, CheckCircle2, XCircle, Clock, Filter } from 'lucide-react';
import { getAllSubmissions } from '@/lib/kyc/storage';
import type { KYCSubmission } from '@/lib/kyc/types';
import { KYCDetailModal } from './KYCDetailModal';

export function KYCReviewTab() {
    const { address } = useAccount();
    const [submissions, setSubmissions] = useState<KYCSubmission[]>([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState<KYCSubmission[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'approved' | 'rejected'>('all');
    const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null);

    // Load submissions
    useEffect(() => {
        loadSubmissions();
    }, []);

    // Filter submissions
    useEffect(() => {
        let filtered = submissions;

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(s => s.status === statusFilter);
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                s =>
                    s.walletAddress.toLowerCase().includes(query) ||
                    s.fullName.toLowerCase().includes(query) ||
                    s.nik.includes(query)
            );
        }

        setFilteredSubmissions(filtered);
    }, [submissions, statusFilter, searchQuery]);

    const loadSubmissions = () => {
        const all = getAllSubmissions();
        setSubmissions(all);
    };

    const handleViewDetails = (submission: KYCSubmission) => {
        setSelectedSubmission(submission);
    };

    const handleCloseModal = () => {
        setSelectedSubmission(null);
        loadSubmissions(); // Reload to get updated data
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'submitted':
                return (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                );
            case 'approved':
                return (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approved
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                    </Badge>
                );
            default:
                return null;
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">KYC Submissions Review</h2>
                <p className="text-white/60">
                    Review and approve KYC submissions to verify wallet addresses
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                        type="text"
                        placeholder="Search by address, name, or NIK..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                    />
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                    {(['all', 'submitted', 'approved', 'rejected'] as const).map((status) => (
                        <Button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            variant={statusFilter === status ? 'default' : 'outline'}
                            size="sm"
                            className={
                                statusFilter === status
                                    ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                                    : 'border-white/20 text-white hover:bg-white/10'
                            }
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-400">
                        {submissions.filter(s => s.status === 'submitted').length}
                    </div>
                    <div className="text-sm text-yellow-300/80">Pending Review</div>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">
                        {submissions.filter(s => s.status === 'approved').length}
                    </div>
                    <div className="text-sm text-green-300/80">Approved</div>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="text-2xl font-bold text-red-400">
                        {submissions.filter(s => s.status === 'rejected').length}
                    </div>
                    <div className="text-sm text-red-300/80">Rejected</div>
                </div>
            </div>

            {/* Submissions Table */}
            <div className="border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                    Wallet Address
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                    Full Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                    NIK
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                    Submitted
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredSubmissions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-white/60">
                                        No submissions found
                                    </td>
                                </tr>
                            ) : (
                                filteredSubmissions.map((submission) => (
                                    <tr
                                        key={submission.id}
                                        className="hover:bg-white/5 transition-colors cursor-pointer"
                                        onClick={() => handleViewDetails(submission)}
                                    >
                                        <td className="px-4 py-4 text-sm">
                                            <code className="text-yellow-400">
                                                {submission.walletAddress.slice(0, 6)}...{submission.walletAddress.slice(-4)}
                                            </code>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-white">{submission.fullName}</td>
                                        <td className="px-4 py-4 text-sm text-white/80 font-mono">{submission.nik}</td>
                                        <td className="px-4 py-4 text-sm text-white/60">
                                            {formatDate(submission.submittedAt || 0)}
                                        </td>
                                        <td className="px-4 py-4 text-sm">{getStatusBadge(submission.status)}</td>
                                        <td className="px-4 py-4 text-sm">
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewDetails(submission);
                                                }}
                                                size="sm"
                                                variant="outline"
                                                className="border-white/20 text-white hover:bg-white/10"
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedSubmission && (
                <KYCDetailModal
                    submission={selectedSubmission}
                    onClose={handleCloseModal}
                    reviewerAddress={address || ''}
                />
            )}
        </div>
    );
}
