import { fetchUserCategorizedPullRequests } from "@/lib/api/fetchers/pulls/fetchUserCategorizedPullRequests";
import useSWR from "swr";


export default function useFetchUserCategorizedPulls() {
    const { data, error } = useSWR("/github/pulls/user/categorized", fetchUserCategorizedPullRequests);

    return {
        pulls: data,
        loading: !data && !error,
        error,
    };
}
