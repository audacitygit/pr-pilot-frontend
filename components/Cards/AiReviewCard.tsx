import useFetchAIReviews from "@/hooks/swr/ai/useFetchAIReviews";
import InfoCard from "../InfoCard";

export const AIReviewCard = ({ prNumber, repo }) => {
    const { aiReviews, loading, error } = useFetchAIReviews(repo, prNumber);

    // ✅ Handle API response format
    const reviewData = aiReviews?.data || [];
    const hasReviews = reviewData.length > 0;
    const allInlineComments = reviewData.flatMap((review) => review.inlineComments || []);
    const allSummaries = reviewData.map((review) => review.summaryComment).filter(Boolean);

    // ✅ Handle 404 - Not Reviewed
    const notReviewed = error?.response?.status === 404 || !hasReviews;

    // ✅ Set description dynamically
    const description = loading
        ? "Fetching AI review results..."
        : notReviewed
            ? "This PR has not been reviewed by AI yet."
            : "AI-generated feedback on this PR.";

    // ✅ Determine status text & color dynamically
    let statusText = "Checking...";
    let statusColor = "gray";

    if (loading) {
        statusText = "Checking...";
        statusColor = "gray";
    } else if (notReviewed) {
        statusText = "Not Reviewed";
        statusColor = "gray";
    } else if (allInlineComments.length > 0) {
        statusText = "Issues Found";
        statusColor = "red";
    } else {
        statusText = "All Good";
        statusColor = "green";
    }

    return (
        <InfoCard
            title="AI Review Findings"
            description={description} // ✅ Dynamic description
            status={{ text: statusText, color: statusColor }} // ✅ Dynamic status
        >
            {/* 🔄 Show Loading State */}
            {loading && <p className="text-sm text-gray-500">⏳ Loading AI review...</p>}

            {/* ❌ Show Error State */}
            {error && !notReviewed && (
                <p className="text-sm text-red-500">❌ {error.response?.data?.message || "Failed to load AI review"}.</p>
            )}

            {/* 📌 AI Summaries */}
            {hasReviews && allSummaries.length > 0 && (
                <div className="p-3 bg-gray-100 rounded mb-3">
                    <p className="font-semibold">🔍 AI Summary:</p>
                    {allSummaries.map((summary, index) => (
                        <p key={index} className="text-gray-700 mb-2">{summary}</p>
                    ))}
                </div>
            )}

            {/* 📝 Inline Comments */}
            {allInlineComments.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700">
                    {allInlineComments.map((comment, index) => (
                        <li key={index} className="mb-2">
                            <strong>{comment.file} (Line {comment.line}):</strong> {comment.comment}
                            {comment.suggestion && (
                                <p className="text-green-700">💡 Suggestion: {comment.suggestion}</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                !loading &&
                !error &&
                hasReviews && <p className="text-sm text-gray-600">✅ No issues detected.</p>
            )}
        </InfoCard>
    );
};
