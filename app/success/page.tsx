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
            <section className="flex flex-col items-center justify-center mt-16" style={{ height: 'auto' }}>
                <Suspense>
                    <SuccessContent />
                </Suspense>
            </section>

            {/* FOOTER */}
            <Footer />
        </main>
    );
}
