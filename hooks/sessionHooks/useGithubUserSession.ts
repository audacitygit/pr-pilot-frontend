import useSWR from "swr";
import axios from "axios";
import { Session } from "@/types/session"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const fetchSession = async (): Promise<Session | null> => {
    const res = await axios.get(`${API_BASE_URL}/api/auth/github/session`, {
        withCredentials: true,
    });
    return res.data.user;
};

export function useGithubSession() {
    const { data: session, error } = useSWR("/api/auth/github/session", fetchSession);

    return { session, error, isLoading: !session && !error };
}
