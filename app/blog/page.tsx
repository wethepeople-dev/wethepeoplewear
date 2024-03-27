'use client'

import Navbar from "@/components/Navbar";

export default function Blog() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO */}
            <section className="p-5">
                <h1 className="text-black">Blog</h1>
            </section>


        </main>
    );
}
