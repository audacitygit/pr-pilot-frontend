import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return <div className={`border rounded-lg bg-white shadow p-4 ${className}`}>{children}</div>;
}
