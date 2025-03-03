"use client";

import { useRouter } from "next/navigation";
import { icons, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import PRPilotApiClient from "@/lib/api/clients/PRPilotApiClient";

export default function GitHubButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [session, setSession] = useState(null)

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data } = await PRPilotApiClient.get("/auth/github/status");

                setSession(data.activeSession);
            } catch (err) {
                console.error("Failed to fetch session:", err);

            } finally {
                console.log("done with fetch session")
            }
        };
        fetchSession();
    }, []);

    const handleSignIn = async () => {
        setLoading(true)
        window.location.href = process.env.NEXT_PUBLIC_API_REDIRECT_URL
    };

    if (loading) {
        return (
            <button
                disabled
                className="flex items-center justify-center p-4 bg-blue-400 text-white font-semibold text-lg rounded-lg shadow-md cursor-not-allowed transition mt-6"
            >
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                Loading...
            </button>
        );
    }

    if (session) {
        return (
            <button
                onClick={() => router.push("/dashboard")}
                className="flex flex-col items-center justify-center p-4 bg-black text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-800 transition mt-6"
            >
                <p>You are already signed in</p>
                <icons.Github className="w-6 h-6 mt-1" />
                <p>Go to Dashboard</p>
            </button>
        );
    }

    return (
        <button
            onClick={handleSignIn}
            className="flex items-center justify-center p-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-500 transition mt-6"
        >
            <icons.Github className="w-6 h-6 mr-2" />
            Sign in with GitHub
        </button>
    );
}
