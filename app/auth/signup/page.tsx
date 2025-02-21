"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignupPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"; // Redirect to dashboard after login

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to PR Pilot</h1>
            <p className="text-gray-600 mt-2">Sign up or sign in with GitHub to continue.</p>

            <button
                onClick={() => signIn("github", { callbackUrl })}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
            >
                Sign in with GitHub
            </button>
        </div>
    );
}
