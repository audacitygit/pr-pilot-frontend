import useSWR from "swr";
import { SWR_KEYS } from "@/lib/keys";
import { fetchReposById } from "@/lib/api/pilotApi/fetchReposById";

export default function useFetchReposById(session) {
    console.log("🔥 useFetchReposById Hook Called - session:", session);

    const githubId = session?.githubId;

    console.log("🔥 SWR Key Check:", githubId ? SWR_KEYS.PILOT_API_USER_REPOS(githubId) : "NULL");

    const { data, error, isLoading } = useSWR(
        githubId ? SWR_KEYS.PILOT_API_USER_REPOS(githubId) : null, // ✅ Ensure SWR key is set
        () => {
            console.log("🔥 SWR is calling fetchReposById");
            return fetchReposById(session);
        },
        { revalidateOnFocus: false }
    );

    console.log("🔥 SWR Response - data:", data);
    console.log("🔥 SWR Response - error:", error);
    console.log("🔥 SWR Response - isLoading:", isLoading);

    return { data: data?.repositories || [], error, isLoading };
}
