import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { MockTokenABI } from '@/lib/contracts/abis/MockToken';
import { CONTRACTS } from '@/lib/contracts/addresses';

/**
 * Hook for injecting yield into the GoldVault
 * This mints XAUT directly to the vault address to simulate yield generation
 */
export function useInjectYield() {
    const {
        writeContract,
        data: hash,
        isPending: isWritePending,
        isSuccess: isWriteSuccess,
        error: writeError
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed
    } = useWaitForTransactionReceipt({
        hash,
    });

    const injectYield = (amount: bigint) => {
        // Mint XAUT directly to the GoldVault address
        writeContract({
            address: CONTRACTS.XAUT,
            abi: MockTokenABI,
            functionName: 'mint',
            args: [CONTRACTS.GoldVault, amount],
        });
    };

    return {
        injectYield,
        hash,
        isPending: isWritePending,
        isConfirming,
        isSuccess: isConfirmed,
        error: writeError,
    };
}
