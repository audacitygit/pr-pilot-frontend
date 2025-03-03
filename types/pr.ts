export type PullRequest = {
    updated_at: string
    id: string | number,
    age: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    base: any,
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
    number: string
    merged_at: string
}

export type PullRequestInfoCard = { changesRequested: boolean, approved: boolean, state: string }