import { useQuery } from "@tanstack/react-query";
import githubApi from "../../axios/githubApi";

export const fetchPRByNumber = async (prNumber: string | number) => {
    const { data } = await githubApi.get(`/repos/audacitygit/pr-pilot/pulls/${prNumber}`);
    return data;
};

export const usePRByNumber = (prNumber: string | number) => {
    return useQuery({
        queryKey: ["pullRequest", prNumber],
        queryFn: () => fetchPRByNumber(prNumber),
        enabled: !!prNumber, // Only run when prNumber is provided
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
