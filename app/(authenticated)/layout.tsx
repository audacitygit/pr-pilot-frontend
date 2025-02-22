"use client"


import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Home, Folder, GitPullRequest, Settings } from "lucide-react";
import { BaseLayout } from "@/components/BaseLayout";
import { SessionProvider } from "@/context/SessionProvider";

export default function DashboardLayout({ children }) {
    const pathname = usePathname()

    // Mapping routes to page titles
    const routeTitles: { [key: string]: string } = {
        "/dashboard": "Dashboard",
        "/profile": "Your Profile",
        "/profile/settings": "Settings",
        "/repos": "Repositories",
        "/pull-requests": "Pull Requests",
    };

    // Find matching title or default to "Dashboard"
    const headerTitle = routeTitles[pathname] || "PR Pilot";

    const menuItems = [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Settings",
            href: "/profile/settings",
        },
        {
            label: "Sign Out",
            onClick: () => { }
        }
    ]

    const sideNavItems: { icon: ReactNode; label: string; href?: string; onClick?: () => void }[] = [
        {
            icon: <Home size={20} />,
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            icon: <Folder size={20} />,
            label: "Repositories",
            href: "/repos",
        },
        {
            icon: <GitPullRequest size={20} />,
            label: "Pull Requests",
            href: "/pull-requests",
        },
        {
            icon: <Settings size={20} />,
            label: "Settings",
            href: "/settings",
        },
    ];


    return (
        <SessionProvider>
            <BaseLayout headerTitle={headerTitle} userProfile={{ avatarUrl: "/logo.png", name: "" }} logoSrc="/logo.png" menuItems={menuItems} sideNavItems={sideNavItems}>
                {children}
            </BaseLayout>
        </SessionProvider>
    )
}