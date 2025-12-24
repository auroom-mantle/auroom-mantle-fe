// Contract addresses for Mantle Sepolia (Chain ID: 5003)

export const CONTRACTS = {
  // ===== TOKENS =====
  IDRX: "0x6EC7D79792D4D73eb711d36aB5b5f24014f18d05" as const,
  USDC: "0x96ABff3a2668B811371d7d763f06B3832CEdf38d" as const,
  XAUT: "0x1d6f37f76E2AB1cf9A242a34082eDEc163503A78" as const,

  // ===== INFRASTRUCTURE =====
  IdentityRegistry: "0x620870d419F6aFca8AFed5B516619aa50900cadc" as const,
  UniswapV2Factory: "0x8950d0D71a23085C514350df2682c3f6F1D7aBFE" as const,
  UniswapV2Router: "0x54166b2C5e09f16c3c1D705FfB4eb29a069000A9" as const,

  // ===== LIQUIDITY PAIRS =====
  IDRX_USDC_Pair: "0xD3FF8e1C2821745513Ef83f3551668A7ce791Fe2" as const,
  XAUT_USDC_Pair: "0xc2da5178F53f45f604A275a3934979944eB15602" as const,

  // ===== CORE PROTOCOL =====
  SwapRouter: "0xF948Dd812E7fA072367848ec3D198cc61488b1b9" as const,
  GoldVault: "0xd92cE2F13509840B1203D35218227559E64fbED0" as const,
  BorrowingProtocol: "0x6efa29db6e0b323649abdf9fbd45cada8bed782c" as const,
} as const;

export type ContractName = keyof typeof CONTRACTS;

export const DEPLOYER = "0x742812a2Ff08b76f968dffA7ca6892A428cAeBb1" as const;
