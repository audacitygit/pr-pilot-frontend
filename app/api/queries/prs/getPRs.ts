import githubApi from "../../axios/githubApi";

export const getPullRequests = async () => {
    //TODO: Add more robust error handling
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        return { notFound: true, data: [] };
    }

    try {
        const { data } = await githubApi.get("/repos/audacitygit/pr-pilot/pulls?state=all");

        return { data }
    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return { data: [] }
    }
};