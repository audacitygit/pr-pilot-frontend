import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export const fetchUserGitRepos = async () => {
    const { data } = await PRPilotApiClient.get("github/user/repos");
    console.log("DATA IN FETCHER", data)
    return data.repos
};
