import InfoCard from "../InfoCard";

export const AIReviewCard = () => {
    const aiIssues = [
        "Detected redundant code in utils/helper.js",
        "Possible security risk in authentication.js",
        "Performance optimization needed in database.js",
    ];

    return (
        <InfoCard
            title="AI Review Findings"
            description="AI-generated feedback on this PR"
            status={{ text: aiIssues.length ? "Issues Found" : "All Good", color: aiIssues.length ? "red" : "green" }}
        >
            {aiIssues.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700">
                    {aiIssues.map((issue, index) => (
                        <li key={index} className="mb-1">{issue}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-600">✅ No issues detected.</p>
            )}
        </InfoCard>
    );
};
