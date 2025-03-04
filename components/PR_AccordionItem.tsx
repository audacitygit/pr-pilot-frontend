"use client";

import { ReactNode, useState, MouseEvent } from "react";
import dayjs from "dayjs";
import PRStateTag from "./PRStateTag";
import Button from "./Button";
import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import useTriggerAIReview from "@/hooks/swr/ai/useTriggerAIReview";
import { BrainCircuit } from "lucide-react";
import useFetchAIReviews from "@/hooks/swr/ai/useFetchAIReviews";

interface PRAccordionItemProps {
    children: ReactNode;
    state: string;
    prNumber: string;
    title: string;
    created_at: Date | string;
    user: string;
    userAvatarUrl: string;
    closed_on?: string;
    merged_at?: string;
    base_repo_name: string;
    id: string | number;
}

export default function PRAccordionItem({
    children,
    prNumber,
    state = "unknown",
    title = "TKT-001: Default Title",
    created_at = new Date(),
    user = "User",
    userAvatarUrl = "/logo.png",
    closed_on,
    merged_at,
    base_repo_name,
    id
}: PRAccordionItemProps) {
    const { aiReviews, loading } = useFetchAIReviews(base_repo_name, prNumber);
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    const router = useRouter();
    const formattedCreatedAt = dayjs(created_at).format("MMM DD, YYYY - hh:mm A");
    const formattedClosedOn = closed_on ? dayjs(closed_on).format("MMM DD, YYYY - hh:mm A") : null;

    // ✅ Check if PR has been reviewed
    const reviewed = !loading && !!aiReviews?.data?.inlineComments?.length;

    // ✅ Check if PR is merged
    const isMerged = !!merged_at;
    const isClosed = !!closed_on

    const { triggerAIReview, isLoading } = useTriggerAIReview();

    const handleViewPrClick = (e: MouseEvent) => {
        e.stopPropagation();
        router.push(`/repos/${base_repo_name}/pulls/${id}`);
    };

    const handleAIReview = async (e: MouseEvent) => {
        e.stopPropagation();
        try {
            await triggerAIReview(base_repo_name, Number(id));
        } catch (error) {
            console.error("Error triggering AI review:", error);
        }
    };

    // ✅ Determine AI Review Button Text & Disabled State
    let aiReviewButtonText = "Start AI Review";
    let aiReviewDisabled = false;

    if (isMerged || isClosed) {
        aiReviewButtonText = "Cannot Review";
        aiReviewDisabled = true;
    } else if (reviewed) {
        aiReviewButtonText = "Review Again";
    }

    return (
        <div className={`w-full rounded-lg shadow-md overflow-hidden mb-4 transition-all
                         ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}>

            {/* Accordion Header - Click to Toggle */}
            <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 cursor-pointer transition-colors
                            ${theme === "dark" ? "bg-gray-900 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-400"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Column 1 - PR State & Title with Repo Name */}
                <div className="flex flex-wrap items-center gap-3">
                    <PRStateTag state={state} merged_at={merged_at} />
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm font-semibold">{title}</p>
                        <p className="text-xs text-gray-500">{state} in {base_repo_name}</p>
                    </div>
                </div>

                {/* Column 2 - PR Metadata (Opened, Closed) */}
                <div className={`flex flex-wrap gap-2 text-xs sm:text-sm 
                                ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    <p><span className="font-bold">Opened:</span> {formattedCreatedAt}</p>
                    {formattedClosedOn && <p><span className="font-bold">Closed:</span> {formattedClosedOn}</p>}
                </div>

                {/* Column 3 - User & Buttons */}
                <div className="flex flex-wrap justify-between items-center gap-2">
                    {/* User Info */}
                    <div className="flex items-center gap-2">
                        <Image unoptimized={true} height={20} width={20} alt="avatar" src={userAvatarUrl}
                            className={`h-6 w-6 rounded-full border ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`} />
                        <p className="text-xs sm:text-sm">{user}</p>
                    </div>

                    {/* View PR Button */}
                    <Button variant="tertiary" onClick={handleViewPrClick}>
                        View PR
                    </Button>

                    {/* AI Review Button */}
                    <Button variant="primary" onClick={handleAIReview} disabled={aiReviewDisabled || isLoading}>
                        <BrainCircuit className="w-4 h-4" />
                        {isLoading ? "Requesting AI Review..." : aiReviewButtonText}
                    </Button>
                </div>
            </div>

            {/* Accordion Content - Expands Smoothly */}
            {isOpen && (
                <div className={`p-4 transition-all flex gap-4 
                                 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                    {children}
                </div>
            )}
        </div>
    );
}
