import prPilotApi from "../instances/prpilotApi";


// ✅ Fetch repositories from PR Pilot API by GitHub ID
export async function fetchReposById(session) {
    const githubId = session.githubId;
    console.log("fetch", { githubId, session })
    try {
        const response = await prPilotApi.get(`/repos/${githubId}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error fetching repos:", error);
        throw new Error("Failed to fetch repositories from PR Pilot API");
    }
}
