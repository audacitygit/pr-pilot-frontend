"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GitHubButton() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <button className="w-full p-3 border border-gray-300 rounded bg-gray-200 cursor-not-allowed">Loading...</button>;
    }

    if (session) {
        return (
            <button
                onClick={() => router.push("/dashboard")}
                className="w-full flex items-center justify-center p-3 border border-gray-300 rounded hover:bg-gray-100 mt-6"
            >
                You are already signed in. Go to dashboard
            </button>
        );
    }

    return (
        <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center p-3 border border-gray-300 rounded hover:bg-gray-100 mt-6"
        >
            Sign in with GitHub
        </button>
    );
}
