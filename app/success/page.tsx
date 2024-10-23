'use client'

import { Suspense } from 'react';
import NavBar from "../../components/Navbar";
import Footer from "@/components/Footer";
import SuccessContent from './successContent';

export default function Success() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* NAVBAR */}
            <NavBar />

            {/* HERO */}
            <div>
                <Suspense>
                    <SuccessContent />
                </Suspense>
            </div>

            {/* FOOTER */}
            <Footer />
        </main>
    );
}
