"use client";

import { Accordion } from "@/components/Accordion/Accordion";
import { PullRequest } from "../../../types/pr";
import { categorizePRs } from "../../../utils/helpers";
import PRAccordionItem from "@/components/PR_AccordionItem";
import { PRDetailsCard } from "@/components/Cards/PRDetailsCard";
import { FileChangesCard } from "@/components/Cards/FileChangesCard";
import { AIReviewCard } from "@/components/Cards/AiReviewCard";
import { useTheme } from "@/context/ThemeProvider"; // ✅ Import Theme Context
import useFetchUserPulls from "@/hooks/swr/pulls/queries/useFetchUserPulls";


export default function Pulls() {
    const { theme } = useTheme();
    const { pulls, loading, error } = useFetchUserPulls()
    const { open, closed, merged } = categorizePRs(pulls);

    // ✅ Handle loading state
    if (loading) return <p>Loading pull requests...</p>;
    if (error) return <p>Error fetching data.</p>;

    return (
        <div className="space-y-6">
            {/* Helper function to avoid repetition */}
            {[
                { title: "Open Pull Requests", prs: open, borderColor: "border-green-500" },
                { title: "Merged Pull Requests", prs: merged, borderColor: "border-purple-500" },
                { title: "Closed Pull Requests", prs: closed, borderColor: "border-red-500" },
            ].map(({ title, prs, borderColor }) =>
                prs.length > 0 ? (
                    <div
                        key={title}
                        className={`border-l-4 ${borderColor} shadow-lg rounded-lg p-4 transition-all
                                    ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
                    >
                        <h2 className={`text-xl font-bold mb-3 transition-all 
                                       ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {title}
                        </h2>
                        <Accordion>
                            {prs.map((pr: PullRequest) => (
                                <PRAccordionItem
                                    id={pr.number}
                                    prNumber={pr.number}
                                    key={pr.id}
                                    state={pr.state}
                                    title={pr.title}
                                    created_at={pr.created_at}
                                    user={pr.user.login}
                                    userAvatarUrl={pr.user.avatar_url}
                                    closed_on={pr.closed_at}
                                    merged_at={pr.merged_at}
                                    base_repo_name={pr.base.repo.name}
                                >
                                    <PRDetailsCard pr={pr} repoName={pr.base.repo.name} />
                                    <FileChangesCard number={pr.number} repoName={pr.base.repo.name} />
                                    <AIReviewCard prNumber={pr.number} repo={pr.base.repo.name} />
                                </PRAccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ) : null
            )}
        </div>
    );
}
