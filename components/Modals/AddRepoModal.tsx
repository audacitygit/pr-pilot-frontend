
import { postReposToPRPilot } from "@/app/api/actions/postRepoToPRPilot";
import { useGithubSession } from "@/hooks/sessionHooks/useGithubUserSession";
import { useState } from "react";

export default function AddRepoModal({ onClose, gitRepos, userRepos }) {
    const [selectedRepos, setSelectedRepos] = useState([]);
    const { session } = useGithubSession()
    console.log({ gitRepos })
    // Handle repository selection
    const handleSelectRepo = (repo) => {
        if (!selectedRepos.find((r) => r.id === repo.id)) {
            setSelectedRepos([...selectedRepos, repo]);
        }
    };

    // Remove a repo from selection and return it to the dropdown
    const handleRemoveRepo = (repoId) => {
        setSelectedRepos(selectedRepos.filter((repo) => repo.id !== repoId));
    };

    const handleAddRepos = async () => {
        const response = await postReposToPRPilot(selectedRepos, session)
        //TODO: toast here, use loading state
        if (response.ok || response) {
            onClose()
        }
    }

    // Get available repos that haven't been selected
    const availableRepos = gitRepos.filter((repo) => ![...selectedRepos, ...userRepos].some((r) => r.id === repo.id));

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Select Repositories</h2>

                {/* Dropdown for selecting repositories */}
                <select
                    onChange={(e) => {
                        const repo = availableRepos.find((r) => r.id === Number(e.target.value));
                        if (repo) handleSelectRepo(repo);
                    }}
                    className="w-full p-2 pr-6 border border-gray-300 rounded-md mb-4 appearance-none bg-white"
                    style={{ paddingRight: "1.75rem" }} // Adds space to the dropdown arrow
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
                        disabled={selectedRepos.length === 0}
                        onClick={handleAddRepos}
                    >
                        Add Repositories
                    </button>
                </div>
            </div>
        </div>
    );
}
