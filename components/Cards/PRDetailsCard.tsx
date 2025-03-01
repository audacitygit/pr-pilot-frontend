import InfoCard from "../InfoCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PRDetailsCard = ({ pr }: any) => {
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