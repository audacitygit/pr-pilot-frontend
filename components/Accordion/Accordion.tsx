"use client";
import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeProvider"; // ✅ Import Theme Context

interface AccordionProps {
    children: ReactNode;
}

export function Accordion({ children }: AccordionProps) {
    const { theme } = useTheme(); // ✅ Get theme from context

    return (
        <div
            className={`w-full mx-auto transition-all rounded-lg shadow-md p-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
        >
            {children}
        </div>
    );
}
