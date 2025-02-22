"use client";

import { useRouter } from "next/navigation";
import { icons, Loader2 } from "lucide-react";
import { useGithubSession } from "@/lib/queries/session/useGithubUserSession"; // ✅ Using our custom hook

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function GitHubButton() {
    const router = useRouter();
    const { session, isLoading } = useGithubSession(); // ✅ Using SWR-based session fetching

    const handleSignIn = () => {
        window.location.href = `${API_BASE_URL}/api/auth/github/login`; // 🔹 Redirects for OAuth login
    };

    if (isLoading) {
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
