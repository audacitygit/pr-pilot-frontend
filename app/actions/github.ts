"use server"

import githubApi from "../api/axios/githubApi"

export async function getUserRepos(username: string) {
    const { data } = await githubApi.get(`/users/${username}/repos`)
    return data
}