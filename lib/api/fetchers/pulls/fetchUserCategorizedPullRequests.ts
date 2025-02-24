import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchUserCategorizedPullRequests = async () => {
    const response = await PRPilotApiClient.get("/github/pulls/user/categorized");
    return response.data;
};