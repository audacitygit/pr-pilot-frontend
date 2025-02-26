"use client";

import LoadingWidgetCard from "@/components/Cards/LoadingWidgetCard";
import useFetchUserRepos from "@/hooks/swr/repos/queries/useFetchUserRepos";
import { Folder } from "lucide-react";
import RepositoryOverviewPresenter from "./Presenter";

export default function RepositoryOverviewContainer() {
    const { repos, loading, error } = useFetchUserRepos();

    if (loading) return <LoadingWidgetCard title="Repository Overview" icon={Folder} />;
    if (error) return <p className="text-red-500">Error loading repositories.</p>;

    if (!repos.length) {
        return <RepositoryOverviewPresenter totalRepos={0} mostActiveRepo="N/A" lastUpdatedRepo="N/A" />;
    }

    // ✅ Process the data safely
    const mostActiveRepo = repos.length
        ? repos.reduce((a, b) => (a.pullRequestsCount > b.pullRequestsCount ? a : b)).name
        : "N/A";

    const lastUpdatedRepo = repos.length
        ? repos.reduce((a, b) => (new Date(a.pushed_at) > new Date(b.pushed_at) ? a : b)).name
        : "N/A";

    return <RepositoryOverviewPresenter totalRepos={repos.length} mostActiveRepo={mostActiveRepo} lastUpdatedRepo={lastUpdatedRepo} />;
}
