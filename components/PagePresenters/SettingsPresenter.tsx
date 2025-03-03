import Button from "../Button";
import { Card } from "../Cards/BaseCard/Card";
import { CardContent } from "../Cards/BaseCard/CardContent";
import { CardHeader } from "../Cards/BaseCard/CardHeader";


interface SettingsPresenterProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function SettingsPresenter({ activeTab, onTabChange }: SettingsPresenterProps) {
    const TABS = ["Profile", "Notifications", "PR Preferences", "AI Review", "Danger Zone"];

    return (
        <div className="p-6 mx-auto">
            {/* Tabs */}
            <div className="flex gap-4 border-b pb-2">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                            }`}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <Card className="mt-4">
                <CardHeader title={activeTab} />
                <CardContent>
                    {activeTab === "Profile" && <ProfileSettings />}
                    {activeTab === "Notifications" && <NotificationSettings />}
                    {activeTab === "PR Preferences" && <PRPreferences />}
                    {activeTab === "AI Review" && <AIReviewSettings />}
                    {activeTab === "Danger Zone" && <DangerZone />}
                </CardContent>
            </Card>
        </div>
    );
}

/* Individual Settings Sections */
function ProfileSettings() {
    return <div>👤 Update your GitHub profile details.</div>;
}

function NotificationSettings() {
    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Enable PR assignment notifications
            </label>
            <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Receive email updates on PR activity
            </label>
        </div>
    );
}

function PRPreferences() {
    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Show only PRs assigned to me
            </label>
            <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Hide merged PRs by default
            </label>
        </div>
    );
}

function AIReviewSettings() {
    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Enable AI-powered PR reviews
            </label>
            <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                AI should auto-suggest inline code fixes
            </label>
        </div>
    );
}

function DangerZone() {
    return (
        <div className="text-red-500">
            <p>⚠️ Warning: This action is irreversible!</p>
            <Button variant="alert">Delete Account</Button>
        </div>
    );
}
