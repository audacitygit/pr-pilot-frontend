import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

// ✅ Fetch repositories from PR Pilot API
export async function getReposFromPRPilot(githubId) {

    try {
        const { data } = await PRPilotApiClient.get(`/repos/${githubId}`);

        return data
    } catch (error) {
        console.error("Error fetching repos:", error);
        throw new Error("Error fetching repositories from PR Pilot API");
    }
}
