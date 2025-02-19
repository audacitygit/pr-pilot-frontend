import { useQueries } from "@tanstack/react-query";
import { usePRs } from "../../api/queries/prs/usePRs";
import { pullRequest } from "../../types/pr";
import { fetchPRByNumber } from "../../api/queries/prs/usePRsByNumber";
import { fetchReviews } from "../../api/queries/prs/usePRReviews";

export const usePRDashboardData = () => {
    // Fetch all open PRs first
    const { data: pullRequests, isLoading: isPRsLoading, error: prsError } = usePRs();
    const openPRs = pullRequests?.filter((pr: pullRequest) => pr.state === "open") || [];

    // Fetch PR details in parallel
    const prDetailsQueries = useQueries({
        queries: openPRs.map((pr: pullRequest) => ({
            queryKey: ["pullRequestDetails", pr.number],
            queryFn: () => fetchPRByNumber(pr.number), // Fetch PR details (mergeable status, etc.)
            staleTime: 1000 * 60 * 5,
        })),
    });

    // Fetch PR reviews in parallel
    const prReviewsQueries = useQueries({
        queries: openPRs.map((pr: pullRequest) => ({
            queryKey: ["pullRequestReviews", pr.number],
            queryFn: () => fetchReviews(pr.number), // Fetch reviews (APPROVED, CHANGES_REQUESTED, etc.)
            staleTime: 1000 * 60 * 5,
        })),
    });

    // Merge PR details and reviews
    const detailedPRs = openPRs.map((pr: pullRequest, index: number) => {
        const prDetails = prDetailsQueries[index]?.data || {};
        const reviews = prReviewsQueries[index]?.data as any || [];

        return {
            ...pr,
            ...prDetails,
            reviews,
            approved: reviews.some((r: { state: string }) => r.state === "APPROVED"),
            changesRequested: reviews.some((r: { state: string }) => r.state === "CHANGES_REQUESTED"),
        };
    });

    return {
        pullRequests,
        openPRs,
        detailedPRs,
        isLoading: isPRsLoading || prDetailsQueries.some(q => q.isLoading) || prReviewsQueries.some(q => q.isLoading),
        error: prsError || prDetailsQueries.find(q => q.error)?.error || prReviewsQueries.find(q => q.error)?.error,
    };
};
