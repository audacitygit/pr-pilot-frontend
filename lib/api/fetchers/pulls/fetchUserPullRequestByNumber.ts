import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchPullRequestByNumber = async (repo: string, pullNumber: number) => {
    const response = await PRPilotApiClient.get(`/github/pulls/${repo}/${pullNumber}`);
    return response.data;
};
