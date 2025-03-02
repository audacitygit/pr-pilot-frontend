import { useAddUserRepos } from "@/hooks/swr/repos/mutations/useAddUserRepos";
import useFetchUserGitRepos from "@/hooks/swr/repos/queries/useFetchUserGitRepos";
import { useState } from "react";
import Modal from "./Modal";


export default function AddRepoModal({ isOpen, onClose, userRepos }) {
    const [selectedRepos, setSelectedRepos] = useState([]);
    const { repos, loading: reposLoading, error: reposError } = useFetchUserGitRepos();
    const { addRepos, loading: addRepoLoading, error: addRepoError, successMessage } = useAddUserRepos();

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

    const handleAddRepos = () => {
        addRepos(selectedRepos);
    };

    // Get available repos that haven't been selected
    const availableRepos = repos.filter((repo) => ![...selectedRepos, ...userRepos].some((r) => r.id === repo.id));

    return (
        <Modal
            successMessage={successMessage}
            isOpen={isOpen}
            onClose={onClose}
            title="Select Repositories"
            loading={reposLoading || addRepoLoading}
            loadingMessage={reposLoading ? "Fetching repositories..." : "Adding repositories..."}
            error={reposError?.message || addRepoError?.message}
            actionLabel="Add Repositories"
            onAction={handleAddRepos}
            isActionDisabled={selectedRepos.length === 0 || addRepoLoading}
        >
            {/* Dropdown for selecting repositories */}
            <select
                onChange={(e) => {
                    const repo = availableRepos.find((r) => r.id === Number(e.target.value));
                    if (repo) handleSelectRepo(repo);
                }}
                className="w-full p-2 pr-6 border border-gray-300 rounded-md mb-4 appearance-none bg-white"
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
        </Modal>
    );
}
