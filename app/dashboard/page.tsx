import { Accordion } from "../components/Accordion/Accordion";
import { AIReviewCard } from "../components/Cards/AiReviewCard";
import { FileChangesCard } from "../components/Cards/FileChangesCard";
import { PRDetailsCard } from "../components/Cards/PRDetailsCard";
import AccordionItem from "../components/PR_AccordionItem";
import { PullRequest } from "../types/pr";
import { categorizePRs } from "../utils/helpers";
import { getPullRequests } from "../api/queries/prs/getPRs";

export default async function Dashboard() {
    //TODO: Setup error messaging

    const { data: pullRequests } = await getPullRequests()
    const { open, closed, merged } = categorizePRs(pullRequests);

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
                            {prs.map((pr: PullRequest) => (
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
                                    <PRDetailsCard pr={pr} />
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
