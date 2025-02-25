"use client"
import { useParams } from "next/navigation";

export default function SingleRepoPullrequestSlugPage() {
    const { slug: repoId } = useParams()
    return <div>viewing repo with id: {repoId}</div>
}