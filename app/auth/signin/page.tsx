"use client";

import GitHubButton from "@/components/Buttons/GitHubButton";
import { Suspense } from "react";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-gray-900">
            {/* Title */}
            <h1 className="text-5xl font-extrabold tracking-wide text-black">
                Welcome to <span className="text-blue-600">PR Pilot</span>
            </h1>
            <p className="text-gray-700 mt-3 text-lg font-medium">
                Sign up or sign in with GitHub to continue.
            </p>

            {/* GitHub Button */}
            <Suspense>
                <GitHubButton />
            </Suspense>
        </div>
    );
}
