import React, { MouseEvent } from "react";
import { useTheme } from "../context/ThemeProvider";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void; // Accepts event
    disabled?: boolean;
    variant?: "primary" | "secondary" | "warning" | "alert" | "tertiary";
}

const Button = ({ children, onClick, disabled, variant = "primary" }: ButtonProps) => {
    const { theme } = useTheme(); // Get current theme
    const baseStyles =
        "px-4 py-1 text-white rounded-lg shadow-lg transition-transform transform";

    const variantStyles = {
        primary: "bg-green-600 hover:scale-105 hover:shadow-xl active:scale-95",
        secondary: "bg-blue-600 hover:scale-105 hover:shadow-xl active:scale-95",
        tertiary: "bg-blue-300 hover:scale-105 hover:shadow-xl active:scale-95",
        warning: "bg-yellow-500 hover:scale-105 hover:shadow-xl active:scale-95",
        alert: "bg-red-600 hover:scale-105 hover:shadow-xl active:scale-95",
    };

    // Handle disabled state for both themes
    const disabledStyles = theme === "dark" ? "bg-gray-600" : "bg-gray-300";

    return (
        <button
            className={`${baseStyles} ${disabled ? disabledStyles : variantStyles[variant]} 
                        ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
