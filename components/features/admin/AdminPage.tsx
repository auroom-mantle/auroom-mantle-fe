"use client";

import { useState } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { FaucetTab } from './faucet/FaucetTab';
import { LiquidityTab } from './liquidity/LiquidityTab';
import { VaultTab } from './vault/VaultTab';
import { IdentityTab } from './identity/IdentityTab';
import { InfoTab } from './info/InfoTab';
import { DebugTab } from './debug/DebugTab';
import { KYCReviewTab } from './kyc/KYCReviewTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserRole } from '@/hooks/admin/useUserRole';
import { Droplet, Droplets, Vault, UserCheck, Info, Wrench, FileCheck } from 'lucide-react';

/**
 * AdminPage - Main admin helper page component
 */
export function AdminPage() {
    const role = useUserRole();
    const [activeTab, setActiveTab] = useState('faucet');

    // Determine which tabs are accessible based on user role
    const canAccessLiquidity = ['verified', 'admin', 'owner'].includes(role);
    const canAccessVault = ['admin', 'owner'].includes(role);
    const canAccessIdentity = ['admin', 'owner'].includes(role);
    const canAccessKYC = ['admin', 'owner'].includes(role);

    return (
        <div className="container mx-auto py-8 space-y-8">
            <AdminDashboard />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
                    <TabsTrigger value="faucet" className="flex items-center gap-2">
                        <Droplet className="h-4 w-4" />
                        <span className="hidden sm:inline">Faucet</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="liquidity"
                        disabled={!canAccessLiquidity}
                        className="flex items-center gap-2"
                    >
                        <Droplets className="h-4 w-4" />
                        <span className="hidden sm:inline">Liquidity</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="vault"
                        disabled={!canAccessVault}
                        className="flex items-center gap-2"
                    >
                        <Vault className="h-4 w-4" />
                        <span className="hidden sm:inline">Vault</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="identity"
                        disabled={!canAccessIdentity}
                        className="flex items-center gap-2"
                    >
                        <UserCheck className="h-4 w-4" />
                        <span className="hidden sm:inline">Identity</span>
                    </TabsTrigger>

                    <TabsTrigger value="info" className="flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        <span className="hidden sm:inline">Info</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="kyc"
                        disabled={!canAccessKYC}
                        className="flex items-center gap-2"
                    >
                        <FileCheck className="h-4 w-4" />
                        <span className="hidden sm:inline">KYC</span>
                    </TabsTrigger>

                    <TabsTrigger value="debug" className="flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        <span className="hidden sm:inline">Debug</span>
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="faucet">
                        <FaucetTab />
                    </TabsContent>

                    <TabsContent value="liquidity">
                        {canAccessLiquidity ? (
                            <LiquidityTab />
                        ) : (
                            <div className="text-center p-8 border rounded-lg">
                                <p className="text-muted-foreground">
                                    This tab requires verified user access.
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="vault">
                        {canAccessVault ? (
                            <VaultTab />
                        ) : (
                            <div className="text-center p-8 border rounded-lg">
                                <p className="text-muted-foreground">
                                    This tab requires admin access.
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="identity">
                        {canAccessIdentity ? (
                            <IdentityTab />
                        ) : (
                            <div className="text-center p-8 border rounded-lg">
                                <p className="text-muted-foreground">
                                    This tab requires admin access.
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="info">
                        <InfoTab />
                    </TabsContent>

                    <TabsContent value="kyc">
                        {canAccessKYC ? (
                            <KYCReviewTab />
                        ) : (
                            <div className="text-center p-8 border rounded-lg">
                                <p className="text-muted-foreground">
                                    This tab requires admin access.
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="debug">
                        <DebugTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
