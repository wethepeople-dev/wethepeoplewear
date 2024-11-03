'use client'

import AdminTopBar from "@/components/AdminTopBar";

export default function Analytics() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* Top Bar */}
            <AdminTopBar title="Analytics" />

            {/* Dashboard Content */}
            <div className="container mx-auto p-4 lg:p-8">
                <p>Analytics</p>
            </div>

        </main>
    );
}
