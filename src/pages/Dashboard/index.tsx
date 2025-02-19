import { Accordion } from "scrappy-ui";
import AccordionItem from "../../components/PR_AccordionItem";
import { usePRs } from "../../api/queries/prs/usePRs";
import { categorizePRs } from "../../utils/helpers";
import { pullRequest } from "../../types/pr";
import InfoCard from "../../components/InfoCard";


export const PRDetailsCard = ({ pr = { changesRequested: true, approved: false, state: "open" } }: any) => {
    // Determine button text based on review status
    let actionText = "Approve PR"; // Default action if no reviews yet
    let actionColor = "bg-blue-500"; // Default color

    if (pr.changesRequested) {
        actionText = "Changes Requested";
        actionColor = "bg-yellow-500";
    } else if (pr.approved) {
        actionText = "Merge PR";
        actionColor = "bg-green-500";
    }

    return (
        <InfoCard
            title="Pull Request Details"
            description="Summary of the pull request"
            status={{ text: pr.state.toUpperCase(), color: "green" }}
        >
            <ul className="text-sm text-gray-700 mb-4">
                <li><strong>Commit SHA:</strong> {pr.commitSHA}</li>
                <li><strong>Branch:</strong> {pr.sourceBranch} → {pr.targetBranch}</li>
                <li><strong>Mergeable:</strong> {pr.mergeable ? "✅ Yes" : "❌ No"}</li>
                <li><strong>Review Status:</strong> {pr.approved ? "🟢 Approved" : pr.changesRequested ? "⚠️ Changes Requested" : "⏳ Pending Review"}</li>
                <li><strong>Opened By:</strong> @{pr.author}</li>
                <li><strong>PR Age:</strong> {pr.age} days</li>
            </ul>

            {/* Conditional Button */}
            <button className={`px-4 py-2 text-white rounded ${actionColor} hover:opacity-80 transition`}>
                {actionText}
            </button>
        </InfoCard>
    );
};

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

export default function Dashboard() {
    const { data: pullRequests, isLoading, error } = usePRs();

    if (isLoading) return <p className="text-center text-lg font-semibold">Loading PRs...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error loading PRs: {error.message}</p>;

    const { open, closed, merged } = categorizePRs(pullRequests);
    console.log({ open })
    return (

        <div className="space-y-6">
            {/* Helper function to avoid repetition */}
            {[
                { title: "Open Pull Requests", prs: open, borderColor: "border-green-500" },
                { title: "Merged Pull Requests", prs: merged, borderColor: "border-purple-500" },
                { title: "Closed Pull Requests", prs: closed, borderColor: "border-red-500" },
            ].map(({ title, prs, borderColor }) =>
                prs.length > 0 ? (
                    <div key={title} className={`border-l-4 ${borderColor} bg-white shadow-lg rounded-lg p-4`}>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
                        <Accordion>
                            {prs.map((pr: pullRequest) => (
                                <AccordionItem
                                    prUrl={pr.html_url}
                                    key={pr.number}
                                    state={pr.state}
                                    reviewed={pr.state !== "open"}
                                    title={pr.title}
                                    created_at={pr.created_at}
                                    user={pr.user.login}
                                    userAvatarUrl={pr.user.avatar_url}
                                    closed_on={pr.closed_at}
                                    merged_at={pr.merged_at}
                                >
                                    <PRDetailsCard />
                                    <FileChangesCard />
                                    <AIReviewCard />
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ) : null
            )}
        </div>

    );
}
