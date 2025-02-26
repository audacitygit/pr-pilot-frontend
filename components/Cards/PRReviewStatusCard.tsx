"use client";

import WidgetCard from "@/components/Cards/WidgetCard";

interface PRReviewStatusCardProps {
    requested_reviewers: { login: string }[];
    review_comments: number;
    comments: number;
}

export default function PRReviewStatusCard({ requested_reviewers, review_comments, comments }: PRReviewStatusCardProps) {
    return (
        <WidgetCard title="Review Status">
            <p className="text-sm"><strong>Requested Reviewers:</strong> {requested_reviewers.length > 0 ? requested_reviewers.map(r => `@${r.login}`).join(", ") : "None"}</p>
            <p className="text-sm"><strong>Review Comments:</strong> {review_comments}</p>
            <p className="text-sm"><strong>General Comments:</strong> {comments}</p>
        </WidgetCard>
    );
}
