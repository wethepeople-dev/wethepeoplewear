'use client'

import * as React from "react"
import Link from "next/link"
import { BarChart3, LayoutDashboard, Settings, ShoppingCart, PackageSearch, NotebookText } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarProvider, useSidebar } from "@/lib/AdminSidebarContext"

type LayoutProps = {
    children: React.ReactNode;
    title?: string;
};

export function Layout({ children, title = 'Admin Page' }: LayoutProps) {
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

const Sidebar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar(); // Use the sidebar state from context

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div className="flex h-full flex-col">
                {/* close button */}
                <button
                    className="lg:hidden p-4 ml-auto"
                    onClick={toggleSidebar}
                >
                    <svg
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Logo */}
                <div className="flex items-center justify-center flex-col lg:py-6 pb-6">
                    <img src="/logos/LOGO_BLANCO.png" className="h-12" alt="We the people logo" />
                    <p className="text-md text-gray-400 font-medium pt-2">
                        Admin Panel
                    </p>
                </div>

                <hr style={{ marginLeft: '15px', marginRight: '15px' }} />

                {/* Navigation Links */}
                <ScrollArea className="flex-1 py-4">
                    <nav className="space-y-2 px-2">
                        {[
                            { name: "Overview", icon: LayoutDashboard, href: "/admin" },
                            { name: "Orders", icon: PackageSearch, href: "/admin/orders" },
                            { name: "Products", icon: ShoppingCart, href: "/admin/products" },
                            { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
                            { name: "Blogs", icon: NotebookText, href: "/admin/blogs" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
                            >
                                <item.icon className="mr-3 h-6 w-6" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </ScrollArea>
            </div>
        </aside>
    );
}
