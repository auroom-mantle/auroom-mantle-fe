export async function GET() {
    const URL = process.env.NEXT_PUBLIC_URL || 'https://auroom-base-testnet.vercel.app';

    return Response.json({
        accountAssociation: {
            header: "",    // Fill after verification at Base Build
            payload: "",
            signature: ""
        },
        miniapp: {
            version: "1",
            name: "AuRoom",
            homeUrl: URL,
            iconUrl: `${URL}/logo.svg`,
            splashImageUrl: `${URL}/logo.svg`,
            splashBackgroundColor: "#000000",
            webhookUrl: `${URL}/api/webhook`,
            subtitle: "Borrow Cash with Digital Gold",
            description: "Digital pawnshop that's simple, fast, and transparent. Collateralize digital gold, receive cash to your account in minutes.",
            screenshotUrls: [
                `${URL}/screenshot-dashboard.png`
            ],
            primaryCategory: "finance",
            tags: ["defi", "lending", "gold", "crypto", "base"],
            heroImageUrl: `${URL}/hero-image.png`,
            tagline: "Borrow Cash Instantly",
            ogTitle: "AuRoom - Digital Gold Pawnshop",
            ogDescription: "Collateralize digital gold, receive cash in minutes. Low fees, 24/7 process.",
            ogImageUrl: `${URL}/og-image.png`,
            noindex: false
        }
    });
}
