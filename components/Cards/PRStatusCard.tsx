"use client";

import WidgetCard from "@/components/Cards/WidgetCard";
import dayjs from "dayjs";

interface PRStatusCardProps {
    state: string;
    draft: boolean;
    merged: boolean;
    mergeable: boolean | null;
    mergeable_state: string;
    merged_at?: string | null;
}

export default function PRStatusCard({ state, draft, merged, mergeable, mergeable_state, merged_at }: PRStatusCardProps) {
    const formattedMergeDate = merged_at ? dayjs(merged_at).format("MMM DD, YYYY - hh:mm A") : null;

    // Determine the mergeability status
    let mergeableStatus = "Unknown";
    if (merged) {
        mergeableStatus = `Already Merged`;
    } else if (state === "closed") {
        mergeableStatus = "Closed";
    } else if (mergeable !== null) {
        mergeableStatus = mergeable ? "Yes" : "No";
    }

    return (
        <WidgetCard title="PR Status & Mergeability">
            <div className="space-y-1 text-sm">
                <p><strong>Draft:</strong> {draft ? "Yes" : "No"}</p>
                <p><strong>Merged:</strong> {merged ? `Yes - ${formattedMergeDate}` : "No"}</p>
                <p><strong>Mergeable:</strong> {mergeableStatus}</p>
                {!merged && <p><strong>Mergeable State:</strong> {mergeable_state}</p>}
            </div>
        </WidgetCard>
    );
}
