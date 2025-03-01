"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Home, Folder, GitPullRequest, Settings } from "lucide-react";
import { BaseLayout } from "@/components/BaseLayout";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    // Mapping base routes to page titles
    const routeTitles: { [key: string]: string } = {
        "/dashboard": "Dashboard",
        "/profile": "Your Profile",
        "/profile/settings": "Settings",
        "/repos": "Repositories",
        "/pull-requests": "Pull Requests",
    };

    // Determine the closest matching title
    const headerTitle = Object.keys(routeTitles).find(route => pathname.startsWith(route)) || "PR Pilot";

    const menuItems = [
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/profile/settings" },
        { label: "Sign Out", onClick: () => { } }
    ];

    const sideNavItems: { icon: ReactNode; label: string; href?: string; onClick?: () => void }[] = [
        { icon: <Home size={20} />, label: "Dashboard", href: "/dashboard" },
        { icon: <Folder size={20} />, label: "Repositories", href: "/repos" },
        { icon: <GitPullRequest size={20} />, label: "Pull Requests", href: "/pull-requests" },
        { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
    ];

    return (
        <BaseLayout
            headerTitle={headerTitle}
            userProfile={{ avatarUrl: "/logo.png", name: "" }}
            logoSrc="/logo.png"
            menuItems={menuItems}
            sideNavItems={sideNavItems}
        >
            {children}
        </BaseLayout>
    );
}
