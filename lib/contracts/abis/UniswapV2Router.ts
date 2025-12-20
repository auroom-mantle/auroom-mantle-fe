// UniswapV2Router ABI - for liquidity management
export const UniswapV2RouterABI = [
    {
        inputs: [
            { name: "tokenA", type: "address" },
            { name: "tokenB", type: "address" },
            { name: "amountADesired", type: "uint256" },
            { name: "amountBDesired", type: "uint256" },
            { name: "amountAMin", type: "uint256" },
            { name: "amountBMin", type: "uint256" },
            { name: "to", type: "address" },
            { name: "deadline", type: "uint256" },
        ],
        name: "addLiquidity",
        outputs: [
            { name: "amountA", type: "uint256" },
            { name: "amountB", type: "uint256" },
            { name: "liquidity", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { name: "tokenA", type: "address" },
            { name: "tokenB", type: "address" },
            { name: "liquidity", type: "uint256" },
            { name: "amountAMin", type: "uint256" },
            { name: "amountBMin", type: "uint256" },
            { name: "to", type: "address" },
            { name: "deadline", type: "uint256" },
        ],
        name: "removeLiquidity",
        outputs: [
            { name: "amountA", type: "uint256" },
            { name: "amountB", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { name: "amountIn", type: "uint256" },
            { name: "path", type: "address[]" },
        ],
        name: "getAmountsOut",
        outputs: [{ name: "amounts", type: "uint256[]" }],
        stateMutability: "view",
        type: "function",
    },
] as const;
