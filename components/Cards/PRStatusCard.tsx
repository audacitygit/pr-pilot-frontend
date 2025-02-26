"use client";

import WidgetCard from "@/components/Cards/WidgetCard";

interface PRStatusCardProps {
    state: string;
    draft: boolean;
    merged: boolean;
    mergeable: boolean | null;
    mergeable_state: string;
    merged_at?: string | null;
}

export default function PRStatusCard({ state, draft, merged, mergeable, mergeable_state, merged_at }: PRStatusCardProps) {
    return (
        <WidgetCard title="PR Status & Mergeability">
            <p className="text-sm"><strong>State:</strong> {state}</p>
            <p className="text-sm"><strong>Draft:</strong> {draft ? "Yes" : "No"}</p>
            <p className="text-sm"><strong>Merged:</strong> {merged ? `Yes (${merged_at})` : "No"}</p>
            <p className="text-sm"><strong>Mergeable:</strong> {mergeable === null ? "Unknown" : mergeable ? "Yes" : "No"}</p>
            <p className="text-sm"><strong>Mergeable State:</strong> {mergeable_state}</p>
        </WidgetCard>
    );
}
