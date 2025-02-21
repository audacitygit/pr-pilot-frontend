"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { icons, Loader2 } from "lucide-react"; // ✅ Import Lucide Icons

export default function GitHubButton() {
    const { data: session } = useSession();
    const callbackUrl = "/dashboard"
    const router = useRouter();
    const [loading, setLoading] = useState(false); // ✅ State for loading

    const handleSignIn = async () => {
        setLoading(true); // ✅ Set loading state
        try {
            await signIn("github", { callbackUrl });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            setLoading(false)
            throw new Error(e.message)
        }
    };

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
            disabled={loading} // ✅ Disable button while loading
            className={`flex items-center justify-center p-4 text-white font-semibold text-lg rounded-lg shadow-md transition mt-6 ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
                }`}
        >
            {loading ? (
                <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" /> {/* ✅ Animated Spinner */}
                    Loading...
                </>
            ) : (
                <>
                    <icons.Github className="w-6 h-6 mr-2" />
                    Sign in with GitHub
                </>
            )}
        </button>
    );
}
