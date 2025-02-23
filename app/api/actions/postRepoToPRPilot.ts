import prPilotApi from "@/lib/api/prpilotApi";

// ✅ Uses `prPilotApi` instead of creating a new Axios instance
export async function postReposToPRPilot(repositories, session) {
    console.log({ session })
    //TODO: is org likely isn't controlled by github, orgs are registered on the backend. Will have to play around with this
    const isOrg = false
    const orgId = session?.org?.name || null
    const githubId = session.githubId
    console.log(githubId, orgId)
    try {
        const response = await prPilotApi.post("/user-repos", { repositories, githubId, orgId, isOrg });
        console.log({ response })
        return response.data;
    } catch (error) {
        console.error("Error posting repos:", error);
        throw new Error("Error posting repositories to PR Pilot API");
    }
}
