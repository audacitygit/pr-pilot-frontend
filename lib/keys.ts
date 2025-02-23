export const SWR_KEYS = {
    /*-------------------- GITHUB KEYS---------------------------- */
    GITHUB_USER_REPOS: (username: string) => `/users/${username}/repos`,
    GITHUB_ORG_REPOS: (orgName: string) => `/orgs/${orgName}/repos`,
    GITHUB_USER_REPO_PULLS: (username: string, repo: string) => `/repos/${username}/${repo}/pulls`,
    GITHUB_ORG_REPO_PULLS: (orgName: string, repo: string) => `/repos/${orgName}/${repo}/pulls`,

    /* ----------------------- PilotAPI Keys -------------------- */
    PILOT_API_USER_REPOS: (githubId: string) => `api/repos/${githubId}`,
    PILOT_API_ALL_PULLS: (repoIds: string) => `/api/pulls?repoIds=${repoIds}`,
}