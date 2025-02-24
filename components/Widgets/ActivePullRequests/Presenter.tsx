"use client"

import WidgetCard from "../../Cards/WidgetCard";
import { GitPullRequest } from "lucide-react";
import PRWidgetColumn from "../PRWidgetColumn";

export default function ActivePrPresenter({ prsNeedingReview, prsWaitingMerge }) {

    return (
        <WidgetCard title="Active Pull Requests" icon={GitPullRequest}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <PRWidgetColumn title={`Waiting for Review: ${prsNeedingReview.length}`} prs={prsNeedingReview} />
                <PRWidgetColumn title={`Waiting for Merge: ${prsWaitingMerge.length}`} prs={prsWaitingMerge} />
            </div>
        </WidgetCard>
    );
}


