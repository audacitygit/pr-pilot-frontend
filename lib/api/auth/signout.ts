import PRPilotApiClientClient from "../clients/PRPilotApiClient";

export const signout = async () => {
    const response = await PRPilotApiClientClient.post("/auth/signout");
    return response.data;
};
