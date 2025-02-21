"use client"

import { signOut } from "next-auth/react";
import { BaseLayout } from "../components/BaseLayout";

export default function DashboardLayout({ children }) {
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
            onClick: () => signOut({ callbackUrl: "/" })
        }
    ]

    return <BaseLayout userProfile={{ avatarUrl: "/logo.png", name: "" }} logoSrc="/logo.png" menuItems={menuItems} sideNavItems={[]}>{children}</BaseLayout>
}