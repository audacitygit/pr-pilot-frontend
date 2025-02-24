import { fetchPullRequestByNumber } from "@/lib/api/fetchers/pulls/fetchUserPullRequestByNumber";
import useSWR from "swr";


export default function useFetchPullByNumber(repo: string, pullNumber: number) {
    const { data, error } = useSWR(
        repo && pullNumber ? `/api/github/pulls/user/${repo}/${pullNumber}` : null,
        () => fetchPullRequestByNumber(repo, pullNumber)
    );

    return {
        pullRequest: data || null,
        loading: !data && !error,
        error,
    };
}
