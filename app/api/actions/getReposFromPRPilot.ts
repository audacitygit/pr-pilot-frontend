import prPilotApi from "@/app/api/axios/prpilotApi";

// ✅ Fetch repositories from PR Pilot API
export async function getReposFromPRPilot(session) {
    console.log({ session });

    const isOrg = false;
    const orgId = session?.org?.id || null
    const githubId = session.githubId;
    console.log("Fetching repos for:", githubId);

    try {
        const response = await prPilotApi.get("/user-repos", {
            params: { orgId, isOrg, githubId },
        });

        console.log({ response });
        return response.data;
    } catch (error) {
        console.error("Error fetching repos:", error);
        throw new Error("Error fetching repositories from PR Pilot API");
    }
}
