"use client";

import { Loader2 } from "lucide-react";

export default function LoadingWidgetCard({ title, icon: Icon }) {
    return (
        <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-300 flex flex-col space-y-4 h-64 md:h-72 animate-pulse">
            <div className="flex items-center space-x-3 text-blue-600">
                <Icon className="w-6 h-6" />
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
        </div>
    );
}
