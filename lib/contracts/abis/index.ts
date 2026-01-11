// ABIs for Base Sepolia contracts
// GoldVault removed as it's not used

import MockIDRXABI from './MockIDRXV2.json';
import MockUSDCABI from './MockUSDC.json';
import XAUTABI from './XAUT.json';
import IdentityRegistryABI from './IdentityRegistry.json';
import SwapRouterABI from './SwapRouter.json';
import UniswapV2Router02ABI from './UniswapV2Router02.json';
import UniswapV2FactoryABI from './UniswapV2Factory.json';
import UniswapV2PairABI from './UniswapV2Pair.json';
import BorrowingProtocolABI from './BorrowingProtocol.json';
import BorrowingProtocolV2ABI from './BorrowingProtocolV2.json';

export {
    MockIDRXABI as ERC20ABI,
    MockIDRXABI,
    MockUSDCABI,
    XAUTABI,
    IdentityRegistryABI,
    SwapRouterABI,
    UniswapV2Router02ABI as UniswapV2RouterABI,
    UniswapV2FactoryABI,
    UniswapV2PairABI,
    BorrowingProtocolABI,
    BorrowingProtocolV2ABI,
};

// Export ABIs object for convenience
export const ABIs = {
    MockIDRX: MockIDRXABI,
    MockUSDC: MockUSDCABI,
    XAUT: XAUTABI,
    IdentityRegistry: IdentityRegistryABI,
    SwapRouter: SwapRouterABI,
    UniswapV2Router: UniswapV2Router02ABI,
    UniswapV2Factory: UniswapV2FactoryABI,
    UniswapV2Pair: UniswapV2PairABI,
    BorrowingProtocol: BorrowingProtocolABI,
    BorrowingProtocolV2: BorrowingProtocolV2ABI,
};
