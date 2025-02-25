"use client"

import DiffViewer from "@/components/viewers/DiffViewer"
import useFetchPullByNumber from "@/hooks/swr/pulls/queries/useFetchUserPullByNumber"
import { useParams } from "next/navigation"


export default function RepoByIdPullByIdPage() {
    const { repoId, pullNumber } = useParams()
    console.log({ repoId, pullNumber })
    const { diff, pullRequest, loading, error } = useFetchPullByNumber(repoId as string, pullNumber as string)
    return (
        <div>
            {!loading && (
                <DiffViewer diff={diff} />

            )}
        </div>
    )
}


