import { ReactNode, useState } from "react";
import dayjs from "dayjs";
import PRStateTag from "./PRStateTag";

interface AccordionItemProps {
    children: ReactNode,
    state: string,
    reviewed: boolean,
    title: string,
    created_at: string,
    user: string,
    userAvatarUrl: string
    closed_on?: string
    merged_at?: string
}

export default function AccordionItem({ children, state = "unkwn", reviewed = false, title = "TKT-001: Default Title", created_at = new Date() as any, user = "User", userAvatarUrl = "/logo.png", closed_on, merged_at }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const formattedCreatedAt = dayjs(created_at).format("MMM DD, YYYY - hh:mm A");
    const formattedClosedOn = created_at && dayjs(created_at).format("MMM DD, YYYY - hh:mm A");
    return (
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-4">
            {/* Accordion Header - Click to Toggle */}
            <div
                className="grid grid-cols-3 w-full items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition-colors z-10 bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Column 1 */}
                <div id="column-1">
                    <div id="row-1" className="flex items-center gap-3">
                        {/* State Tag */}
                        <PRStateTag state={state} merged_at={merged_at} />
                        {/* Status Pill */}
                        <div className="h-4 w-4 border-2 border-green-700 bg-green-600 rounded-full shadow-md" />

                        {/* Title */}
                        <p className="text-lg font-bold pl-6">{title}</p>
                    </div>
                </div>

                {/* Column 2 */}
                <div id="column-2" className="flex gap-2 justify-between items-center pr-10">
                    <p className="text-sm"><span className="font-bold">Opened on:</span> {formattedCreatedAt}</p>
                    {closed_on && (
                        <p className="text-sm"><span className="font-bold">Closed on:</span> {formattedClosedOn}</p>
                    )}
                    {!closed_on && (
                        <div />
                    )}

                </div>

                {/* Column 3 */}
                <div id="column-3" className="flex gap-4 items-center justify-between">
                    {/* User Info */}
                    <div className="flex items-center gap-2">
                        <img src={userAvatarUrl} className="h-6 w-6 rounded-full" />
                        <p>{user}</p>
                    </div>

                    {/* AI Review Button */}
                    <button disabled={reviewed} className={` text-white rounded-lg px-4 py-1 shadow-lg transition-transform transform  z-40  ${reviewed ? "bg-gray-300" : "bg-green-600 hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer"}`}>
                        {!reviewed && "Start AI-Review"}
                        {reviewed && "Review Complete"}
                    </button>
                </div>
            </div>

            {/* Accordion Content - Expands Smoothly */}
            <div
                className={`transition-all duration-300 ${isOpen ? "max-h-96 p-4 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
            >
                {children}
            </div>
        </div>
    );
}
