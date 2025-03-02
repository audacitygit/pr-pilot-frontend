import { useAddUserRepos } from "@/hooks/swr/repos/mutations/useAddUserRepos";
import useFetchUserGitRepos from "@/hooks/swr/repos/queries/useFetchUserGitRepos";
import { useState } from "react";

export default function AddRepoModal({ onClose, userRepos }) {
    const [selectedRepos, setSelectedRepos] = useState([]);
    const { repos, loading: reposLoading, error: reposError } = useFetchUserGitRepos();
    const { addRepos, loading: addRepoLoading, error: addRepoError } = useAddUserRepos();

    // Handle repository selection
    const handleSelectRepo = (repo) => {
        if (!selectedRepos.find((r) => r.id === repo.id)) {
            setSelectedRepos([...selectedRepos, repo]);
        }
    };

    // Remove a repo from selection
    const handleRemoveRepo = (repoId) => {
        setSelectedRepos(selectedRepos.filter((repo) => repo.id !== repoId));
    };

    const handleAddRepos = async () => {
        addRepos(selectedRepos);
    };

    // Get available repos that haven't been selected
    const availableRepos = repos.filter((repo) => ![...selectedRepos, ...userRepos].some((r) => r.id === repo.id));

    // Determine loading message
    const loadingMessage = reposLoading ? "Fetching repositories..." : addRepoLoading ? "Adding repositories..." : "";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* Loading Overlay */}
            {(reposLoading || addRepoLoading) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
                        <p className="text-lg font-semibold">{loadingMessage}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Error Overlay */}
            {(reposError || addRepoError) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold text-red-500">An error occurred</p>
                        <p className="text-sm text-gray-700">{reposError?.message || addRepoError?.message}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Content (Only Show If Not Loading/Error) */}
            {(!reposLoading && !addRepoLoading && !reposError && !addRepoError) && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                    <h2 className="text-xl font-bold mb-4">Select Repositories</h2>

                    {/* Dropdown for selecting repositories */}
                    <select
                        onChange={(e) => {
                            const repo = availableRepos.find((r) => r.id === Number(e.target.value));
                            if (repo) handleSelectRepo(repo);
                        }}
                        className="w-full p-2 pr-6 border border-gray-300 rounded-md mb-4 appearance-none bg-white"
                        style={{ paddingRight: "1.75rem" }}
                    >
                        <option className="text-center" value="">-- Select a Repository --</option>
                        {availableRepos.map((repo) => (
                            <option key={repo.id} value={repo.id}>
                                {repo.owner.login} / {repo.name}
                            </option>
                        ))}
                    </select>

                    {/* Selected repositories displayed as badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedRepos.map((repo) => (
                            <span key={repo.id} className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-md text-sm">
                                {repo.owner.login} / {repo.name}
                                <button
                                    className="ml-2 text-red-500 hover:text-red-600 text-xs font-bold"
                                    onClick={() => handleRemoveRepo(repo.id)}
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                            disabled={selectedRepos.length === 0 || addRepoLoading}
                            onClick={handleAddRepos}
                        >
                            {addRepoLoading ? "Adding..." : "Add Repositories"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
