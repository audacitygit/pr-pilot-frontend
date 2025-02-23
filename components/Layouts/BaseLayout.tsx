"use client";
import { ReactNode, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

interface BaseLayoutProps {
    logoSrc: string;
    headerTitle?: string;
    headerSubtitle?: string;
    menuItems: { label: string; href?: string; onClick?: () => void }[];
    sideNavItems: { icon: ReactNode; label: string; href?: string; onClick?: () => void }[];
    userProfile: { name: string; avatarUrl: string };
    children: ReactNode;
}

export function BaseLayout({
    logoSrc,
    headerTitle = "Dashboard",
    headerSubtitle = "Manage your pull requests",
    menuItems,
    sideNavItems,
    userProfile,
    children
}: BaseLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`flex flex-col h-screen w-screen overflow-hidden ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            {/* 🔹 Top Navigation */}
            <header className={`flex justify-between items-center shadow-md px-6 py-3 border-b ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                {/* Left: Hamburger + Logo & Title (Stacks on Mobile) */}
                <div className="flex items-center space-x-4">
                    <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Image height={20} width={20} src={logoSrc} alt="Company Logo" className="h-10 w-10" />
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold">{headerTitle}</h1>
                        <p className="text-xs sm:text-sm">{headerSubtitle}</p>
                    </div>
                </div>

                {/* Right: Theme Toggle & User Profile */}
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2">
                            <Image height={20} width={20} src={userProfile.avatarUrl} alt="User Avatar" className="h-8 w-8 rounded-full shadow-md" />
                            <span className="hidden sm:inline font-semibold">{userProfile.name}</span>
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                                {menuItems.map((item, index) => (
                                    <button key={index} onClick={item.onClick} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* 🔹 Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Now Responsive) */}
                <aside className={`fixed lg:relative transition-all shadow-md ${sidebarOpen ? "w-56" : "w-16"} h-full overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                    <div className="flex flex-col h-full">
                        {/* Sidebar Items */}
                        <nav className="flex-1 px-2 py-4 space-y-2">
                            {sideNavItems.map((item, index) => (
                                <button key={index} onClick={item.onClick} className="flex items-center space-x-3 px-4 py-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {item.icon}
                                    {sidebarOpen && <span>{item.label}</span>}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
