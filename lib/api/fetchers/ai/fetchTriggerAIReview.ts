import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

interface TriggerAIReviewRequest {
    repo: string;
    prNumber: number;
}

export const fetchTriggerAIReview = async ({ repo, prNumber }: TriggerAIReviewRequest) => {
    const response = await PRPilotApiClient.post("/ai/analyze", { repo, prNumber });
    return response.data;
};
