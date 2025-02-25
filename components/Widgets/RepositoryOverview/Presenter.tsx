"use client";

import WidgetCard from "@/components/Cards/WidgetCard";
import { Folder } from "lucide-react";

interface RepositoryOverviewProps {
    totalRepos: number;
    mostActiveRepo: string;
    lastUpdatedRepo: string;
}

export default function RepositoryOverviewPresenter({ totalRepos, mostActiveRepo, lastUpdatedRepo }: RepositoryOverviewProps) {
    return (
        <WidgetCard title="Repository Overview" icon={Folder}>
            <div className="bg-gray-100 p-3 rounded-lg h-40 flex flex-col gap-1">
                <p className="text-lg font-medium">Total Connected Repositories: <strong>{totalRepos}</strong></p>
                <p className="text-lg font-medium">Most Active Repo: <strong>{mostActiveRepo}</strong></p>
                <p className="text-lg font-medium">Last Updated Repo: <strong>{lastUpdatedRepo}</strong></p>
            </div>
        </WidgetCard>
    );
}
