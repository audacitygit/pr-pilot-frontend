import { useQuery } from "@tanstack/react-query";
import githubApi from "../../axios/githubApi";

const fetchPRs = async () => {
    const { data } = await githubApi.get("/repos/audacitygit/pr-pilot/pulls?state=all");
    return data;
};

export const usePRs = () => {
    return useQuery({
        queryKey: ["pullRequests"],
        queryFn: fetchPRs,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
