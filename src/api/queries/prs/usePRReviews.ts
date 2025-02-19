import { useQuery } from "@tanstack/react-query";
import githubApi from "../../axios/githubApi";

export const fetchReviews = async (prNumber: string | number) => {
    const { data } = await githubApi.get(`/repos/audacitygit/pr-pilot/pulls/${prNumber}/reviews`);
    return data;
};

export const usePRReviews = (prNumber: string | number) => {
    return useQuery({
        queryKey: ["pullRequestReviews", prNumber],
        queryFn: () => fetchReviews(prNumber),
        enabled: !!prNumber, // Only run when prNumber is provided
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
