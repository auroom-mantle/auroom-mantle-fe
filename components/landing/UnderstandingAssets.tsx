import { SectionWrapper } from './shared/SectionWrapper';
import { AssetCard } from './shared/AssetCard';
import { ArrowRight } from 'lucide-react';

export function UnderstandingAssets() {
    return (
        <SectionWrapper background="muted" id="understanding-assets">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Understanding the Assets</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                            'Current price: ~$4000 per XAUT',
                            'Trade 24/7, no storage fees'
                        ]}
                        learnMoreUrl="https://gold.tether.to"
                    />
                </div>

                {/* Flow Diagram */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-card border rounded-lg p-8">
                        <h3 className="text-xl font-bold text-center mb-6">Your Journey</h3>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-600">IDRX</div>
                                <div className="text-sm text-muted-foreground">Rupiah</div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">USDC</div>
                                <div className="text-sm text-muted-foreground">Bridge</div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-600">XAUT</div>
                                <div className="text-sm text-muted-foreground">Gold</div>
                            </div>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            "Your Rupiah becomes gold in one seamless transaction"
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
