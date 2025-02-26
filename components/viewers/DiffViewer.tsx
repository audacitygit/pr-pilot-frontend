"use client";

import { parseDiffByFile } from "@/utils/helpers";
import DiffAccordion from "../Accordion/DiffAccordion";

interface DiffViewerProps {
    diff: string;
}

export default function DiffViewer({ diff }: DiffViewerProps) {
    if (!diff) return <p className="text-gray-500">No diff available.</p>;

    const fileDiffs = parseDiffByFile(diff);

    return (
        <div className="w-full max-h-[50vh] overflow-y-auto rounded-lg bg-gray-100 p-4 bg-white">
            {Object.entries(fileDiffs).map(([filename, { oldValue, newValue }]) => (
                <DiffAccordion key={filename} filename={filename} oldValue={oldValue.join("\n")} newValue={newValue.join("\n")} />
            ))}
        </div>
    );
}
