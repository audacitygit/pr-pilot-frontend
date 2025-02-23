"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useGithubSession } from "@/hooks/sessionHooks/useGithubUserSession"; // ✅ Called once inside provider

const SessionContext = createContext(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const { session } = useGithubSession(); // ✅ Fetch session only once
    const [userSession, setUserSession] = useState(session);

    useEffect(() => {
        setUserSession(session); // ✅ Store session in state for global use
    }, [session]);

    return <SessionContext.Provider value={userSession}>{children}</SessionContext.Provider>;
};

// ✅ Custom Hook to Access Session from Context
export const useSessionContext = () => {
    return useContext(SessionContext);
};
