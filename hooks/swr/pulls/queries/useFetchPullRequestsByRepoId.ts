import { fetchPullRequestsByRepoId } from "@/lib/api/fetchers/pulls/fetchPullRequestsByRepoId"
import useSWR from "swr"

export const useFetchPullRequestByRepoId = (repo: string) => {
    const { data, error } = useSWR(`github/repos/user/pulls/${repo}`, () => fetchPullRequestsByRepoId(repo))
    console.log("DATA IN HOOK", data)
    return {
        pulls: data?.pullRequests || [],
        loading: !data && !error,
        error
    }
}