import React from "react";

interface InfoCardProps {
    title: string;
    description?: string;
    status?: { text: string; color: string }; // Optional status badge
    children?: React.ReactNode; // Allows tables, lists, etc.
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, status, children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-2xl h-80 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                {status && (
                    <span
                        className={`px-2 py-1 text-sm font-medium rounded-md text-white`}
                        style={{ backgroundColor: status.color }}
                    >
                        {status.text}
                    </span>
                )}
            </div>
            {description && <p className="text-gray-600 text-sm mb-3">{description}</p>}
            <div>{children}</div>
        </div>
    );
};

export default InfoCard;
