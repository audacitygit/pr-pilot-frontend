"use client";

import { Check, GitMerge, Undo, BrainCircuit } from "lucide-react";
import Button from "../Button";
import DarkWidgetCard from "./DarkWidgetCard";

interface PRActionsCardProps {
    mergeable: boolean | null;
}

export default function PRActionsCard({ mergeable }: PRActionsCardProps) {
    return (
        <DarkWidgetCard title="Actions">
            <div className="flex flex-col gap-3">
                <Button variant="primary" onClick={() => { }}>
                    <Check className="w-4 h-4" />
                    Approve
                </Button>

                {mergeable && (
                    <Button variant="secondary" onClick={() => { }}>
                        <GitMerge className="w-4 h-4" />
                        Merge
                    </Button>
                )}

                <Button variant="tertiary" onClick={() => { }}>
                    <Undo className="w-4 h-4" />
                    Request Changes
                </Button>

                <Button variant="sleek" onClick={() => { }}>
                    <BrainCircuit className="w-4 h-4" />
                    Request AI Review
                </Button>
            </div>
        </DarkWidgetCard>
    );
}
