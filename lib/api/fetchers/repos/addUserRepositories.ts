import { AddRepositoriesResponse, Repository } from "@/types/repository";
import PRPilotApiClientClient from "../../clients/PRPilotApiClient";

/**
 * API function to add repositories for a user.
 * Uses the correct argument format for `useSWRMutation`.
 */
export const addUserRepositories = async (url: string, { arg }: { arg: Repository[] }): Promise<AddRepositoriesResponse> => {
    try {
        const response = await PRPilotApiClientClient.post<AddRepositoriesResponse>(url, { repositories: arg });
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("[addUserRepositories] API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Failed to add repositories.");
    }
};
