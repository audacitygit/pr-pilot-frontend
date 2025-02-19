"use client";
import { ReactNode, useState } from "react";

interface BaseLayoutProps {
    logoSrc: string; // ✅ Company logo source
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
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100">
            {/* 🔹 Top Navigation */}
            <header className="flex justify-between items-center bg-white shadow-md px-6 py-3 border-b">
                {/* Left: Company Logo & App Title */}
                <div className="flex items-center space-x-4">
                    <img src={logoSrc} alt="Company Logo" className="h-10 w-10" /> {/* ✅ Logo */}
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{headerTitle}</h1>
                        <p className="text-sm text-gray-500">{headerSubtitle}</p>
                    </div>
                </div>

                {/* Right: User Profile */}
                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2">
                        <img src={userProfile.avatarUrl} alt="User Avatar" className="h-8 w-8 rounded-full shadow-md" />
                        <span className="font-semibold">{userProfile.name}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.onClick}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* 🔹 Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`bg-white shadow-md h-full transition-all ${sidebarOpen ? "w-56" : "w-16"} overflow-hidden`}>
                    <div className="flex flex-col h-full">
                        {/* Toggle Button */}
                        <button
                            className="p-4 text-gray-700 hover:bg-gray-100"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? "←" : "→"}
                        </button>

                        {/* Sidebar Items */}
                        <nav className="flex-1 px-2 py-4 space-y-2">
                            {sideNavItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.onClick}
                                    className="flex items-center space-x-3 px-4 py-2 w-full rounded-lg hover:bg-gray-100"
                                >
                                    {item.icon}
                                    {sidebarOpen && <span>{item.label}</span>}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
