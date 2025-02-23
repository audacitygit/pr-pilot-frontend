import InfoCard from "../InfoCard";

export const FileChangesCard = () => {
    const filesChanged = [
        { name: "src/index.js", insertions: 20, deletions: 5 },
        { name: "utils/helper.js", insertions: 30, deletions: 10 },
    ];

    return (
        <InfoCard
            title="File Changes"
            description="A summary of modified files in this PR"
            status={{ text: "2 Files Modified", color: "blue" }}
        >
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
                            <td className="py-2">{file.name}</td>
                            <td className="py-2 text-green-600">+{file.insertions}</td>
                            <td className="py-2 text-red-600">-{file.deletions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </InfoCard>
    );
};
