import { useReadContract } from 'wagmi';
import { ERC20ABI } from '@/lib/contracts/abis';
import type { Address } from 'viem';

export function useTokenAllowance(
    tokenAddress: Address | undefined,
    ownerAddress: Address | undefined,
    spenderAddress: Address | undefined
) {
    return useReadContract({
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: 'allowance',
        args: ownerAddress && spenderAddress ? [ownerAddress, spenderAddress] : undefined,
        query: {
            enabled: !!tokenAddress && !!ownerAddress && !!spenderAddress,
            refetchInterval: 2000, // Auto-refetch every 2 seconds to catch approval updates
        },
    });
}
