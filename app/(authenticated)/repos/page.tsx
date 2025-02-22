"use client";

import { useEffect, useState } from "react";
import RepoCard from "../../components/Cards/RepoCard";
import AddRepoModal from "../../components/Modals/AddRepoModal";
import { useSession } from "next-auth/react";
import { getUserRepos } from "@/app/actions/github";


export default function Repos() {
    const { data: session } = useSession()
    const [repos, setRepos] = useState([]);
    const [gitRepos, setGitRepos] = useState([])
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log({ session, repos })

    useEffect(() => {
        async function fetchRepos() {
            try {
                const res = await fetch("/pilot/api/repos");
                if (!res.ok) throw new Error("Failed to fetch repositories");

                const data = await res.json();
                setRepos(data);
            } catch (error) {
                console.error("Error fetching repositories:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRepos();
    }, []);

    const handleConnectRepoClick = async () => {
        setIsModalOpen(true)

        try {
            const response = await getUserRepos(session.user.name)
            setGitRepos(response)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            throw new Error(e.message)
        }

    }
    const mockRepos = [
        {
            id: 1,
            name: "Next.js Starter",
            owner: {
                login: "dev-user",
                avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
                html_url: "https://github.com/dev-user",
            },
            html_url: "https://github.com/dev-user/nextjs-starter",
            description: "A minimal Next.js starter template with Tailwind CSS.",
            stargazers_count: 120,
            forks_count: 45,
            language: "JavaScript",
            open_issues_count: 3,
            visibility: "public",
            updated_at: "2024-02-20T17:31:55Z",
        },
        {
            id: 2,
            name: "AI Review Bot",
            owner: {
                login: "ai-developer",
                avatar_url: "https://avatars.githubusercontent.com/u/102321?v=4",
                html_url: "https://github.com/ai-developer",
            },
            html_url: "https://github.com/ai-developer/ai-review-bot",
            description: "AI-powered GitHub PR reviewer for code improvements.",
            stargazers_count: 85,
            forks_count: 21,
            language: "Python",
            open_issues_count: 0,
            visibility: "private",
            updated_at: "2024-02-19T14:12:30Z",
        },
        {
            id: 3,
            name: "PR Management Dashboard",
            owner: {
                login: "org-team",
                avatar_url: "https://avatars.githubusercontent.com/u/312312?v=4",
                html_url: "https://github.com/org-team",
            },
            html_url: "https://github.com/org-team/pr-management",
            description: "A dashboard to track pull requests across multiple repos.",
            stargazers_count: 230,
            forks_count: 78,
            language: "TypeScript",
            open_issues_count: 7,
            visibility: "public",
            updated_at: "2024-02-18T11:45:10Z",
        },
        {
            id: 4,
            name: "React Component Library",
            owner: {
                login: "frontend-dev",
                avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
                html_url: "https://github.com/frontend-dev",
            },
            html_url: "https://github.com/frontend-dev/react-components",
            description: "A collection of reusable React UI components.",
            stargazers_count: 315,
            forks_count: 96,
            language: "TypeScript",
            open_issues_count: 4,
            visibility: "public",
            updated_at: "2024-02-17T09:28:45Z",
        },
        {
            id: 5,
            name: "Serverless API Gateway",
            owner: {
                login: "cloud-architect",
                avatar_url: "https://avatars.githubusercontent.com/u/654321?v=4",
                html_url: "https://github.com/cloud-architect",
            },
            html_url: "https://github.com/cloud-architect/serverless-api",
            description: "A serverless API gateway built with AWS Lambda & API Gateway.",
            stargazers_count: 98,
            forks_count: 31,
            language: "Go",
            open_issues_count: 2,
            visibility: "public",
            updated_at: "2024-02-16T16:10:20Z",
        },
    ];


    return (
        <div className="space-y-6 p-6">
            {loading ? (
                <p>Loading repositories...</p>
            ) : mockRepos.length === 0 ? (
                <div className="flex flex-col items-center space-y-4 p-6 bg-gray-100 rounded-lg shadow">
                    <p className="text-lg text-gray-600">You haven&apos;t added any repositories.</p>
                    <button
                        onClick={handleConnectRepoClick}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
                    >
                        Connect a Repository
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockRepos.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                    ))}
                </div>
            )}

            {/* Modal for Connecting Repositories */}
            {isModalOpen && (
                <AddRepoModal onClose={() => setIsModalOpen(false)} gitRepos={gitRepos} />
            )}
        </div>
    );
}
