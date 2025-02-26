"use client"

import { SWRConfig } from "swr";
import axios from "axios";

const fetcher = (url: string) =>
    axios.get(url, { withCredentials: true }) // ✅ Ensures cookies are included
        .then((res) => res.data);

export default function SWRProvider({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher,
                dedupingInterval: 5000,
                revalidateOnFocus: false,
            }}
        >
            {children}
        </SWRConfig>
    );
}
