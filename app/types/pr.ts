export type PullRequest = {
    state: string,
    reviewed: boolean,
    title: string,
    created_at: string,
    user: {
        login: string
        avatar_url: string
    }
    html_url: string
    closed_at?: string
    number: number
    merged_at: string
}

export type PullRequestInfoCard = { changesRequested: boolean, approved: boolean, state: string }