"use client"

import { ReactNode, useState, MouseEvent } from "react";
import dayjs from "dayjs";
import PRStateTag from "./PRStateTag";
import { useTheme } from "../context/ThemeProvider";
import Button from "./Button"; // Import the reusable Button component
import Image from "next/image";

interface AccordionItemProps {
    children: ReactNode;
    state: string;
    reviewed: boolean;
    title: string;
    created_at: Date | string;
    user: string;
    userAvatarUrl: string;
    closed_on?: string;
    merged_at?: string;
    prUrl: string;

}

export default function AccordionItem({
    children,
    state = "unkwn",
    reviewed = false,
    title = "TKT-001: Default Title",
    created_at = new Date(),
    user = "User",
    userAvatarUrl = "/logo.png",
    closed_on,
    merged_at,
    prUrl,
}: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const formattedCreatedAt = dayjs(created_at).format("MMM DD, YYYY - hh:mm A");
    const formattedClosedOn = closed_on ? dayjs(closed_on).format("MMM DD, YYYY - hh:mm A") : null;

    const handleViewPrClick = (e: MouseEvent) => {
        e.stopPropagation()
        window.open(prUrl, "_blank")
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
                {/* Column 1 - PR State & Title */}
                <div className="flex flex-wrap items-center gap-3">
                    <PRStateTag state={state} merged_at={merged_at} />
                    <p className="text-sm sm:text-lg font-bold">{title}</p>
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
                        <Image height={20} width={20} alt="avatar" src={userAvatarUrl} className={`h-6 w-6 rounded-full border ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`} />
                        <p className="text-xs sm:text-sm">{user}</p>
                    </div>

                    {/* View PR Button */}
                    <Button variant="tertiary" onClick={(e) => handleViewPrClick(e)}>
                        View PR
                    </Button>

                    {/* AI Review Button */}
                    <Button variant="primary" disabled={reviewed}>
                        {reviewed ? "Review Complete" : "Start AI-Review"}
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
