import useFetchPullByNumber from "@/hooks/swr/pulls/queries/useFetchUserPullByNumber";
import InfoCard from "../InfoCard";
import { PullRequest } from "@/types/pr";

export const PRDetailsCard = ({ pr, repoName }: { pr: PullRequest; repoName: string }) => {
    const { pullRequest, diff, loading, error, reviews } = useFetchPullByNumber(repoName, pr.number);

    console.log({ pullRequest, loading, error, diff, reviews });

    // ✅ Determine review status
    const approved = reviews?.some((review) => review.state === "APPROVED");
    const changesRequested = reviews?.some((review) => review.state === "CHANGES_REQUESTED");

    // ✅ Button action state
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
        <>
            {!loading && !error && pullRequest && (
                <InfoCard
                    title="Pull Request Details"
                    status={{ text: pullRequest.state.toUpperCase(), color: pullRequest.state === "open" ? "green" : "red" }}
                >
                    <ul className="text-sm text-gray-700 mb-4 space-y-2">
                        <li><strong>Commit SHA:</strong> {pullRequest?.base?.sha}</li>
                        <li><strong>Branch:</strong> {pullRequest?.head?.ref} → {pullRequest?.base?.ref}</li>
                        <li><strong>Mergeable:</strong> {pullRequest?.mergeable ? "✅ Yes" : "❌ No"}</li>
                        <li>
                            <strong>Review Status:</strong> {approved ? "🟢 Approved" : changesRequested ? "⚠️ Changes Requested" : "⏳ Pending Review"}
                        </li>
                        <li><strong>Opened By:</strong> @{pullRequest?.user?.login || "Unknown"}</li>
                        <li><strong>PR Age:</strong> {pr?.age} days</li>
                    </ul>

                    {/* ✅ Conditional Action Button */}
                    <button className={`px-4 py-2 text-white rounded ${actionColor} hover:opacity-80 transition`}>
                        {actionText}
                    </button>
                </InfoCard>
            )}

            {/* 🔴 Handle Error State */}
            {error && <p className="text-red-500">❌ Failed to load PR details.</p>}

            {/* ⏳ Handle Loading State */}
            {loading && <p className="text-gray-500">Loading PR details...</p>}
        </>
    );
};
