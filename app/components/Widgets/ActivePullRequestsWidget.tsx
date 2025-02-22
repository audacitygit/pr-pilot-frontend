"use client"

import PRBadge from "../Badges/PRBadget";
import WidgetCard from "../Cards/WidgetCard";
import { GitPullRequest } from "lucide-react";

export default function ActivePullRequestsWidget({ prsNeedingReview, prsWaitingMerge }) {
    return (
        <WidgetCard title="Active Pull Requests" icon={GitPullRequest}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="flex flex-col flex-1">
                    <h3 className="text-md font-semibold text-gray-800 text-center">Waiting for Review: {prsNeedingReview.length}</h3>
                    <div className="flex flex-col gap-1 mt-2 bg-gray-100 p-3 rounded-lg h-40">
                        {prsNeedingReview.slice(0, 4).map((pr) => (
                            <PRBadge id={pr.id} repo={pr.repo} key={pr.id} />
                        ))}
                        {prsNeedingReview.length > 4 && (
                            <a href="/pulls" className="text-blue-600 font-medium mt-2 text-center block">See {prsNeedingReview.length - 4} more</a>
                        )}
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <h3 className="text-md font-semibold text-gray-800 text-center">Waiting for Merge: {prsWaitingMerge.length}</h3>
                    <div className="flex flex-col gap-1 mt-2 bg-gray-100 p-3 rounded-lg h-40">
                        {prsWaitingMerge.slice(0, 4).map((pr) => (
                            <PRBadge id={pr.id} repo={pr.repo} key={pr.id} />
                        ))}
                        {prsWaitingMerge.length > 4 && (
                            <a href="/pulls" className="text-blue-600 font-medium mt-2 text-center block">See {prsWaitingMerge.length - 4} more</a>
                        )}
                    </div>
                </div>
            </div>
        </WidgetCard>
    );
}