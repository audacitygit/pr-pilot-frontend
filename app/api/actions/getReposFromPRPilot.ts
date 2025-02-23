import prPilotApi from "@/lib/api/instances/prpilotApi";

// ✅ Fetch repositories from PR Pilot API
export async function getReposFromPRPilot(session) {
    const githubId = session.githubId;
    try {
        const { data } = await prPilotApi.get(`/repos/${githubId}`);

        return data
    } catch (error) {
        console.error("Error fetching repos:", error);
        throw new Error("Error fetching repositories from PR Pilot API");
    }
}
