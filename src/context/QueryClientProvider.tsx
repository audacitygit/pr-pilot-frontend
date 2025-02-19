import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // ✅ Data remains fresh for 5 minutes
            gcTime: 1000 * 60 * 10, // ✅ Garbage collection (replacement for cacheTime)
            refetchOnWindowFocus: false, // ✅ Prevents unnecessary refetching
        },
    },
});

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
