


import { fetchTriggerAIReview } from "@/lib/api/fetchers/ai/fetchTriggerAiReview";
import useSWRMutation from "swr/mutation";


export default function useTriggerAIReview() {
    const { trigger, data, error, isMutating } = useSWRMutation(
        "/ai/analyze",
        (_, { arg }: { arg: { repo: string; prNumber: number } }) => fetchTriggerAIReview(arg)
    );

    return {
        triggerAIReview: (repo: string, prNumber: number) => trigger({ repo, prNumber }), // ✅ Fix: Pass argument correctly
        isLoading: isMutating,
        data,
        error,
    };
}
