import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchPullRequestByNumber = async (repo: string, pullNumber: string) => {
    console.log("in fetcher", { repo, pullNumber })
    const response = await PRPilotApiClient.get(`/github/pulls/user/${repo}/${pullNumber}`);
    return response.data;
};
