"use client";

import { useState } from "react";
import { SettingsPresenter } from "../PagePresenters/SettingsPresenter";


const TABS = ["Profile", "Notifications", "PR Preferences", "AI Review", "Danger Zone"];

export default function SettingsContainer() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const handleTabChange = (tab: string) => setActiveTab(tab);

    return <SettingsPresenter activeTab={activeTab} onTabChange={handleTabChange} />;
}
