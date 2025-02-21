import Image from "next/image";

interface RepoCardProps {
    repo: {
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
    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col space-y-3">
            {/* Repo Header */}
            <div className="flex items-center space-x-3">
                <Image
                    src={repo.owner.avatar_url}
                    alt="Owner Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border"
                />
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{repo.name}</h3>
                    <a
                        href={repo.owner.html_url}
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        @{repo.owner.login}
                    </a>
                </div>
            </div>

            {/* Repo Description */}
            <p className="text-gray-600 text-sm line-clamp-2">
                {repo.description || "No description available."}
            </p>

            {/* Repo Metadata */}
            <div className="flex justify-between text-sm text-gray-500">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                {repo.language && <span>💻 {repo.language}</span>}
                <span>🛑 {repo.open_issues_count} Issues</span>
            </div>

            {/* Repo Footer */}
            <div className="flex justify-between items-center">
                <span
                    className={`text-xs font-semibold ${repo.visibility === "public" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {repo.visibility.toUpperCase()}
                </span>
                <a
                    href={repo.html_url}
                    target="_blank"
                    className="text-sm text-blue-600 hover:underline"
                >
                    View Repo →
                </a>
            </div>
        </div>
    );
}
