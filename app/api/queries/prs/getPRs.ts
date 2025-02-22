"use server"
import githubApi from "../../axios/githubApi";

export const getPullRequests = async (username) => {
    //TODO: Add more robust error handling
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        return { notFound: true, data: [] };
    }

    console.log({ username })

    try {
        const { data } = await githubApi.get(`/repos/${username}/pr-pilot-frontend/pulls?state=all`);

        return { data }
    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return { data: [] }
    }
};