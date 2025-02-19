import { Accordion, PageLayout } from "scrappy-ui";
import AccordionItem from "../../components/AccordionItem";
import { usePRs } from "../../api/queries/prs/usePRs";
import { categorizePRs } from "../../utils/helpers";
import { pullRequest } from "../../types/pr";

export default function Dashboard() {
    const { data: pullRequests, isLoading, error } = usePRs();

    if (isLoading) return <p className="text-center text-lg font-semibold">Loading PRs...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error loading PRs: {error.message}</p>;

    const { open, closed, merged } = categorizePRs(pullRequests);

    return (
        <PageLayout>
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
                                        content
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ) : null
                )}
            </div>
        </PageLayout>
    );
}
