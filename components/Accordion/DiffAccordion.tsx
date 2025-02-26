"use client";

import { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { useTheme } from "@/context/ThemeProvider";

interface DiffAccordionProps {
    filename: string;
    oldValue: string;
    newValue: string;
}

export default function DiffAccordion({ filename, oldValue, newValue }: DiffAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    // ✅ Compute insertions & deletions
    const insertions = newValue.split("\n").length
    const deletions = oldValue.split("\n").length
    const totalChanges = insertions + deletions;

    return (
        <div className={`w-full rounded-lg shadow-md overflow-hidden mb-4 transition-all
                         ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}>

            {/* Accordion Header */}
            <div
                className={`flex justify-between items-center p-4 cursor-pointer transition-colors 
                            ${theme === "dark" ? "bg-gray-900 hover:bg-gray-700" : "bg-gray-300 hover:bg-gray-400"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Filename & Change Counts */}
                <div className="flex flex-col">
                    <p className="text-sm font-semibold truncate">{filename}</p>
                    <p className="text-xs text-gray-500">
                        +{insertions} insertions | -{deletions} deletions | {totalChanges} total changes
                    </p>
                </div>

                {/* Expand/Collapse Icon */}
                <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
            </div>

            {/* Accordion Content - Diff Viewer */}
            {isOpen && (
                <div className={`p-4 transition-all 
                                 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                    <ReactDiffViewer
                        oldValue={oldValue}
                        newValue={newValue}
                        splitView={true}
                        compareMethod={DiffMethod.WORDS}
                        styles={{
                            variables: { light: { diffViewerBackground: "#f8f9fa" } },
                            line: { padding: "5px 10px" },
                        }}
                    />
                </div>
            )}
        </div>
    );
}
