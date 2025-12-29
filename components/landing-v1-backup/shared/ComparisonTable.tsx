import { Check, X } from 'lucide-react';

interface ComparisonRow {
    aspect: string;
    traditional: string;
    auroom: string;
    traditionalNegative?: boolean;
    auroomPositive?: boolean;
}

interface ComparisonTableProps {
    rows: ComparisonRow[];
}

export function ComparisonTable({ rows }: ComparisonTableProps) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Traditional Gold */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-red-500/20">
                <h3 className="text-xl font-bold text-center mb-6 text-white">Traditional Gold Investment</h3>
                <div className="space-y-4">
                    {rows.map((row, index) => (
                        <div key={index} className="space-y-1">
                            <div className="text-sm font-medium text-white/60">{row.aspect}</div>
                            <div className="flex items-start gap-2">
                                <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-white/80">{row.traditional}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AuRoom RWA */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/30">
                <h3 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    With AuRoom (RWA)
                </h3>
                <div className="space-y-4">
                    {rows.map((row, index) => (
                        <div key={index} className="space-y-1">
                            <div className="text-sm font-medium text-white/60">{row.aspect}</div>
                            <div className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-white/80">{row.auroom}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
