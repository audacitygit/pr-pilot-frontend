"use client";

import useFetchUserPulls from "@/hooks/swr/pulls/queries/useFetchUserPulls";

import LoadingWidgetCard from "@/components/Cards/LoadingWidgetCard";
import { BarChart } from "lucide-react";
import { useMemo } from "react";
import InsightsAnalyticsPresenter from "./Presenter";
import { calculatePRInsights } from "@/utils/helpers";


export default function InsightsAnalyticsContainer() {
    const { pulls, loading, error } = useFetchUserPulls();
    const insights = useMemo(() => calculatePRInsights(pulls), [pulls]);

    if (loading) return <LoadingWidgetCard title="Insights & Analytics" icon={BarChart} />;
    if (error) return <p className="text-red-500">Error loading insights.</p>;

    // ✅ Use `useMemo` to recalculate only when PR data changes

    return <InsightsAnalyticsPresenter {...insights} />;
}
