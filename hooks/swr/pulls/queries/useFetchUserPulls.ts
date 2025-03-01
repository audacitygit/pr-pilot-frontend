import { fetchUserPullRequests } from "@/lib/api/fetchers/pulls/fetchUserPullRequests";
import useSWR from "swr";


export default function useFetchUserPulls() {
    const { data, error } = useSWR("/github/pulls/user/repos/:id", fetchUserPullRequests);
    console.log("DATA IN HOOK", data)
    return {
        pulls: data?.pullRequests || [],
        loading: !data && !error,
        error,
    };
}


