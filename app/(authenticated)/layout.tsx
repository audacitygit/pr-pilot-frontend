"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Home, Folder, GitPullRequest, Settings, LogOut } from "lucide-react";
import { BaseLayout } from "@/components/BaseLayout";
import { signout } from "@/lib/api/auth/signout";


export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();


    const handleSignOut = async () => {
        const response = await signout()
        if (response.success) {
            router.push("/auth/signin")
        }
    }

    // Mapping base routes to page titles
    const routeTitles: { [key: string]: string } = {
        "/dashboard": "Dashboard",
        "/profile": "Your Profile",
        "/profile/settings": "Settings",
        "/repos": "Repositories",
        "/pull-requests": "Pull Requests",
        "/auth/singout": "Sign Out"
    };

    // Determine the closest matching title
    const headerTitle = Object.keys(routeTitles).find(route => pathname.startsWith(route)) || "PR Pilot";

    const menuItems = [
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/profile/settings" },

    ];

    const sideNavItems: { icon: ReactNode; label: string; href?: string; onClick?: () => void, isLink: boolean }[] = [
        { icon: <Home size={20} />, label: "Dashboard", href: "/dashboard", isLink: true },
        { icon: <Folder size={20} />, label: "Repositories", href: "/repos", isLink: true },
        { icon: <GitPullRequest size={20} />, label: "Pull Requests", href: "/pull-requests", isLink: true },
        { icon: <Settings size={20} />, label: "Settings", href: "/settings", isLink: true },
        { icon: <LogOut size={20} />, label: "Sign Out", href: "#", onClick: async () => handleSignOut(), isLink: false }
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
