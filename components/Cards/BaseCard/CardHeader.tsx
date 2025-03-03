import { ReactNode } from "react";

interface CardHeaderProps {
    title: string;
    children?: ReactNode;
}

export function CardHeader({ title, children }: CardHeaderProps) {
    return (
        <div className="border-b pb-2 mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            {children}
        </div>
    );
}
