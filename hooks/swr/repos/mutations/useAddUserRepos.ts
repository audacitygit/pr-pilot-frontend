import { addUserRepositories } from "@/lib/api/fetchers/repos/addUserRepositories";
import { Repository } from "@/types/repository";
import useSWRMutation from "swr/mutation";

/**
 * SWR mutation hook for adding repositories.
 */
export const useAddUserRepos = () => {
    const { trigger, isMutating, error, data } = useSWRMutation("/repos/user/add", addUserRepositories);

    return {
        addRepos: (repositories: Repository[]) => trigger(repositories),
        loading: isMutating,
        successMessage: data?.message || null,
        error
    };
};