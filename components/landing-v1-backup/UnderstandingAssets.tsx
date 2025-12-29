import { SectionWrapper } from './shared/SectionWrapper';
import { AssetCard } from './shared/AssetCard';
import { ArrowRight } from 'lucide-react';

export function UnderstandingAssets() {
    return (
        <SectionWrapper background="darker" id="understanding-assets">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Understanding the <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">Assets</span>
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Learn about the two key tokens that power AuRoom Protocol
                    </p>
                </div>

                {/* Asset Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AssetCard
                        symbol="IDRX"
                        name="Indonesian Rupiah Stablecoin"
                        tagline="Your gateway to crypto"
                        pegging="1 IDRX = 1 IDR (always)"
                        facts={[
                            'Pegged 1:1 to Indonesian Rupiah',
                            'Issued by PT IDRX Indo Inovasi',
                            'Regulated by Indonesian authorities',
                            'Easy on-ramp from local banks',
                            'No volatility vs Rupiah'
                        ]}
                        learnMoreUrl="https://home.idrx.co/en"
                    />
                    <AssetCard
                        symbol="XAUT"
                        name="Tether Gold"
                        tagline="Tokenized physical gold"
                        pegging="1 XAUT = 1 troy oz gold"
                        facts={[
                            'Backed 1:1 by physical gold',
                            'Stored in Swiss vaults (Tether custody)',
                            'Redeemable for physical gold',
                            'Current price: ~$2700 per XAUT',
                            'Trade 24/7, no storage fees'
                        ]}
                        learnMoreUrl="https://gold.tether.to"
                    />
                </div>

                {/* Flow Diagram */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-center mb-6 text-white">Your Journey</h3>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">IDRX</div>
                                <div className="text-sm text-white/60">Rupiah</div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-yellow-500" />
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">USDC</div>
                                <div className="text-sm text-white/60">Bridge</div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-yellow-500" />
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">XAUT</div>
                                <div className="text-sm text-white/60">Gold</div>
                            </div>
                        </div>
                        <p className="text-center text-sm text-white/60 mt-6">
                            "Your Rupiah becomes gold in one seamless transaction"
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
