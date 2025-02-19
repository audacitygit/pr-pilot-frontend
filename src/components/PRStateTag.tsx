export default function PRStateTag({ state, merged_at }: { state: string; merged_at?: string | null }) {
    // Determine the background color based on the state & merge status
    const bgColor = merged_at
        ? "bg-purple-600 border-purple-700" // Merged (Purple)
        : state === "closed"
            ? "bg-red-600 border-red-700" // Closed (Red)
            : "bg-green-600 border-green-700"; // Open (Green)

    return (
        <div className={`text-xs h-6 w-14 border-2 ${bgColor} text-white rounded-lg flex items-center justify-center shadow-md`}>
            {merged_at ? "Merged" : state}
        </div>
    );
}
