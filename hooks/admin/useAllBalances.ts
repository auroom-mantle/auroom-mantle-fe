import { useReadContract, useAccount } from 'wagmi';
import { MockTokenABI } from '@/lib/contracts/abis/MockToken';
import { UniswapV2PairABI } from '@/lib/contracts/abis/UniswapV2Pair';
import { CONTRACTS } from '@/lib/contracts/addresses';
import { formatUnits } from 'viem';

export interface TokenBalance {
    symbol: string;
    address: `0x${string}`;
    balance: bigint;
    formatted: string;
    decimals: number;
}

/**
 * Hook to fetch all token balances for the connected wallet
 */
export function useAllBalances() {
    const { address } = useAccount();

    // IDRX Balance
    const { data: idrxBalance } = useReadContract({
        address: CONTRACTS.IDRX,
        abi: MockTokenABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    // USDC Balance
    const { data: usdcBalance } = useReadContract({
        address: CONTRACTS.USDC,
        abi: MockTokenABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    // XAUT Balance
    const { data: xautBalance } = useReadContract({
        address: CONTRACTS.XAUT,
        abi: MockTokenABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    // gXAUT Balance
    const { data: gxautBalance } = useReadContract({
        address: CONTRACTS.GoldVault,
        abi: MockTokenABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    // IDRX/USDC LP Balance
    const { data: idrxUsdcLpBalance } = useReadContract({
        address: CONTRACTS.IDRX_USDC_Pair,
        abi: UniswapV2PairABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    // XAUT/USDC LP Balance
    const { data: xautUsdcLpBalance } = useReadContract({
        address: CONTRACTS.XAUT_USDC_Pair,
        abi: UniswapV2PairABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    const balances: TokenBalance[] = [
        {
            symbol: 'IDRX',
            address: CONTRACTS.IDRX,
            balance: idrxBalance || 0n,
            formatted: formatUnits(idrxBalance || 0n, 6),
            decimals: 6,
        },
        {
            symbol: 'USDC',
            address: CONTRACTS.USDC,
            balance: usdcBalance || 0n,
            formatted: formatUnits(usdcBalance || 0n, 6),
            decimals: 6,
        },
        {
            symbol: 'XAUT',
            address: CONTRACTS.XAUT,
            balance: xautBalance || 0n,
            formatted: formatUnits(xautBalance || 0n, 6),
            decimals: 6,
        },
        {
            symbol: 'gXAUT',
            address: CONTRACTS.GoldVault,
            balance: gxautBalance || 0n,
            formatted: formatUnits(gxautBalance || 0n, 6),
            decimals: 6,
        },
        {
            symbol: 'LP-IDRX/USDC',
            address: CONTRACTS.IDRX_USDC_Pair,
            balance: idrxUsdcLpBalance || 0n,
            formatted: formatUnits(idrxUsdcLpBalance || 0n, 18),
            decimals: 18,
        },
        {
            symbol: 'LP-XAUT/USDC',
            address: CONTRACTS.XAUT_USDC_Pair,
            balance: xautUsdcLpBalance || 0n,
            formatted: formatUnits(xautUsdcLpBalance || 0n, 18),
            decimals: 18,
        },
    ];

    return { balances, address };
}
