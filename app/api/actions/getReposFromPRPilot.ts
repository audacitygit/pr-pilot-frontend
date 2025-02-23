import prPilotApi from "@/lib/api/prpilotApi";

// ✅ Fetch repositories from PR Pilot API
export async function getReposFromPRPilot(session) {
    const githubId = session.githubId;
    try {
        const response = await prPilotApi.get(`/repos/${githubId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching repos:", error);
        throw new Error("Error fetching repositories from PR Pilot API");
    }
}
