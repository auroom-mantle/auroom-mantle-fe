// Re-export ABIs from the abi directory
export { ABIs, CONTRACTS as ABI_CONTRACTS } from '@/abi';

// For convenience, export commonly used ABIs
import MockIDRXABI from '@/abi/MockIDRXV2.json';
import XAUTABI from '@/abi/XAUT.json';
import IdentityRegistryABI from '@/abi/IdentityRegistry.json';
import SwapRouterABI from '@/abi/SwapRouter.json';
import GoldVaultABI from '@/abi/GoldVault.json';
import UniswapV2Router02ABI from '@/abi/UniswapV2Router02.json';
import BorrowingProtocolABI from '@/abi/BorrowingProtocol.json';

export {
    MockIDRXABI as ERC20ABI,
    IdentityRegistryABI,
    SwapRouterABI,
    GoldVaultABI,
    UniswapV2Router02ABI as UniswapV2RouterABI,
    XAUTABI,
    BorrowingProtocolABI
};
