import useSWR from "swr";
import githubApi from "../../axios/githubApi";

const fetchReviews = async (prNumber: string | number) => {
    if (!prNumber) return null; // Prevent fetching if prNumber is undefined
    const { data } = await githubApi.get(`/repos/audacitygit/pr-pilot/pulls/${prNumber}/reviews`);
    return data;
};

export const usePRReviews = (prNumber: string | number) => {
    const { data, error, isLoading } = useSWR(
        prNumber ? `/repos/audacitygit/pr-pilot/pulls/${prNumber}/reviews` : null,
        fetchReviews,
        {
            dedupingInterval: 1000 * 60 * 5, // Cache for 5 minutes
            revalidateOnFocus: true, // Auto-refetch when user switches tabs
        }
    );

    return {
        reviews: data,
        isLoading,
        isError: error,
    };
};
