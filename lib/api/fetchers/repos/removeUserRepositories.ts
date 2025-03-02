
import { RemoveRepositoryResponse } from "@/types/repository";
import PRPilotApiClientClient from "../../clients/PRPilotApiClient";

/**
 * API function to remove a repository for a user.
 * @param {string} repoId - The repository ID to remove.
 * @returns {Promise<RemoveRepositoryResponse>} - API response.
 */
export const removeUserRepository = async (repoId: string): Promise<RemoveRepositoryResponse> => {
    try {
        const response = await PRPilotApiClientClient.delete<RemoveRepositoryResponse>(`/repos/user/remove/${repoId}`);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("[removeUserRepository] API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Failed to remove repository.");
    }
};
