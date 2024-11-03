import * as React from "react"
import { SidebarProvider, useSidebar } from "@/lib/AdminSidebarContext"
import { getServerSession } from "next-auth"
import Sidebar from "./Sidebar"

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession();

    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 overflow-auto bg-gray-100">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}