import useFetchPullByNumber from "@/hooks/swr/pulls/queries/useFetchUserPullByNumber";
import InfoCard from "../InfoCard";
import { PullRequest } from "@/types/pr";
import { getPRAge } from "@/utils/helpers";

export const PRDetailsCard = ({ pr, repoName }: { pr: PullRequest; repoName: string }) => {
    const { pullRequest, loading, error, reviews } = useFetchPullByNumber(repoName, pr.number);


    // ✅ Determine review status
    const approved = reviews?.some((review) => review.state === "APPROVED");
    const changesRequested = reviews?.some((review) => review.state === "CHANGES_REQUESTED");
    const prAge = pullRequest?.created_at ? getPRAge(pullRequest.created_at) : "Unknown"

    // ✅ Determine action button state
    let actionText = "Approve PR";
    let actionColor = "bg-blue-500";

    if (changesRequested) {
        actionText = "Changes Requested";
        actionColor = "bg-yellow-500";
    } else if (approved) {
        actionText = "Merge PR";
        actionColor = "bg-green-500";
    }

    return (
        <InfoCard
            title="Pull Request Details"
            status={{
                text: loading
                    ? "Loading..."
                    : error
                        ? "Failed to load"
                        : pullRequest?.state?.toUpperCase() || "Unknown",
                color: error ? "red" : pullRequest?.state === "open" ? "green" : "red",
            }}
        >
            {/* ✅ Show Loading State */}
            {loading && <p className="text-gray-500 text-sm">⏳ Loading pull request details...</p>}

            {/* ✅ Show Error State */}
            {error && <p className="text-red-500 text-sm">❌ Failed to fetch pull request details.</p>}

            {/* ✅ Show PR Details Only If Available */}
            {!loading && !error && pullRequest && (
                <ul className="text-sm text-gray-700 mb-4 space-y-2">
                    <li><strong>Commit SHA:</strong> {pullRequest?.base?.sha || "Unknown"}</li>
                    <li><strong>Branch:</strong> {pullRequest?.head?.ref} → {pullRequest?.base?.ref}</li>
                    <li><strong>Mergeable:</strong> {pullRequest?.mergeable ? "✅ Yes" : "❌ No"}</li>
                    <li>
                        <strong>Review Status:</strong>{" "}
                        {approved ? "🟢 Approved" : changesRequested ? "⚠️ Changes Requested" : "⏳ Pending Review"}
                    </li>
                    <li><strong>Opened By:</strong> @{pullRequest?.user?.login || "Unknown"}</li>
                    <li><strong>PR Age:</strong> {prAge} days</li>
                </ul>
            )}

            {/* ✅ Conditional Action Button */}
            {!loading && !error && pullRequest && (
                <button className={`px-4 py-2 text-white rounded ${actionColor} hover:opacity-80 transition`}>
                    {actionText}
                </button>
            )}

            {/* ✅ Show "No Data" Message If PR Details Are Empty */}
            {!loading && !error && !pullRequest && (
                <p className="text-gray-500 text-sm">⚠️ No details available for this pull request.</p>
            )}
        </InfoCard>
    );
};
