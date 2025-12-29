'use client';

import Link from 'next/link';
import { SectionWrapper } from './shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, Check } from 'lucide-react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

export function AuRoomVsDex() {
    const comparisonData = [
        {
            aspect: 'Function',
            regularDex: 'Swap only',
            auroom: 'Swap + Stake + Earn',
        },
        {
            aspect: 'After Swap',
            regularDex: 'Asset sits idle',
            auroom: 'Asset actively managed',
        },
        {
            aspect: 'Yield',
            regularDex: '0%',
            auroom: '~5-15% APY',
        },
        {
            aspect: 'Management',
            regularDex: 'Manual',
            auroom: 'Automated vault',
        },
        {
            aspect: 'Result',
            regularDex: 'Just tokens',
            auroom: 'Complete investment system',
        },
    ];

    const chartData = [
        { month: 0, regularDex: 100, auroom: 100 },
        { month: 1, regularDex: 100.67, auroom: 101.5 },
        { month: 2, regularDex: 101.34, auroom: 103.0 },
        { month: 3, regularDex: 102.01, auroom: 104.5 },
        { month: 4, regularDex: 102.68, auroom: 106.0 },
        { month: 5, regularDex: 103.35, auroom: 107.5 },
        { month: 6, regularDex: 104.02, auroom: 109.0 },
        { month: 7, regularDex: 104.69, auroom: 110.5 },
        { month: 8, regularDex: 105.36, auroom: 112.0 },
        { month: 9, regularDex: 106.03, auroom: 113.5 },
        { month: 10, regularDex: 106.70, auroom: 115.0 },
        { month: 11, regularDex: 107.37, auroom: 116.5 },
        { month: 12, regularDex: 108.0, auroom: 118.0 },
    ];

    const chartConfig = {
        regularDex: {
            label: "Regular DEX",
            color: "hsl(0, 84%, 60%)",
        },
        auroom: {
            label: "AuRoom",
            color: "hsl(45, 93%, 47%)",
        },
    } satisfies ChartConfig;

    return (
        <SectionWrapper background="default" id="auroom-vs-dex">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">AuRoom</span> vs Regular DEX
                    </h2>
                    <p className="text-xl text-white/70">
                        Not just a swap. A complete gold investment system.
                    </p>
                </div>

                {/* Split Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Regular DEX Side */}
                    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-red-500/30 space-y-6">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2 text-red-400">
                                Regular DEX
                            </h3>
                            <p className="text-sm text-white/60">The traditional way</p>
                        </div>

                        {/* Flow Diagram */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-3">
                                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-medium text-white">
                                    IDRX
                                </div>
                                <ArrowRight className="h-5 w-5 text-white/60" />
                                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-medium text-white">
                                    Swap
                                </div>
                                <ArrowRight className="h-5 w-5 text-white/60" />
                                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-medium text-white">
                                    XAUT
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <ArrowRight className="h-5 w-5 text-white/60 rotate-90" />
                            </div>
                            <div className="flex justify-center">
                                <div className="px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
                                    <div className="text-4xl mb-2">💤</div>
                                    <div className="font-bold text-red-400">Sits Idle</div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white/5 border border-red-500/20 rounded-lg p-4">
                            <p className="text-sm text-center italic text-white/70">
                                "Your XAUT just sits in your wallet.<br />
                                No yield. No growth. Just... waiting."
                            </p>
                        </div>
                    </div>

                    {/* AuRoom Side */}
                    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/30 space-y-6">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                                AuRoom
                            </h3>
                            <p className="text-sm text-white/60">The productive way</p>
                        </div>

                        {/* Flow Diagram */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <div className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs font-medium text-white">
                                    IDRX
                                </div>
                                <ArrowRight className="h-4 w-4 text-yellow-500" />
                                <div className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs font-medium text-white">
                                    Swap
                                </div>
                                <ArrowRight className="h-4 w-4 text-yellow-500" />
                                <div className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs font-medium text-white">
                                    XAUT
                                </div>
                                <ArrowRight className="h-4 w-4 text-yellow-500" />
                                <div className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs font-medium text-white">
                                    Deposit
                                </div>
                                <ArrowRight className="h-4 w-4 text-yellow-500" />
                                <div className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs font-medium text-white">
                                    gXAUT
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <ArrowRight className="h-5 w-5 text-yellow-500 rotate-90" />
                            </div>
                            <div className="flex justify-center">
                                <div className="px-6 py-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-center">
                                    <div className="text-4xl mb-2">📈</div>
                                    <div className="font-bold text-yellow-400">Earning Yield</div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white/5 border border-yellow-500/20 rounded-lg p-4">
                            <p className="text-sm text-center italic text-white/70">
                                "Your XAUT becomes PRODUCTIVE.<br />
                                Managed by vault. Earning yield. Working for you."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comparison Table */}
                <div>
                    <h3 className="text-2xl font-bold text-center mb-6 text-white">The AuRoom Difference</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-white/10">
                                    <th className="p-4 text-left font-bold text-white">Aspect</th>
                                    <th className="p-4 text-center font-bold text-red-400">
                                        Regular DEX
                                    </th>
                                    <th className="p-4 text-center font-bold text-yellow-400">
                                        AuRoom
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, index) => (
                                    <tr key={index} className="border-b border-white/10">
                                        <td className="p-4 font-medium text-white">{row.aspect}</td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                                                <span className="text-sm text-white/80">{row.regularDex}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Check className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                                                <span className="text-sm text-white/80">{row.auroom}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ROI Visualization */}
                <div>
                    <h3 className="text-2xl font-bold text-center mb-6 text-white">ROI Comparison: 1 Year Growth</h3>
                    <p className="text-center text-white/70 mb-8">
                        Starting with Rp 100,000,000 investment in gold
                    </p>

                    {/* Chart Container */}
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                        <ChartContainer config={chartConfig} className="h-[400px] w-full">
                            <LineChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                    top: 12,
                                    bottom: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    stroke="rgba(255,255,255,0.5)"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => `${value}M`}
                                    stroke="rgba(255,255,255,0.5)"
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <Line
                                    dataKey="regularDex"
                                    type="monotone"
                                    stroke="var(--color-regularDex)"
                                    strokeWidth={2}
                                    dot={{
                                        fill: "var(--color-regularDex)",
                                    }}
                                    activeDot={{
                                        r: 6,
                                    }}
                                />
                                <Line
                                    dataKey="auroom"
                                    type="monotone"
                                    stroke="var(--color-auroom)"
                                    strokeWidth={2}
                                    dot={{
                                        fill: "var(--color-auroom)",
                                    }}
                                    activeDot={{
                                        r: 6,
                                    }}
                                />
                            </LineChart>
                        </ChartContainer>

                        {/* Chart Details */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Regular DEX Summary */}
                            <div className="p-4 rounded-xl bg-white/5 border border-red-500/30">
                                <div className="text-center space-y-2">
                                    <div className="text-sm text-white/60">Regular DEX</div>
                                    <div className="text-2xl font-bold font-mono text-white">Rp 108M</div>
                                    <div className="text-sm">
                                        <span className="text-yellow-400 font-medium">Gold: +8%</span>
                                        <br />
                                        <span className="text-red-400 font-medium">Yield: 0%</span>
                                    </div>
                                    <div className="text-lg font-bold text-red-400">ROI: +8%</div>
                                </div>
                            </div>

                            {/* Difference */}
                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                                <div className="text-center space-y-2">
                                    <div className="text-sm text-white/60">Difference</div>
                                    <div className="text-2xl font-bold font-mono text-yellow-400">+Rp 10M</div>
                                    <div className="text-sm text-white/60">
                                        Extra earnings from<br />vault yield
                                    </div>
                                    <div className="text-lg font-bold text-yellow-400">125% More</div>
                                </div>
                            </div>

                            {/* AuRoom Summary */}
                            <div className="p-4 rounded-xl bg-white/5 border-2 border-yellow-500/50">
                                <div className="text-center space-y-2">
                                    <div className="text-sm text-white/60">AuRoom</div>
                                    <div className="text-2xl font-bold font-mono text-yellow-400">Rp 118M</div>
                                    <div className="text-sm">
                                        <span className="text-yellow-400 font-medium">Gold: +8%</span>
                                        <br />
                                        <span className="text-green-400 font-medium">Yield: +10%</span>
                                    </div>
                                    <div className="text-lg font-bold text-yellow-400">ROI: +18%</div>
                                </div>
                            </div>
                        </div>

                        {/* Key Insight */}
                        <div className="mt-6 text-center">
                            <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                                <p className="text-sm">
                                    <span className="font-bold text-yellow-400">The gap widens every month!</span>
                                    <br />
                                    <span className="text-white/70">AuRoom's dual revenue (gold + yield) compounds faster than Regular DEX</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analogy Box */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-yellow-500/20 backdrop-blur-xl border-2 border-yellow-500/30">
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="text-3xl mb-2">💡</div>
                            <h4 className="text-xl font-bold mb-4 text-white">Think of it this way:</h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="font-bold text-red-400">Regular DEX =</div>
                                <p className="text-sm text-white/80">
                                    Buying gold and putting it <span className="font-bold">under your mattress</span>.
                                    <br />
                                    <span className="text-white/60 italic">Safe, but earning nothing.</span>
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="font-bold text-yellow-400">AuRoom =</div>
                                <p className="text-sm text-white/80">
                                    Buying gold and putting it in a <span className="font-bold">professional investment fund</span> that generates returns for you.
                                    <br />
                                    <span className="text-white/60 italic">Safe AND productive.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-8">
                    <Button
                        asChild
                        size="lg"
                        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold text-lg px-8 shadow-2xl shadow-yellow-500/25"
                    >
                        <Link href="/swap">
                            🚀 Make Your Gold Work For You
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                        </Link>
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    );
}
