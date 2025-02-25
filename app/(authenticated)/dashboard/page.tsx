"use client";

import ActivePullRequestsContainer from "@/components/Widgets/ActivePullRequests/Container";
import InsightsAnalyticsContainer from "@/components/Widgets/InsightsAnalytics/Container";
import RepositoryOverviewContainer from "@/components/Widgets/RepositoryOverview/Container";


export default function Dashboard() {

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ActivePullRequestsContainer />
                {/* AI Review Status */}
                {/* <AIReviewStatusWidget /> */}
                <RepositoryOverviewContainer />
                <InsightsAnalyticsContainer />

                {/* Notifications & Mentions */}
                {/*                 <WidgetCard title="Notifications" icon={Bell}>
                    <div className="bg-gray-100 p-3 rounded-lg h-40 flex flex-col gap-1">
                        <p className="text-sm text-gray-700">You were assigned to review PR #42</p>
                        <p className="text-sm text-gray-700">Your PR #35 was merged!</p>
                        <p className="text-sm text-gray-700">New comments on PR #28</p>
                    </div>
                </WidgetCard> */}
            </div>
        </div>
    );
}
