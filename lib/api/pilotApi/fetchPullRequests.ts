import prPilotApi from "../instances/prpilotApi";

// ✅ Fetch pull requests for multiple repositories from backend
export async function fetchPullRequests(repoIds: string[], page = 1, perPage = 10) {
    console.log({ repoIds })
    try {
        const response = await prPilotApi.get("/pulls", {
            params: { repoIds, page, per_page: perPage },
        });
        return response.data.pullRequests; // Returns array of PRs
    } catch (error) {
        console.error("Error fetching pull requests:", error);
        throw new Error("Failed to fetch pull requests");
    }
}
