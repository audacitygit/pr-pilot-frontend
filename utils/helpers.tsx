import { PullRequest } from "../types/pr";


export function categorizePRs(prs: PullRequest[]) {
    return {
        open: prs.filter(pr => pr.state === "open"),
        closed: prs.filter(pr => pr.state === "closed" && !pr.merged_at),
        merged: prs.filter(pr => pr.merged_at !== null),
    };
}

export const calculatePRInsights = (pullRequests: PullRequest[]) => {
    if (!pullRequests.length) {
        return {
            avgReviewTime: "N/A",
            mostActiveContributor: "N/A",
            mergeRate: "N/A",
        };
    }

    let totalReviewTime = 0;
    let mergedPRs = 0;
    const contributorCount: Record<string, number> = {};

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    pullRequests.forEach((pr) => {
        // Calculate review time (time between PR creation and first review/merge)
        if (pr.created_at && pr.updated_at) {
            const createdAt = new Date(pr.created_at);
            const updatedAt = new Date(pr.updated_at);
            const reviewTimeInDays = (updatedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
            totalReviewTime += reviewTimeInDays;
        }

        // Count merged PRs in the last 30 days
        if (pr.merged_at) {
            const mergedAt = new Date(pr.merged_at);
            if (mergedAt > thirtyDaysAgo) mergedPRs++;
        }

        // Count contributions by user
        if (pr.user?.login) {
            contributorCount[pr.user.login] = (contributorCount[pr.user.login] || 0) + 1;
        }
    });

    const avgReviewTime = totalReviewTime / pullRequests.length;
    const mostActiveContributor = Object.keys(contributorCount).reduce((a, b) =>
        contributorCount[a] > contributorCount[b] ? a : b, Object.keys(contributorCount)[0]
    );

    const mergeRate = ((mergedPRs / pullRequests.length) * 100).toFixed(2);

    return {
        avgReviewTime: `${avgReviewTime.toFixed(1)} days`,
        mostActiveContributor: `@${mostActiveContributor}`,
        mergeRate: `${mergeRate}%`,
    };
};

export const extractOldValue = (diff: string) => {
    return diff
        .split("\n")
        .filter(line => line.startsWith("-") && !line.startsWith("---"))
        .map(line => line.substring(1))
        .join("\n");
};

export const extractNewValue = (diff: string) => {
    return diff
        .split("\n")
        .filter(line => line.startsWith("+") && !line.startsWith("+++"))
        .map(line => line.substring(1))
        .join("\n");
};

export const parseDiffByFile = (diff: string) => {
    const files: Record<string, { oldValue: string[]; newValue: string[] }> = {};
    let currentFile = "";

    diff.split("\n").forEach((line) => {
        // ✅ Detect new file section in diff
        if (line.startsWith("diff --git a/")) {
            currentFile = line.split(" ")[2].replace("a/", ""); // Extract filename
            files[currentFile] = { oldValue: [], newValue: [] };
        } else if (currentFile) {
            // ✅ Categorize lines based on additions/removals
            if (line.startsWith("-") && !line.startsWith("---")) {
                files[currentFile].oldValue.push(line.substring(1));
            } else if (line.startsWith("+") && !line.startsWith("+++")) {
                files[currentFile].newValue.push(line.substring(1));
            }
        }
    });

    return files;
};



// TODO: fix notifications
/* export const extractPRNotifications = (pullRequests: PullRequest[]) => {
    const notifications = [];

    pullRequests.forEach((pr) => {
        const { number, repository, assignees, merged_at, comments_count } = pr;

        // ✅ Assigned to review
        assignees?.forEach((user: any) => {
            notifications.push(`@${user.login} was assigned to review PR #${number}`);
        });

        // ✅ PR merged
        if (merged_at) {
            notifications.push(`PR #${number} was merged in ${repository.name}`);
        }

        // ✅ New comments on PR
        if (comments_count > 0) {
            notifications.push(`New comments on PR #${number} for ${repository.name}`);
        }
    });

    return notifications;
}; */
