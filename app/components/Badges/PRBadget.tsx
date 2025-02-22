import Link from "next/link";

interface PRBadgeProps {
    id: number;
    repo: string;
}

export default function PRBadge({ id, repo }: PRBadgeProps) {
    return (
        <Link
            className="bg-gray-700 text-white px-3 py-1 rounded-md text-xs font-medium w-full text-center truncate cursor-pointer hover:bg-gray-600 hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            href={`/pulls/${id}`}
            passHref
        >
            PR #{id} - {repo.length > 17 ? `${repo.slice(0, 14)}...` : repo}
        </Link>
    );
}
