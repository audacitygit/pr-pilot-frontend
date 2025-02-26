"use client";

import { useTheme } from "@/context/ThemeProvider";
import React, { MouseEvent } from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "warning" | "alert" | "tertiary" | "sleek" | "neon" | "glass";
}

const Button = ({ children, onClick, disabled, variant = "primary" }: ButtonProps) => {
    const { theme } = useTheme();

    const baseStyles =
        "px-5 py-2 text-sm font-semibold rounded-lg shadow-md transition-all transform flex items-center justify-center gap-2";

    const colorVariants = {
        primary: "bg-green-600 hover:bg-green-700 text-white hover:scale-105 hover:shadow-lg",
        secondary: "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 hover:shadow-lg",
        tertiary: "bg-gray-600 hover:bg-gray-500 text-gray-300 hover:scale-105 hover:shadow-lg",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-black hover:scale-105 hover:shadow-lg",
        alert: "bg-red-600 hover:bg-red-700 text-white hover:scale-105 hover:shadow-lg",
    };

    const sleekVariants = {
        sleek: "bg-gray-900 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:scale-105 hover:shadow-xl",
        neon: "bg-black text-green-400 border border-green-500 hover:shadow-neon-green",
        glass: "bg-gray-900/80 border border-gray-700 text-gray-300 backdrop-blur-md hover:bg-gray-900/90",
    };

    const disabledStyles = theme === "dark" ? "bg-gray-700 text-gray-400" : "bg-gray-300 text-gray-500";

    return (
        <button
            className={`${baseStyles} ${disabled ? disabledStyles : colorVariants[variant] || sleekVariants[variant]} 
                        ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
