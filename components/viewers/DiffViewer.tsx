"use client";

import { extractNewValue, extractOldValue } from "@/utils/helpers";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

interface DiffViewerProps {
    diff: string;
}

export default function DiffViewer({ diff }: DiffViewerProps) {
    if (!diff) return <p className="text-gray-500">No diff available.</p>;

    return (
        <div className="w-full h-[33vh] overflow-y-auto border border-gray-300 rounded-lg bg-gray-100 p-4">
            <ReactDiffViewer
                oldValue={extractOldValue(diff)}
                newValue={extractNewValue(diff)}
                splitView={true} // ✅ Show side-by-side diffs
                compareMethod={DiffMethod.WORDS}
                styles={{
                    variables: { light: { diffViewerBackground: "#f8f9fa" } },
                    line: { padding: "5px 10px" },
                }}
            />
        </div>
    );
}
