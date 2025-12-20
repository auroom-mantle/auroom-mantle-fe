import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { MockTokenABI } from '@/lib/contracts/abis/MockToken';

export function useMintToken(tokenAddress: `0x${string}`) {
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

    const mint = (recipient: `0x${string}`, amount: bigint) => {
        writeContract({
            address: tokenAddress,
            abi: MockTokenABI,
            functionName: 'mint',
            args: [recipient, amount],
        });
    };

    return {
        mint,
        hash,
        isPending: isWritePending,
        isConfirming,
        isSuccess: isConfirmed,
        error: writeError,
    };
}
