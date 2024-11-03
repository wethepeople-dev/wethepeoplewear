'use client'

import AdminTopBar from "@/components/AdminTopBar"

export default function Blogs() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* Top Bar */}
            <AdminTopBar title="Blogs" />

            {/* Dashboard Content */}
            <div className="container mx-auto p-4 lg:p-8">
                <p>Blogs</p>
            </div>

        </main>
    );
}
