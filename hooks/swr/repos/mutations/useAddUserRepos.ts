import { addUserRepositories } from "@/lib/api/fetchers/repos/addUserRepositories";
import { Repository } from "@/types/repository";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr"; // ✅ Import mutate to invalidate cache

/**
 * SWR mutation hook for adding repositories.
 */
export const useAddUserRepos = () => {
    const { trigger, isMutating, error, data } = useSWRMutation("/repos/user/add", addUserRepositories);

    return {
        addRepos: async (repositories: Repository[]) => {
            await trigger(repositories); // ✅ Execute API request
            mutate("/api/github/repos/user"); // ✅ Invalidate and refetch repositories
        },
        loading: isMutating,
        successMessage: data?.message || null,
        error,
    };
};
