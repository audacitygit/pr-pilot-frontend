"use client"; // Mark this file as a Client Component

import { SWRConfig } from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function SWRProvider({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher,
                dedupingInterval: 5000, // Avoid duplicate requests in a short time
                revalidateOnFocus: false, // Disable revalidation when window gains focus
            }}
        >
            {children}
        </SWRConfig>
    );
}
