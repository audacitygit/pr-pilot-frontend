"use client";

import WidgetCard from "@/components/Cards/WidgetCard";

interface PRCIStatusCardProps {
    statuses_url: string;
}

export default function PRCIStatusCard({ statuses_url }: PRCIStatusCardProps) {
    return (
        <WidgetCard title="CI/CD Status">
            <p className="text-sm"><strong>Build Status:</strong> <a href={statuses_url} target="_blank" className="text-blue-500 hover:underline">View Status</a></p>
        </WidgetCard>
    );
}
