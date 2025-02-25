
import { Brain } from "lucide-react";
import PRBadge from "../Badges/PRBadge";
import WidgetCard from "../Cards/WidgetCard";
import { Repository } from "@/types/repository";

export default function AIReviewStatusWidget() {
    const pendingReviews = [
        { id: 21, repo: "pr-pilot-backend" },
        { id: 45, repo: "data-pipeline" }
    ];

    const reviewedPRs = [
        { id: 18, repo: "pr-pilot-frontend" },
        { id: 23, repo: "api-service" },
        { id: 37, repo: "database-migrations" },
        { id: 41, repo: "super-long-repo-name-example" },
        { id: 41, repo: "super-long-repo-name-example" }
    ];

    return (
        <WidgetCard title="AI Review Status" icon={Brain}>
            <div className="grid grid-cols-3 gap-4 h-full">
                {/* Pending Reviews */}
                <div className="flex flex-col items-center h-full">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">Pending: {pendingReviews.length}</h3>
                    <div className="bg-gray-100 p-3 rounded-lg flex flex-col gap-1 w-full h-full overflow-hidden">
                        {pendingReviews.map((pr) => (
                            <PRBadge title={"test"} id={pr.id} key={pr.id} pr={{} as Repository} />
                        ))}
                    </div>
                </div>

                {/* Reviewed PRs */}
                <div className="flex flex-col items-center h-full">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">Reviewed: {reviewedPRs.length}</h3>
                    <div className="bg-gray-100 p-3 rounded-lg flex flex-col gap-1 w-full h-full overflow-hidden">
                        {reviewedPRs.slice(0, 4).map((pr) => (
                            <PRBadge title={"test"} id={pr.id} key={pr.id} pr={{} as Repository} />
                        ))}
                        {reviewedPRs.length > 4 && (
                            <a href="/pulls" className="text-blue-600 font-medium mt-2 text-center block">
                                See {reviewedPRs.length - 4} more
                            </a>
                        )}
                    </div>
                </div>

                {/* AI Statistics */}
                <div className="flex flex-col items-center h-full">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">Statistics</h3>
                    <div className="bg-gray-100 p-3 rounded-lg flex flex-col gap-1 w-full h-full">
                        <p className="text-sm font-medium">AI Accuracy: <strong>89%</strong></p>
                        <p className="text-sm font-medium">AI Reviews: <strong>7</strong></p>
                    </div>
                </div>
            </div>
        </WidgetCard>
    );
}
