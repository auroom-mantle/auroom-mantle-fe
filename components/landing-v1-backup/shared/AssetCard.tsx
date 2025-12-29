import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AssetCardProps {
    name: string;
    symbol: string;
    tagline: string;
    pegging: string;
    facts: string[];
    learnMoreUrl?: string;
}

export function AssetCard({
    name,
    symbol,
    tagline,
    pegging,
    facts,
    learnMoreUrl
}: AssetCardProps) {
    return (
        <div className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300">
            <div className="text-center space-y-4 mb-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                    {symbol}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                    <p className="text-sm text-white/60">{tagline}</p>
                </div>
                <div className="border-t border-white/10 pt-4">
                    <div className="text-lg font-mono font-bold text-yellow-500">{pegging}</div>
                </div>
            </div>
            <div className="space-y-4">
                <ul className="space-y-2">
                    {facts.map((fact, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-yellow-500 mt-0.5">•</span>
                            <span className="text-white/70">{fact}</span>
                        </li>
                    ))}
                </ul>
                {learnMoreUrl && (
                    <Link
                        href={learnMoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
                    >
                        Learn more <ExternalLink className="h-3 w-3" />
                    </Link>
                )}
            </div>
        </div>
    );
}
