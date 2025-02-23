"use client";


import WidgetCard from "@/components/Cards/WidgetCard";
import ActivePullRequestsWidget from "@/components/Widgets/ActivePullRequestsWidget";
import AIReviewStatusWidget from "@/components/Widgets/AIReviewStatusWidget";
import { Folder, BarChart, Bell } from "lucide-react";

export default function Dashboard() {
    const prsNeedingReview = [
        { id: 11, repo: "pr-pilot-frontend" },
        { id: 141, repo: "super-duper-long-repo-name" },
        { id: 12, repo: "pr-pilot-frontend" },
        { id: 144, repo: "super-duper-long-repo-name" },
        { id: 13, repo: "pr-pilot-frontend" },
        { id: 122, repo: "super-duper-long-repo-name" },
    ];

    const prsWaitingMerge = [
        { id: 33, repo: "backend-service" },
        { id: 92, repo: "database-migrations" }
    ];

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Active PRs Summary */}
                <ActivePullRequestsWidget prsNeedingReview={prsNeedingReview} prsWaitingMerge={prsWaitingMerge} />

                {/* AI Review Status */}
                <AIReviewStatusWidget />

                {/* Repository Overview */}
                <WidgetCard title="Repository Overview" icon={Folder}>
                    <div className="bg-gray-100 p-3 rounded-lg h-40 flex flex-col gap-1">
                        <p className="text-lg font-medium">Total Connected Repositories: <strong>8</strong></p>
                        <p className="text-lg font-medium">Most Active Repo: <strong>repo-frontend</strong></p>
                        <p className="text-lg font-medium">Last Updated Repo: <strong>repo-api</strong></p>
                    </div>
                </WidgetCard>

                {/* Insights & Analytics */}
                <WidgetCard title="Insights & Analytics" icon={BarChart}>
                    <div className="bg-gray-100 p-3 rounded-lg h-40 flex flex-col gap-1">
                        <p className="text-lg font-medium">Avg PR Review Time: <strong>2.5 days</strong></p>
                        <p className="text-lg font-medium">Most Active Contributor: <strong>@dev-user</strong></p>
                        <p className="text-lg font-medium">PR Merge Rate (30 Days): <strong>78%</strong></p>
                        <p className="text-lg font-medium">AI vs. Human Reviews: <strong>62% AI, 38% Human</strong></p>
                    </div>
                </WidgetCard>

                {/* Notifications & Mentions */}
                <WidgetCard title="Notifications" icon={Bell}>
                    <div className="bg-gray-100 p-3 rounded-lg h-40 flex flex-col gap-1">
                        <p className="text-sm text-gray-700">You were assigned to review PR #42</p>
                        <p className="text-sm text-gray-700">Your PR #35 was merged!</p>
                        <p className="text-sm text-gray-700">New comments on PR #28</p>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
}
