"use client";

import { ReactNode } from "react";

interface WidgetCardProps {
    title: string;
    children: ReactNode;
}

export default function DarkWidgetCard({ title, children }: WidgetCardProps) {
    return (
        <div className="relative bg-gray-900/80 dark:bg-gray-800/80 shadow-lg border border-gray-700 rounded-2xl p-6 
                        backdrop-blur-lg hover:shadow-neon transition-all duration-300">
            {/* Futuristic Neon Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 to-gray-900/30 rounded-2xl blur-md opacity-20"></div>

            {/* Title Bar with Glow Effect */}
            <h2 className="relative text-lg font-semibold text-blue-400 tracking-wide pb-2 
                          after:content-[''] after:w-full after:h-[2px] after:bg-blue-500 after:block after:mt-1 after:opacity-40">
                {title}
            </h2>

            {/* Content */}
            <div className="relative text-gray-300 text-sm mt-4">
                {children}
            </div>
        </div>
    );
}
