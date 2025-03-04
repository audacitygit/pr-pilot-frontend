import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

interface TriggerAIReviewRequest {
    repo: string;
    prNumber: string;
}

export const fetchAIReviews = async ({ repo, prNumber }: TriggerAIReviewRequest) => {
    console.log("PASSED TO FETCHER", { repo, prNumber })
    const response = await PRPilotApiClient.get(`/ai/reviews/${repo}/${prNumber}`);
    return response.data;
};
