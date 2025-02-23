"use server";

import githubApi from "../../../lib/api/githubApi";

// ✅ Server-side function to fetch user repositories
export async function fetchGithubUserRepos(username: string) {
    if (!username) return [];

    const token = `Bearer ${process.env.GITHUB_TOKEN}`
    console.log({ token })

    try {
        const { data } = await githubApi.get(`/users/${username}/repos`, {
            headers: {
                Authorization: token, // ✅ Secure server-side env variable
            },
        });


        return data // Returns GitHub repositories
    } catch (error) {
        console.error("Error fetching GitHub user repos:", error);
        return [];
    }
}
