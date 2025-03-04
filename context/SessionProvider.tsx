"use client";

import PRPilotApiClientClient from "@/lib/api/clients/PRPilotApiClient";
import { createContext, useContext, useEffect, useState } from "react";


const SessionContext = createContext(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [userSession, setUserSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data } = await PRPilotApiClientClient.get("/auth/github/session");
                setUserSession(data);
            } catch (err) {
                console.error("Failed to fetch session:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={{ userSession, loading, error }}>
            {children}
        </SessionContext.Provider>
    );
};

// ✅ Custom Hook to Access Session from Context
export const useSessionContext = () => {
    return useContext(SessionContext);
};
