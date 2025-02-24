import PRBadge from "../Badges/PRBadge";

export default function PRWidgetColumn({ title, prs }) {
    return (
        <div className="flex flex-col flex-1">
            <h3 className="text-md font-semibold text-gray-800 text-center">
                {prs.length > 0 ? `${title}: ${prs.length}` : `No PRs in ${title}`}
            </h3>
            <div className="flex flex-col gap-1 mt-2 bg-gray-100 p-3 rounded-lg h-40">
                {prs.length > 0 ? (
                    <>
                        {prs.slice(0, 4).map((pr) => (
                            <PRBadge id={pr.number} title={pr.title} key={pr.id} />
                        ))}
                        {prs.length > 4 && (
                            <a href="/pulls" className="text-blue-600 font-medium mt-2 text-center block">
                                See {prs.length - 4} more
                            </a>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500 text-center mt-4">No PRs available</p>
                )}
            </div>
        </div>
    );
}