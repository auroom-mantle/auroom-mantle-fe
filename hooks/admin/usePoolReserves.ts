import { useReadContract } from 'wagmi';
import { UniswapV2PairABI } from '@/lib/contracts/abis/UniswapV2Pair';

export function usePoolReserves(pairAddress: `0x${string}`) {
    const { data, isLoading, error, refetch } = useReadContract({
        address: pairAddress,
        abi: UniswapV2PairABI,
        functionName: 'getReserves',
    });

    const { data: token0 } = useReadContract({
        address: pairAddress,
        abi: UniswapV2PairABI,
        functionName: 'token0',
    });

    const { data: token1 } = useReadContract({
        address: pairAddress,
        abi: UniswapV2PairABI,
        functionName: 'token1',
    });

    return {
        reserve0: data?.[0],
        reserve1: data?.[1],
        timestamp: data?.[2],
        token0,
        token1,
        isLoading,
        error,
        refetch,
    };
}
