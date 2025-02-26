import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchUserRepos = async () => {
    const response = await PRPilotApiClient.get("/repos/user");
    console.log("RESPONSE", response)
    return response.data.repositories;
};
