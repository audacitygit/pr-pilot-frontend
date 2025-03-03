import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchUserRepos = async () => {
    const response = await PRPilotApiClient.get("/repos/user");
    return response.data.repositories;
};
