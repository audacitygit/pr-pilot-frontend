"use client"

export default function WidgetCard({ title, icon: Icon, children }) {
    return (
        <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-300 flex flex-col space-y-4 h-64 md:h-72">
            <div className="flex items-center space-x-3 text-blue-600">
                <Icon className="w-6 h-6" />
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="text-gray-600 text-sm flex-1">{children}</div>
        </div>
    );
}