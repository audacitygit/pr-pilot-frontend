import { BaseLayout } from "../components/BaseLayout";

export default function DashboardLayout({ children }) {
    return <BaseLayout userProfile={{ avatarUrl: "/logo.png", name: "" }} logoSrc="/" menuItems={[]} sideNavItems={[]}>{children}</BaseLayout>
}