import PRPilotApiClientClient from "../../clients/PRPilotApiClient"

export const fetchPullRequestsByRepoId = async (repo: string) => {
    const { data } = await PRPilotApiClientClient.get(`github/repos/user/pulls/${repo}`)
    console.log("DATA IN FETCHER", data)
    return data
}