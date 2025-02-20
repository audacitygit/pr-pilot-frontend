"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ Use useEffect to prevent redirecting during render
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Branding & Tagline with Grey Background */}
      <div className="w-1/2 bg-gray-200 flex items-center px-20 py-12">
        <div className="w-full">
          {/* PR Pilot Text with Logo at the End */}
          <div className="flex items-center space-x-3 mb-6">
            <h1 className="text-6xl font-extrabold text-gray-900">
              <span className="text-black">PR </span>
              <span className="text-blue-500">Pilot</span>
            </h1>
            <Image height={20} width={20} src="/logo.png" alt="PR Pilot Logo" className="w-14 h-14 rounded-full" />
          </div>

          {/* Left-Aligned Centered Text */}
          <p className="text-gray-800 text-3xl font-semibold leading-snug max-w-lg">
            AI-powered <span className="text-blue-500">PR management</span> and
            <span className="text-blue-500"> automated code reviews</span>.
          </p>
        </div>

        {/* Copyright Notice */}
        <p className="text-gray-500 text-sm absolute bottom-8 left-8">© 2025 PR Pilot. All rights reserved.</p>
      </div>

      {/* Right Side: GitHub Login */}
      <div className="w-1/2 flex items-center justify-center bg-white p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in to PR Pilot</h2>
          <p className="text-gray-500 text-sm mt-2">Use GitHub to authenticate</p>

          {/* GitHub Sign-In Button */}
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center p-3 border border-gray-300 rounded hover:bg-gray-100 mt-6"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
