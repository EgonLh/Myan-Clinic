import { Footer } from '@/components/core/Footer';
import { NavigationBar } from '@/components/core/Navigation';
import React from 'react';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavigationBar />

            {children}
            <Footer />

        </div>
    );
}