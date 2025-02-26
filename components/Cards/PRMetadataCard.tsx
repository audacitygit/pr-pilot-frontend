"use client";

import WidgetCard from "@/components/Cards/WidgetCard";
import { GitBranch, User, Calendar, FileCheck } from "lucide-react";

interface PRMetadataCardProps {
    title: string;
    number: number;
    user: { login: string };
    created_at: string;
    head: { ref: string };
    base: { ref: string };
    state: string;
}

export default function PRMetadataCard({ title, number, user, created_at, head, base, state }: PRMetadataCardProps) {
    return (
        <WidgetCard title="Pull Request Metadata">
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                    <p><strong>#{number}:</strong> {title}</p>
                </div>

                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <p><strong>Author:</strong> @{user.login}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <p><strong>Created:</strong> {new Date(created_at).toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-blue-600" />
                    <p><strong>Branch:</strong> {head.ref} → {base.ref}</p>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs ${state === "open" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                        {state.toUpperCase()}
                    </span>
                </div>
            </div>
        </WidgetCard>
    );
}
