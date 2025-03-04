"use client";

import PRActionsCard from "@/components/Cards/PRActionsCard";
import PRCIStatusCard from "@/components/Cards/PRCIStatusCard";
import PRCommitsCard from "@/components/Cards/PRCommitsCard";
import PRMetadataCard from "@/components/Cards/PRMetadataCard";
import PRReviewStatusCard from "@/components/Cards/PRReviewStatusCard";
import PRStatusCard from "@/components/Cards/PRStatusCard";

import DiffViewer from "@/components/viewers/DiffViewer";
import useFetchPullByNumber from "@/hooks/swr/pulls/queries/useFetchUserPullByNumber";
import { useParams } from "next/navigation";

export default function RepoByIdPullByIdPage() {
    const { repoId, pullNumber } = useParams();
    const { diff, pullRequest, loading, error } = useFetchPullByNumber(repoId as string, pullNumber as string);

    if (loading) return <p className="text-gray-500">Loading pull request...</p>;
    if (error) return <p className="text-red-500">Error loading pull request.</p>;

    return (
        <div className="p-6">
            {/* Full-Width Diff Viewer */}
            <h2 className="text-xl font-bold text-gray-900">Files Changed</h2>
            <div className="w-full border border-gray-300 rounded-lg shadow-sm bg-white p-4 mb-4">
                <DiffViewer diff={diff} />
            </div>

            {/* Grid Layout for PR Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PRMetadataCard {...pullRequest} />
                <PRStatusCard {...pullRequest} pr={pullRequest} />
                <PRReviewStatusCard {...pullRequest} />
                <PRCommitsCard {...pullRequest} />
                <PRCIStatusCard statuses_url={pullRequest.statuses_url} />
                <PRActionsCard {...pullRequest} />
            </div>
        </div>
    );
}
