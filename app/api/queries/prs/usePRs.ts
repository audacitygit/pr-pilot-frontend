import useSWR, { mutate } from "swr";
import githubApi from "../../axios/githubApi";

const PRS_KEY = "/repos/audacitygit/pr-pilot/pulls?state=all"; // Store the key

const fetchPRs = async () => {
    const { data } = await githubApi.get(PRS_KEY);
    return data;
};


export const usePRs = () => {
    const { data, error, isLoading } = useSWR(PRS_KEY, fetchPRs, {
        // refreshInterval: 10000,
        revalidateOnFocus: true,
    });

    return {
        pullRequests: data,
        isLoading,
        isError: error,
        refresh: async () => {
            await mutate(PRS_KEY, fetchPRs, { revalidate: true });
        },
    };
};
