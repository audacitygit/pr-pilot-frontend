import useSWR from "swr";
import { fetchUserRepos } from "@/lib/api/fetchers/repos/fetchUserRepos";

export default function useFetchUserRepos() {
    const { data, error } = useSWR("/api/github/repos/user", fetchUserRepos);
    console.log("data in hook", data)
    return {
        repos: data || [],
        loading: !data && !error,
        error,
    };
}
