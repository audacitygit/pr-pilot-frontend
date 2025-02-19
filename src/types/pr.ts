export type pullRequest = {
    state: string,
    reviewed: boolean,
    title: string,
    created_at: string,
    user: {
        login: string
        avatar_url: string
    }
    closed_at?: string
    number: number
    merged_at: string
}