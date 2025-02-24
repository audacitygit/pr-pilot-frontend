import { fetchUserPullRequests } from "@/lib/api/fetchers/pulls/fetchUserPullRequests";
import useSWR from "swr";


export default function useFetchUserPulls() {
    const { data, error } = useSWR("/github/pulls/user", fetchUserPullRequests);

    return {
        pulls: data?.pullRequests || [],
        loading: !data && !error,
        error,
    };
}
