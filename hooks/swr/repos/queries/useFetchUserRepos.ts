import useSWR from "swr";
import { fetchUserRepos } from "@/lib/api/fetchers/repos/fetchUserRepos";

export default function useFetchUserRepos() {
    const { data, error } = useSWR("/api/github/repos/user", fetchUserRepos);
    return {
        repos: data ?? [],
        loading: !data && !error,
        error,
    };
}
