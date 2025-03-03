"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeProvider";

interface BaseLayoutProps {
    logoSrc: string;
    headerTitle?: string;
    headerSubtitle?: string;
    menuItems: { label: string; href?: string; onClick?: () => void }[];
    sideNavItems: {
        isLink?: boolean; icon: ReactNode; label: string; href?: string; onClick?: () => void
    }[];
    userProfile: { name: string; avatarUrl: string };
    children: ReactNode;
}

export function BaseLayout({
    logoSrc,
    headerTitle = "Dashboard",
    headerSubtitle = "Manage your pull requests",
    sideNavItems,
    children
}: BaseLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    return (
        <div className={`flex flex-col h-screen w-screen overflow-hidden ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            {/* 🔹 Top Navigation */}
            <header className={`flex justify-between items-center shadow-md px-6 py-3 border-b ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                <div className="flex items-center space-x-4">
                    <Image unoptimized={true} height={20} width={20} src={logoSrc} alt="Company Logo" className="h-10 w-10" />
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold">{headerTitle}</h1>
                        <p className="text-xs sm:text-sm">{headerSubtitle}</p>
                    </div>
                </div>

                {/* Right: Theme Toggle & User Profile */}
                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </header>

            {/* 🔹 Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`transition-all shadow-md h-full overflow-hidden ${sidebarOpen ? "w-56" : "w-16"} ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                    <div className="flex flex-col h-full">
                        {/* Sidebar Toggle */}
                        <button className="p-4 self-end" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Sidebar Items */}
                        <nav className="flex-1 px-2 py-4 space-y-2">
                            {sideNavItems.map((item, index) => {
                                const isActive = pathname.startsWith(item.href || ""); // ✅ Handles nested routes
                                if (item.isLink) {
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href || "#"}
                                            className={`flex items-center space-x-3 px-4 py-2 w-full rounded-lg transition-colors ${isActive
                                                ? "bg-blue-600 text-white font-semibold shadow-md"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                                }`}
                                        >
                                            {item.icon}
                                            {sidebarOpen && <span>{item.label}</span>}
                                        </Link>
                                    );
                                }
                                return (
                                    <button
                                        onClick={item.onClick}
                                        key={index}
                                        className={`flex items-center space-x-3 px-4 py-2 w-full rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                                    >
                                        {item.icon}
                                        {sidebarOpen && <span>{item.label}</span>}
                                    </button>
                                );

                            })}
                        </nav>

                    </div>
                </aside>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
            </div>
        </div>
    );
}
