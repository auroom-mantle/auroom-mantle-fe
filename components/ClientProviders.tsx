'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

const Web3Provider = dynamic(
    () => import('@/providers/Web3Provider').then((mod) => mod.Web3Provider),
    { ssr: false }
);

export function ClientProviders({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Signal to Base App that the mini app is ready to display
        sdk.actions.ready();
    }, []);

    return <Web3Provider>{children}</Web3Provider>;
}
