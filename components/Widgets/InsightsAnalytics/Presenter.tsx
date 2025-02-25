"use client";

import WidgetCard from "@/components/Cards/WidgetCard";
import { BarChart } from "lucide-react";

interface InsightsAnalyticsProps {
    avgReviewTime: string;
    mostActiveContributor: string;
    mergeRate: string;
}

export default function InsightsAnalyticsPresenter({ avgReviewTime, mostActiveContributor, mergeRate }: InsightsAnalyticsProps) {
    return (
        <WidgetCard title="Insights & Analytics" icon={BarChart}>
            <div className="bg-gray-100 p-3 rounded-lg h-40 flex flex-col gap-1">
                <p className="text-lg font-medium">Avg PR Review Time: <strong>{avgReviewTime}</strong></p>
                <p className="text-lg font-medium">Most Active Contributor: <strong>{mostActiveContributor}</strong></p>
                <p className="text-lg font-medium">PR Merge Rate (30 Days): <strong>{mergeRate}</strong></p>
            </div>
        </WidgetCard>
    );
}
