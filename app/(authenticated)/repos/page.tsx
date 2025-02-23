"use client";

import { useEffect, useState } from "react";
import { useGithubSession } from "@/hooks/sessionHooks/useGithubUserSession";

import { fetchGithubUserRepos } from "@/app/api/actions/github";
import { getReposFromPRPilot } from "@/app/api/actions/getReposFromPRPilot";
import RepoCard from "@/components/Cards/RepoCard";
import AddRepoModal from "@/components/Modals/AddRepoModal";

export default function Repos() {

    const [repos, setRepos] = useState([]);
    const [gitRepos, setGitRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { session } = useGithubSession()

    useEffect(() => {
        const getRepos = async () => {
            setLoading(true)
            if (session) {
                const data = await getReposFromPRPilot(session)
                console.log({ data })
                setRepos(data.repositories)
            }
            setLoading(false)
        }
        getRepos()
    }, [session])

    const handleConnectRepoClick = async () => {
        setIsModalOpen(true);
        const data = await fetchGithubUserRepos(session.username)
        setGitRepos(data)
    };

    return (
        <div className="space-y-6 p-6">
            {loading ? (
                <p>Loading repositories...</p>
            ) : repos?.length === 0 ? (
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
                    {repos?.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                    ))}
                    <button
                        onClick={handleConnectRepoClick}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
                    >
                        Connect a Repository
                    </button>
                </div>
            )}

            {/* Modal for Connecting Repositories */}
            {isModalOpen && (
                <AddRepoModal onClose={() => setIsModalOpen(false)} gitRepos={gitRepos} userRepos={repos} />
            )}
        </div>
    );
}
