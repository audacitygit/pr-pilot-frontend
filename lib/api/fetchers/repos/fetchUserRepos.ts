import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchUserRepos = async () => {
    const response = await PRPilotApiClient.get("/github/repos/user");
    return response.data.repositories;
};
