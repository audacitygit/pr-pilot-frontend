import useSWR from "swr";
import { SWR_KEYS } from "../../../../lib/keys";
import githubApi from "../../axios/githubApi";

const fetchGithubUserPulls = async (url: string) => {
    const { data } = await githubApi.get(url);
    return data;
};

export function useUserRepoPulls(username: string, repo: string) {
    const shouldFetch = username && repo;

    const { data, error } = useSWR(
        shouldFetch ? SWR_KEYS.GITHUB_USER_REPO_PULLS(username, repo) : null,
        fetchGithubUserPulls
    );

    return { data, error, isLoading: !data && !error };
}
