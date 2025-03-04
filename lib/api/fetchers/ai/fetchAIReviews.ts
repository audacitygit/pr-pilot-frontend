import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

interface TriggerAIReviewRequest {
    repo: string;
    prNumber: string;
}

export const fetchAIReviews = async ({ repo, prNumber }: TriggerAIReviewRequest) => {
    const response = await PRPilotApiClient.get(`/ai/reviews/${repo}/${prNumber}`);
    return response.data;
};
