"use client";

import LoadingWidgetCard from "@/components/Cards/LoadingWidgetCard";
import ActivePrPresenter from "./Presenter";
import useFetchUserCategorizedPulls from "@/hooks/swr/pulls/queries/useFetchUserCategorizedPulls";
import { GitPullRequest } from "lucide-react";


export default function ActivePullRequestsContainer() {
    const { pulls, loading, error } = useFetchUserCategorizedPulls()
    console.log("pulls here container", { pulls })

    if (loading) return <LoadingWidgetCard title="Active Pull Requests" icon={GitPullRequest} />
    if (error) return <p className="text-red-500">Error loading PRs.</p>;

    return <ActivePrPresenter prsNeedingReview={[...pulls.needsReview, ...pulls.reviewedChangesRequested, ...pulls.reviewedCommentsOnly]} prsWaitingMerge={[...pulls.reviewedApprovedAndMergeable]} />;
}
