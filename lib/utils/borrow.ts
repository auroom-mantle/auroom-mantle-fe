/**
 * Format number to Indonesian Rupiah
 */
export function formatIDR(value: bigint | number, decimals: number = 6): string {
    const num = typeof value === 'bigint'
        ? Number(value) / Math.pow(10, decimals)
        : value;

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(num);
}

/**
 * Format XAUT amount (6 decimals)
 */
export function formatXAUT(value: bigint): string {
    const num = Number(value) / 1e6;
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    });
}

/**
 * Format LTV from basis points to percentage
 */
export function formatLTV(bps: bigint | number): string {
    const num = typeof bps === 'bigint' ? Number(bps) : bps;
    return (num / 100).toFixed(2) + '%';
}

/**
 * Get LTV color based on thresholds
 */
export function getLTVColor(ltv: number): string {
    if (ltv < 7500) return 'text-green-500';
    if (ltv < 8000) return 'text-yellow-500';
    if (ltv < 9000) return 'text-orange-500';
    return 'text-red-500';
}

/**
 * Get LTV background color for progress bar
 */
export function getLTVBgColor(ltv: number): string {
    if (ltv < 7500) return 'bg-green-500';
    if (ltv < 8000) return 'bg-yellow-500';
    if (ltv < 9000) return 'bg-orange-500';
    return 'bg-red-500';
}

/**
 * Parse user input to bigint with decimals
 */
export function parseAmount(value: string, decimals: number = 6): bigint {
    if (!value || value === '') return 0n;
    const [whole, fraction = ''] = value.split('.');
    const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(whole + paddedFraction);
}

/**
 * Format bigint to display string
 */
export function formatAmount(value: bigint, decimals: number = 6): string {
    const str = value.toString().padStart(decimals + 1, '0');
    const whole = str.slice(0, -decimals) || '0';
    const fraction = str.slice(-decimals);
    return `${whole}.${fraction}`.replace(/\.?0+$/, '');
}
