import { fetchPullRequestByNumber } from "@/lib/api/fetchers/pulls/fetchUserPullRequestByNumber";
import useSWR from "swr";


export default function useFetchPullByNumber(repo: string, pullNumber: string) {
    const { data, error } = useSWR(
        repo && pullNumber ? `/github/pulls/user/${repo}/${pullNumber}` : null,
        () => fetchPullRequestByNumber(repo, pullNumber)
    );

    console.log("data in fetcher", { data })

    return {
        pullRequest: data?.pullRequest || null,
        diff: data?.diff,
        reviews: data?.reviews,
        loading: !data && !error,
        error,
    };
}
