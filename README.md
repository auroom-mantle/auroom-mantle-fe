# 🏆 AuRoom Protocol - Frontend

<div align="center">

![AuRoom Banner](https://img.shields.io/badge/AuRoom-Protocol-gold?style=for-the-badge&logo=ethereum&logoColor=white)

**From Rupiah to Yield-Bearing Gold**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![wagmi](https://img.shields.io/badge/wagmi-2.19.5-purple?style=flat-square)](https://wagmi.sh/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

[🌐 Live Demo](https://auroom-testnet.vercel.app) • [📜 Smart Contracts](https://github.com/YohanesVito/auroom-sc) • [📖 Documentation](#-documentation)

</div>

---

## 🌐 Live Demo

**🔗 [https://auroom-testnet.vercel.app](https://auroom-testnet.vercel.app)**

> ⚠️ **Testnet Only**: This demo runs on Mantle Sepolia testnet. Do not use real funds.

---

## 📖 Overview

**AuRoom** is a Real World Asset (RWA) protocol that enables users to convert Indonesian Rupiah (IDRX) into tokenized gold (XAUT) and earn yield through an ERC-4626 vault system.

### Why AuRoom?

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   REGULAR DEX:                                                  │
│   IDRX ──→ XAUT ──→ 💤 Idle (0% yield)                         │
│                                                                 │
│   AUROOM:                                                       │
│   IDRX ──→ XAUT ──→ GoldVault ──→ gXAUT ──→ 📈 Earning Yield   │
│                                                                 │
│   "Not just a swap. A complete gold investment system."         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🏠 Landing Page
- Protocol overview and value proposition
- Live protocol statistics (TVL, share price, APY)
- Educational content about RWA and tokenized gold
- Comparison: AuRoom vs Traditional DEX

### 💱 Swap Page
- Swap IDRX ↔ XAUT seamlessly
- Real-time quotes from on-chain data
- Slippage protection
- Transaction status tracking

### 🏦 Vault Page
- Deposit XAUT to earn yield
- View gXAUT balance and share price
- Redeem gXAUT back to XAUT
- Track your earnings

### 🪪 Verify Page
- Check wallet verification status
- KYC requirement information

### 🛠️ Admin Page
- **Faucet**: Get test tokens (IDRX, USDC, XAUT)
- **Liquidity**: Add/remove liquidity to pools
- **Vault**: Inject yield for demo purposes
- **Identity**: Manage user verification
- **Debug**: View balances, allowances, contract info

---

## 📸 Screenshots

<details>
<summary>Click to expand screenshots</summary>

### Landing Page
![Landing Page](./screenshots/landing.png)

### Swap Page
![Swap Page](./screenshots/swap.png)

### Vault Page
![Vault Page](./screenshots/vault.png)

### Admin Page
![Admin Page](./screenshots/admin.png)

</details>

> 💡 Add your screenshots to a `screenshots/` folder

---

## 🛠️ Tech Stack

### Core
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.0 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |

### Web3
| Technology | Version | Purpose |
|------------|---------|---------|
| wagmi | 2.19.5 | React hooks for Ethereum |
| viem | 2.x | Ethereum interactions |
| RainbowKit | 2.x | Wallet connection UI |
| @tanstack/react-query | 5.x | Data fetching & caching |

### UI/UX
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.x | Utility-first styling |
| Radix UI | Various | Accessible components |
| Lucide React | 0.562.0 | Icons |
| GSAP | 3.14.2 | Animations |
| Three.js | 0.182.0 | 3D graphics |
| Recharts | 2.15.4 | Charts |
| Sonner | 2.0.7 | Toast notifications |

### Utilities
| Technology | Version | Purpose |
|------------|---------|---------|
| BigNumber.js | 9.3.1 | Precise number handling |
| date-fns | 4.1.0 | Date formatting |
| clsx | 2.1.1 | Conditional classes |

---

## 📁 Project Structure

```
auroom-fe/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── swap/
│   │   └── page.tsx          # Swap page
│   ├── vault/
│   │   └── page.tsx          # Vault page
│   ├── verify/
│   │   └── page.tsx          # Verification page
│   └── admin/
│       └── page.tsx          # Admin helper page
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── layout/               # Layout components
│   ├── landing/              # Landing page sections
│   ├── swap/                 # Swap-related components
│   ├── vault/                # Vault-related components
│   └── admin/                # Admin page components
├── hooks/                    # Custom React hooks
│   ├── useTokenBalance.ts
│   ├── useSwapRouter.ts
│   ├── useGoldVault.ts
│   └── ...
├── lib/
│   ├── contracts/            # Contract addresses & ABIs
│   ├── wagmi.ts              # Wagmi configuration
│   └── utils.ts              # Utility functions
├── providers/                # React context providers
├── types/                    # TypeScript types
└── public/                   # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YohanesVito/auroom-fe.git
cd auroom-fe

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional: Custom RPC URL
NEXT_PUBLIC_MANTLE_SEPOLIA_RPC=https://rpc.sepolia.mantle.xyz
```

---

## 📜 Contract Addresses

All contracts are deployed on **Mantle Sepolia Testnet** (Chain ID: 5003)

| Contract | Address |
|----------|---------|
| IDRX | `0x6EC7D79792D4D73eb711d36aB5b5f24014f18d05` |
| USDC | `0x96ABff3a2668B811371d7d763f06B3832CEdf38d` |
| XAUT | `0x1d6f37f76E2AB1cf9A242a34082eDEc163503A78` |
| IdentityRegistry | `0x620870d419F6aFca8AFed5B516619aa50900cadc` |
| UniswapV2Router | `0x54166b2C5e09f16c3c1D705FfB4eb29a069000A9` |
| SwapRouter | `0xF948Dd812E7fA072367848ec3D198cc61488b1b9` |
| GoldVault (gXAUT) | `0xd92cE2F13509840B1203D35218227559E64fbED0` |

---

## 🎮 How to Use

### 1. Connect Wallet

1. Click "Connect Wallet" button
2. Select your preferred wallet (MetaMask, Coinbase, etc.)
3. Switch to Mantle Sepolia network if prompted

### 2. Get Test Tokens

1. Go to [Admin Page](https://auroom-testnet.vercel.app/admin)
2. Use the Faucet tab to mint test tokens:
   - IDRX (Indonesian Rupiah)
   - USDC
   - XAUT (requires verification)

### 3. Get Verified

1. Visit the Admin page
2. Go to Identity tab
3. Register your address (or ask admin)

### 4. Swap IDRX to XAUT

1. Go to [Swap Page](https://auroom-testnet.vercel.app/swap)
2. Enter IDRX amount
3. Review the quote
4. Click "Swap" and confirm transaction

### 5. Deposit to Vault

1. Go to [Vault Page](https://auroom-testnet.vercel.app/vault)
2. Enter XAUT amount to deposit
3. Approve XAUT if needed
4. Click "Deposit" and confirm
5. Receive gXAUT tokens

### 6. Simulate Yield (Demo)

1. Go to Admin page → Vault tab
2. Click "Inject Yield" to simulate profit
3. Watch your gXAUT share price increase!

### 7. Redeem with Profit

1. Go to Vault page
2. Enter gXAUT amount to redeem
3. You'll receive more XAUT than deposited!

---

## 🧪 Development

### Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Code Style

- ESLint for linting
- Prettier for formatting (recommended)
- TypeScript strict mode enabled

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
# Build for production
npm run build

# The output is in .next folder
# Deploy to your hosting provider
```

---

## 🔐 Security Notes

- ⚠️ **Testnet Only**: This is a demo on Mantle Sepolia
- ⚠️ **No Real Funds**: All tokens are mock/test tokens
- ⚠️ **KYC Required**: Users must be verified to use XAUT
- ✅ **Non-Custodial**: You always control your keys
- ✅ **Slippage Protection**: Built into all swaps

---

## 🗺️ Roadmap

- [x] Landing page with protocol info
- [x] Swap functionality (IDRX ↔ XAUT)
- [x] Vault deposit/withdraw
- [x] Admin helper tools
- [x] Live protocol statistics
- [ ] Transaction history
- [ ] Dark/light mode toggle
- [ ] Mobile app (React Native)
- [ ] Mainnet deployment

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Mantle Network** - L2 Infrastructure
- **RainbowKit** - Beautiful wallet connection
- **wagmi** - Excellent React hooks for Ethereum
- **Vercel** - Hosting platform
- **shadcn/ui** - UI component inspiration

---

## 📬 Contact

**Apple Bites** - [@YohanesVito](https://github.com/YohanesVito)

- 🌐 Live Demo: [https://auroom-testnet.vercel.app](https://auroom-testnet.vercel.app)
- 📜 Smart Contracts: [auroom-sc](https://github.com/YohanesVito/auroom-sc)
- 🐛 Issues: [GitHub Issues](https://github.com/YohanesVito/auroom-fe/issues)

---

<div align="center">

**Built with ❤️ for Mantle Global Hackathon 2025**

[⬆ Back to Top](#-auroom-protocol---frontend)

</div>
