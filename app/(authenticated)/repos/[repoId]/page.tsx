"use client";
import { Accordion } from "@/components/Accordion/Accordion";
import { AIReviewCard } from "@/components/Cards/AiReviewCard";
import { FileChangesCard } from "@/components/Cards/FileChangesCard";
import { PRDetailsCard } from "@/components/Cards/PRDetailsCard";
import PRRAccordionItem from "@/components/PR_AccordionItem";
import { useTheme } from "@/context/ThemeProvider";
import { useFetchPullRequestByRepoId } from "@/hooks/swr/pulls/queries/useFetchPullRequestsByRepoId";
import { PullRequest } from "@/types/pr";
import { categorizePRs } from "@/utils/helpers";
import { useParams } from "next/navigation";
import { FolderX } from "lucide-react";

export default function SingleRepoPullrequestSlugPage() {
    const { repoId } = useParams();
    const { error, loading, pulls } = useFetchPullRequestByRepoId(repoId as string);
    const { open, closed, merged } = categorizePRs(pulls);
    const { theme } = useTheme();
    if (loading) return <p className="text-gray-500">Loading pull requests...</p>;
    if (error) return <p className="text-red-500">Error loading pull requests.</p>;

    // ✅ Full-page notification if no PRs exist
    if (pulls.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
                <FolderX className="w-16 h-16 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-700 dark:text-white">No Pull Requests Found</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    This repository currently has no open pull requests. Try creating a new PR to see it listed here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide border-b border-gray-700 pb-3">
                Viewing Pull Requests for <span className="text-blue-500">{pulls[0].base.repo.name}</span>
            </h2>

            {/* PR Lists */}
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
                                    id={pr.number}
                                    prUrl={pr.html_url}
                                    key={pr.id}
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
