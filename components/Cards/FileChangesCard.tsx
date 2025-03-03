import { parseDiffForCards } from "@/utils/helpers";
import InfoCard from "../InfoCard";
import useFetchPullByNumber from "@/hooks/swr/pulls/queries/useFetchUserPullByNumber";

export const FileChangesCard = ({ number, repoName }: { number: string; repoName: string }) => {
    const { diff, loading, error } = useFetchPullByNumber(repoName, number);

    // ✅ Handle Empty Diffs Safely
    const filesChanged = diff ? parseDiffForCards(diff) : [];

    return (
        <InfoCard
            title="File Changes"
            status={{
                text: loading
                    ? "Loading..."
                    : error
                        ? "Failed to load"
                        : `${filesChanged.length} Files Modified`,
                color: error ? "red" : "blue",
            }}
        >
            {/* ✅ Show Loading State */}
            {loading && <p className="text-gray-500 text-sm">⏳ Loading file changes...</p>}

            {/* ✅ Show Error State */}
            {error && <p className="text-red-500 text-sm">❌ Failed to fetch file changes.</p>}

            {/* ✅ Show File Changes Only If Available */}
            {!loading && !error && filesChanged.length > 0 && (
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th className="py-2">File Name</th>
                            <th className="py-2">Insertions</th>
                            <th className="py-2">Deletions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filesChanged.map((file, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2">{file.filename}</td>
                                <td className="py-2 text-green-600">+{file.insertions}</td>
                                <td className="py-2 text-red-600">-{file.deletions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* ✅ Show "No Changes" Message */}
            {!loading && !error && filesChanged.length === 0 && (
                <p className="text-gray-500 text-sm">No file changes detected.</p>
            )}
        </InfoCard>
    );
};
