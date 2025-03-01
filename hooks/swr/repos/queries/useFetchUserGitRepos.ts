import useSWR from "swr";
import { fetchUserGitRepos } from "@/lib/api/fetchers/repos/fetchUserGitRepos";

export default function useFetchUserGitRepos() {
    const { data, error } = useSWR("/github/user/repos", fetchUserGitRepos);
    console.log("data in git hook", data)
    return {
        repos: data ?? [],
        loading: !data && !error,
        error,
    };
}
