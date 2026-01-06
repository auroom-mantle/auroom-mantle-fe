'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Scan, CheckCircle2 } from 'lucide-react';
import { LoadingAnimation } from '../LoadingAnimation';
import { simulateOCRExtraction } from '@/lib/kyc/demoHelpers';
import type { KYCData } from '@/lib/kyc/types';
import Image from 'next/image';

interface Step2DocumentScanningProps {
    data: Partial<KYCData>;
    onComplete: (data: Partial<KYCData>) => void;
}

export function Step2DocumentScanning({ data, onComplete }: Step2DocumentScanningProps) {
    const [idCardImage, setIdCardImage] = useState(data.idCardImage || '');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [extractedData, setExtractedData] = useState<any>(null);

    // Form fields
    const [nik, setNik] = useState(data.nik || '');
    const [fullName, setFullName] = useState(data.fullName || '');
    const [dateOfBirth, setDateOfBirth] = useState(data.dateOfBirth || '');
    const [address, setAddress] = useState(data.address || '');
    const [province, setProvince] = useState(data.province || '');
    const [city, setCity] = useState(data.city || '');

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
            setIdCardImage(base64);

            // Start OCR simulation
            setIsScanning(true);
            setScanProgress(0);

            // Simulate progress
            const progressInterval = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(progressInterval);
                        return 95;
                    }
                    return prev + 5;
                });
            }, 100);

            try {
                const result = await simulateOCRExtraction(file);
                clearInterval(progressInterval);
                setScanProgress(100);

                // Set extracted data
                setExtractedData(result);
                setNik(result.nik);
                setFullName(result.fullName);
                setDateOfBirth(result.dateOfBirth);
                setAddress(result.address);
                setProvince(result.province);
                setCity(result.city);

                setTimeout(() => setIsScanning(false), 500);
            } catch (error) {
                clearInterval(progressInterval);
                setIsScanning(false);
                alert('Error scanning document. Please try again.');
            }
        };
        reader.readAsDataURL(file);
    };

    const handleConfirm = () => {
        if (!nik || !fullName || !dateOfBirth || !address) {
            alert('Please fill in all required fields');
            return;
        }

        onComplete({
            idCardImage,
            nik,
            fullName,
            dateOfBirth,
            address,
            province,
            city,
        });
    };

    if (isScanning) {
        return (
            <LoadingAnimation
                message="Scanning ID Card..."
                progress={scanProgress}
                subMessage="Extracting data using OCR technology"
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
                        <h3 className="font-semibold text-blue-400 mb-1">Demo Mode - OCR Simulation</h3>
                        <p className="text-sm text-blue-300/80">
                            Upload any image and we'll simulate OCR extraction with demo data. In production, this would use real OCR technology.
                        </p>
                    </div>
                </div>
            </div>

            {/* Step Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
                    <FileText className="w-8 h-8 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Document Scanning</h2>
                <p className="text-white/60">
                    Upload your KTP/ID card for automatic data extraction
                </p>
            </div>

            {/* File Upload */}
            {!idCardImage ? (
                <div className="space-y-6">
                    <label className="block">
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-yellow-500/50 transition-colors cursor-pointer bg-zinc-900/50">
                            <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                            <p className="text-white font-medium mb-2">Click to upload ID card</p>
                            <p className="text-sm text-white/60">PNG, JPG up to 5MB</p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Image Preview */}
                    <div className="relative">
                        <div className="aspect-[16/10] relative rounded-xl overflow-hidden border-2 border-yellow-500/30">
                            <Image
                                src={idCardImage}
                                alt="ID Card"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <Button
                            onClick={() => {
                                setIdCardImage('');
                                setExtractedData(null);
                            }}
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 border-white/20 bg-black/80 text-white hover:bg-black"
                        >
                            Change Image
                        </Button>
                    </div>

                    {/* Extracted Data Notice */}
                    {extractedData && (
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Scan className="w-5 h-5 text-green-400" />
                                <div>
                                    <p className="text-sm font-medium text-green-400">Data Extracted Successfully!</p>
                                    <p className="text-xs text-green-300/80 mt-1">
                                        Please review and edit if needed
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Extracted Data Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                NIK (ID Number) <span className="text-red-400">*</span>
                            </label>
                            <Input
                                type="text"
                                value={nik}
                                onChange={(e) => setNik(e.target.value.replace(/\D/g, '').slice(0, 16))}
                                placeholder="3174012345678901"
                                className="bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                                maxLength={16}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Full Name <span className="text-red-400">*</span>
                            </label>
                            <Input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Date of Birth <span className="text-red-400">*</span>
                            </label>
                            <Input
                                type="text"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                placeholder="DD/MM/YYYY"
                                className="bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Province <span className="text-red-400">*</span>
                            </label>
                            <Input
                                type="text"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                placeholder="DKI Jakarta"
                                className="bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                City <span className="text-red-400">*</span>
                            </label>
                            <Input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Jakarta Selatan"
                                className="bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Address <span className="text-red-400">*</span>
                            </label>
                            <Input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Jl. Sudirman No. 123"
                                className="bg-zinc-900 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleConfirm}
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold"
                        disabled={!nik || !fullName || !dateOfBirth || !address}
                    >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Confirm Data
                    </Button>
                </div>
            )}
        </div>
    );
}
