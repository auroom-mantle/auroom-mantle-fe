'use client';

import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACTS } from '@/lib/contracts/addresses';
import { GoldVaultABI } from '@/lib/contracts/abis';

interface LandingStats {
    tvl: string; // Total XAUT in vault
    tvlUsd: string; // TVL in USD
    sharePrice: string; // gXAUT share price
    estimatedApy: string; // Estimated APY
    xautPrice: string; // XAUT price in USD (approximate)
    xautPriceIdrx: string; // XAUT price in IDRX
    // Borrowing Protocol Stats (V2)
    totalCollateral: string; // Total XAUT collateral in borrowing protocol
    totalCollateralIDR: string; // Total collateral value in IDR
    totalLoans: string; // Estimated total loans (collateral * avg LTV)
    isLoading: boolean;
    error: Error | null;
}

export function useLandingStats(autoRefresh = true): LandingStats {
    const [refreshKey, setRefreshKey] = useState(0);

    // Fetch total assets (TVL in XAUT)
    const { data: totalAssets, isLoading: loadingAssets } = useReadContract({
        address: CONTRACTS.GoldVault,
        abi: GoldVaultABI,
        functionName: 'totalAssets',
        query: {
            refetchInterval: autoRefresh ? 30000 : false, // Refresh every 30s
        },
    });

    // Fetch total supply (total gXAUT)
    const { data: totalSupply, isLoading: loadingSupply } = useReadContract({
        address: CONTRACTS.GoldVault,
        abi: GoldVaultABI,
        functionName: 'totalSupply',
        query: {
            refetchInterval: autoRefresh ? 30000 : false,
        },
    });

    // Fetch share price (1 gXAUT = ? XAUT)
    const { data: sharePriceRaw, isLoading: loadingSharePrice } = useReadContract({
        address: CONTRACTS.GoldVault,
        abi: GoldVaultABI,
        functionName: 'convertToAssets',
        args: [BigInt(1e6)], // 1 gXAUT (6 decimals)
        query: {
            refetchInterval: autoRefresh ? 30000 : false,
        },
    });

    const isLoading = loadingAssets || loadingSupply || loadingSharePrice;

    // Calculate stats
    const tvl = totalAssets ? formatUnits(totalAssets as bigint, 6) : '0';
    const sharePrice = sharePriceRaw ? formatUnits(sharePriceRaw as bigint, 6) : '1.0';

    // Approximate XAUT price (1 XAUT ≈ 1 oz gold ≈ $2,700)
    const xautPrice = '2,700';
    const tvlUsd = totalAssets
        ? (parseFloat(formatUnits(totalAssets as bigint, 6)) * 2700).toLocaleString('en-US', {
            maximumFractionDigits: 0,
        })
        : '0';

    // Approximate XAUT price in IDRX (1 USD ≈ 15,500 IDR)
    const xautPriceIdrx = '41,850,000'; // 2,700 * 15,500

    // Calculate estimated APY (simplified - based on share price growth)
    // For now, we'll use a mock value since we need historical data
    const estimatedApy = '8-15%';

    // Auto-refresh effect
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            setRefreshKey((prev) => prev + 1);
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [autoRefresh]);

    // Fetch XAUT balance of BorrowingProtocolV2 (total collateral)
    const { data: borrowingCollateral, isLoading: loadingBorrowingCollateral } = useReadContract({
        address: CONTRACTS.XAUT,
        abi: [
            {
                inputs: [{ name: 'account', type: 'address' }],
                name: 'balanceOf',
                outputs: [{ name: '', type: 'uint256' }],
                stateMutability: 'view',
                type: 'function',
            },
        ],
        functionName: 'balanceOf',
        args: [CONTRACTS.BorrowingProtocolV2],
        query: {
            refetchInterval: autoRefresh ? 30000 : false,
        },
    });

    // Calculate borrowing stats
    const totalCollateral = borrowingCollateral
        ? formatUnits(borrowingCollateral as bigint, 6)
        : '0';

    const collateralInIDR = borrowingCollateral
        ? parseFloat(formatUnits(borrowingCollateral as bigint, 6)) * 41850000 // XAUT price in IDR
        : 0;

    const totalCollateralIDR = collateralInIDR > 0
        ? collateralInIDR.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
        : 'Rp 0';

    // Estimate total loans (assuming average 30% LTV)
    const estimatedLoans = collateralInIDR * 0.3;
    const totalLoans = estimatedLoans > 0
        ? estimatedLoans.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
        : 'Rp 0';

    return {
        tvl,
        tvlUsd,
        sharePrice,
        estimatedApy,
        xautPrice,
        xautPriceIdrx,
        totalCollateral,
        totalCollateralIDR,
        totalLoans,
        isLoading: isLoading || loadingBorrowingCollateral,
        error: null,
    };
}
