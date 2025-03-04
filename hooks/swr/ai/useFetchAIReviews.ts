import useSWR from "swr";
import { fetchAIReviews } from "@/lib/api/fetchers/ai/fetchAIReviews";

export default function useFetchAIReviews(repo?: string, prNumber?: string) {
    const shouldFetch = !!repo && !!prNumber; // ✅ Prevents unnecessary API calls

    const { data, error } = useSWR(
        shouldFetch ? { repo, prNumber } : null, // ✅ Passes an object to match the fetcher's expected input
        fetchAIReviews
    );

    return {
        aiReviews: data ?? [],
        loading: !data && !error,
        error,
    };
}
