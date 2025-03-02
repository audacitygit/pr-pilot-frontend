import useSWRMutation from "swr/mutation";
import { removeUserRepository } from "@/lib/api/fetchers/repos/removeUserRepositories";
import { mutate } from "swr"; // ✅ Import mutate to invalidate cache

/**
 * SWR mutation hook for removing a repository.
 */
export const useRemoveUserRepo = () => {
    const { trigger, isMutating, error, data } = useSWRMutation(
        "/repos/user/remove",
        (_url, { arg }: { arg: string }) => removeUserRepository(arg)
    );

    return {
        removeRepo: async (repoId: string) => {
            await trigger(repoId);
            mutate("/api/github/repos/user");
        },
        loading: isMutating,
        successMessage: data?.message || null,
        error,
    };
};
