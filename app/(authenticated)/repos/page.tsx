"use client";

import { useState } from "react";
import RepoCard from "@/components/Cards/RepoCard";
import AddRepoModal from "@/components/Modals/AddRepoModal";
import useFetchUserRepos from "@/hooks/swr/repos/queries/useFetchUserRepos";

export default function Repos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { repos, loading, error } = useFetchUserRepos()

    const handleConnectRepoClick = async () => {
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6 p-6">
            {error && (
                <div>error loading repos</div>
            )}
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
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition min-h-44"
                    >
                        Connect a Repository
                    </button>
                </div>
            )}

            {/* Modal for Connecting Repositories */}
            {isModalOpen && (
                <AddRepoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userRepos={repos} />
            )}
        </div>
    );
}
