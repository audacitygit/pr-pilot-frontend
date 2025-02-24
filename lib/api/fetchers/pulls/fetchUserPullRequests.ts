import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchUserPullRequests = async () => {
    const response = await PRPilotApiClient.get("/github/pulls/user");
    return response.data;
};
