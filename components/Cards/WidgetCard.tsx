"use client";

import { ReactNode, ElementType } from "react";

interface WidgetCardProps {
    title: string;
    icon?: ElementType; // ✅ Expect an actual component, not a ReactNode
    children: ReactNode;
}

export default function WidgetCard({ title, icon: Icon, children }: WidgetCardProps) {
    return (
        <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-300 flex flex-col space-y-4 h-64 md:h-72">
            {/* ✅ Conditionally render icon if provided */}
            <div className="flex items-center space-x-3 text-blue-600">
                {Icon && <Icon className="w-6 h-6" />} {/* ✅ Fixed icon rendering */}
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            {/* Content */}
            <div className="text-gray-600 text-sm flex-1">{children}</div>
        </div>
    );
}
