import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import Modal from "../Modals/Modal";
import { useRemoveUserRepo } from "@/hooks/swr/repos/mutations/useRemoveUserRepos";

interface RepoCardProps {
    repo: {
        _id: string;
        id: string;
        name: string;
        owner: { login: string; avatar_url: string; html_url: string };
        html_url: string;
        description?: string;
        stargazers_count: number;
        forks_count: number;
        language?: string;
        open_issues_count: number;
        visibility: string;
        updated_at: string;
    };
}

export default function RepoCard({ repo }: RepoCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { removeRepo, loading, successMessage, error } = useRemoveUserRepo();

    return (
        <>
            {/* Repo Card */}
            <div className="relative p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col space-y-3">
                {/* ❌ Remove Repo Button (Top Right) */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition"
                >
                    <X size={20} />
                </button>

                {/* Repo Header */}
                <Link href={`/repos/${repo.id}`} className="flex items-center space-x-3">
                    <Image unoptimized={true}
                        src={repo.owner.avatar_url}
                        alt="Owner Avatar"
                        width={40}
                        height={40}
                        className="rounded-full border"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{repo.name}</h3>
                        <p className="text-sm text-blue-600 hover:underline">@{repo.owner.login}</p>
                    </div>
                </Link>

                {/* Repo Description */}
                <p className="text-gray-600 text-sm line-clamp-2">
                    {repo.description || "No description available."}
                </p>

                {/* Repo Metadata */}
                <div className="flex justify-between text-sm text-gray-500">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    {repo.language && <span>💻 {repo.language}</span>}
                    <span>🟢 {repo.open_issues_count} PR open</span>
                </div>

                {/* Repo Footer */}
                <div className="flex justify-between items-center">
                    <span
                        className={`text-xs font-semibold ${repo.visibility === "public" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {repo.visibility.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* ✅ Confirmation Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Remove Repository"
                loading={loading}
                loadingMessage="Removing Repository..."
                error={error}
                successMessage={successMessage} // ✅ Pass the success message to modal
                actionLabel="Remove"
                onAction={async () => {
                    await removeRepo(repo._id);
                    setIsModalOpen(false);
                }}
            >
                <p className="text-gray-700 text-left">
                    Are you sure you want to disconnect <strong>{repo.name}</strong>? This will <strong>NOT</strong> delete the repo from GitHub.
                </p>
            </Modal>
        </>
    );
}
