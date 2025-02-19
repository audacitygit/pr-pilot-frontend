import { pullRequest } from "../types/pr";


export function categorizePRs(prs: pullRequest[]) {
    return {
        open: prs.filter(pr => pr.state === "open"),
        closed: prs.filter(pr => pr.state === "closed" && !pr.merged_at),
        merged: prs.filter(pr => pr.merged_at !== null),
    };
}
