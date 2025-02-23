import useSWR from "swr";
import { SWR_KEYS } from "@/lib/keys";
import { fetchPullRequests } from "@/lib/api/pilotApi/fetchPullRequests";

export default function useFetchPullRequests(repoIds: string[], page = 1, perPage = 10) {
    console.log({ repoIds })
    // ✅ Only use repoIds, page, perPage
    const { data: pulls, error, isLoading } = useSWR(
        repoIds.length > 0 ? [SWR_KEYS.PILOT_API_ALL_PULLS(repoIds.join(",")), repoIds, page, perPage] : null,
        () => fetchPullRequests(repoIds, page, perPage),
        { revalidateOnFocus: false }
    );

    return { pulls: pulls || [], loading: isLoading, error };
}
