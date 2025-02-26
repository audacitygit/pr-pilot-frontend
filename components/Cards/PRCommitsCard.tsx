"use client";

import WidgetCard from "@/components/Cards/WidgetCard";

interface PRCommitsCardProps {
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
}

export default function PRCommitsCard({ commits, additions, deletions, changed_files }: PRCommitsCardProps) {
    return (
        <WidgetCard title="Commits & Changes">
            <p className="text-sm"><strong>Commits:</strong> {commits}</p>
            <p className="text-sm"><strong>Lines Added:</strong> +{additions}</p>
            <p className="text-sm"><strong>Lines Removed:</strong> -{deletions}</p>
            <p className="text-sm"><strong>Files Changed:</strong> {changed_files}</p>
        </WidgetCard>
    );
}
