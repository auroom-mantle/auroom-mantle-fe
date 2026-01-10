// Contract addresses for Lisk Sepolia (Chain ID: 4202)

export const LISK_CONTRACTS = {
  // ===== TOKENS =====

  IDRX: "0xe0f7ea8fb1a7e9e9f8838d0e24b7a0f750c68d40" as const,
  USDC: "0xA8F2b8180caFC670f4a24114FDB9c50361038857" as const,
  XAUT: "0xDb198BEaccC55934062Be9AAEdce332c40A1f1Ed" as const,

  // ===== INFRASTRUCTURE =====
  IdentityRegistry: "0x799fe52FA871EB8e4420fEc9d1b81c6297e712a5" as const,
  UniswapV2Factory: "0x96abff3a2668b811371d7d763f06b3832cedf38d" as const,
  UniswapV2Router: "0x6036306f417d720228ab939650e8acbe948d2d2b" as const,

  // ===== LIQUIDITY PAIRS =====
  IDRX_USDC_Pair: "0xB0ea91604C8B98205cbDd5c3F7d8DB006404515F" as const,
  XAUT_USDC_Pair: "0xBdfD81D4e79c0cC949BB52941BCd30Ed8b3B4112" as const,

  // ===== CORE PROTOCOL =====
  SwapRouter: "0x8cDE80170b877a51a17323628BA6221F6F023505" as const,
  GoldVault: "0x0000000000000000000000000000000000000001" as const, // Not deployed on Lisk Sepolia - using dummy address

  // Borrowing Protocol V2 (Instant Borrow)
  BorrowingProtocolV2: "0x8c49cF7B7CCE0fBffADFe44F764fe6c5F2df82F9" as const,

  // Alias for backward compatibility (V1 doesn't exist on Lisk, so we point to V2)
  BorrowingProtocol: "0x8c49cF7B7CCE0fBffADFe44F764fe6c5F2df82F9" as const,
} as const;

export type ContractName = keyof typeof LISK_CONTRACTS;

export const DEPLOYER = "0x742812a2Ff08b76f968dffA7ca6892A428cAeBb1" as const;
