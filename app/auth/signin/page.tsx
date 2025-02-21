"use client";

import { useTransition } from "react";
import { serverSignIn } from "./actions";

export default function SignInPage() {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-900">Sign In to PR Pilot</h1>
            <p className="text-gray-600 mt-2">Use your GitHub account to continue.</p>

            <button
                onClick={() => startTransition(serverSignIn)}
                disabled={isPending}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition disabled:bg-gray-400"
            >
                {isPending ? "Signing in..." : "Sign in with GitHub"}
            </button>
        </div>
    );
}
