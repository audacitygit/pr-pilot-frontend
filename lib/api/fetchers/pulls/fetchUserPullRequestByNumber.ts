import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchPullRequestByNumber = async (repo: string, pullNumber: string) => {
    const response = await PRPilotApiClient.get(`/github/pulls/user/${repo}/${pullNumber}`);
    console.log("RESPONSE IN FETCHER", { response })
    return response.data;
};
