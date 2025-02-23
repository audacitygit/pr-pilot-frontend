"use client";

import { Accordion } from "@/components/Accordion/Accordion";
import { PullRequest } from "../../../types/pr";
import { categorizePRs } from "../../utils/helpers";
import PRRAccordionItem from "@/components/PR_AccordionItem";
import { PRDetailsCard } from "@/components/Cards/PRDetailsCard";
import { FileChangesCard } from "@/components/Cards/FileChangesCard";
import { AIReviewCard } from "@/components/Cards/AiReviewCard";
import useFetchReposById from "@/hooks/pilotApi/queries/useFetchReposById";
import useFetchPullRequests from "@/hooks/pilotApi/queries/useFetchPulls";
import { useSessionContext } from "@/context/SessionProvider";
import { useTheme } from "@/context/ThemeProvider"; // ✅ Import Theme Context

export default function Pulls() {
    // ✅ Fetch repositories first
    const session = useSessionContext();
    const { theme } = useTheme(); // ✅ Get current theme
    console.log({ session });

    const { data, isLoading: repoLoading, error: repoError } = useFetchReposById(session);
    console.log("datainpage", data);

    // ✅ Extract repo IDs (if data is available)
    const repoIds = data?.map(repo => repo.id) || [];
    console.log("repoidsinpage", { repoIds });

    // ✅ Fetch all pull requests for these repo IDs
    const { pulls: pullRequests, loading: prLoading, error: prError } = useFetchPullRequests(repoIds);
    console.log({ pullRequests });

    // ✅ Categorize PRs
    const { open, closed, merged } = categorizePRs(pullRequests);

    // ✅ Handle loading state
    if (repoLoading || prLoading) return <p>Loading pull requests...</p>;
    if (repoError || prError) return <p>Error fetching data.</p>;

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
                                <PRRAccordionItem
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
                                    base_repo_name={pr.base.repo.name}
                                >
                                    <PRDetailsCard pr={pr} />
                                    <FileChangesCard />
                                    <AIReviewCard />
                                </PRRAccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ) : null
            )}
        </div>
    );
}
