import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-6">
      {/* Logo */}
      <Image src="/logo.png" alt="PR Pilot Logo" width={120} height={120} className="mb-6" />

      {/* Hero Section */}
      <h1 className="text-5xl font-bold text-gray-900">Manage Your Pull Requests with AI</h1>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl">
        PR Pilot helps you track, review, and optimize your GitHub pull requests effortlessly.
      </p>

      {/* Call to Action */}
      <div className="mt-6 flex space-x-4">
        <Link href="/auth/signin" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition">
          Get Started Free
        </Link>
        <Link href="/pricing" className="px-6 py-3 border border-gray-600 rounded-lg text-lg font-semibold text-gray-800 shadow-md hover:bg-gray-200 transition">
          View Pricing
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="p-6 bg-white shadow-lg rounded-lg border">
          <h3 className="text-2xl font-semibold text-gray-900">Track Pull Requests</h3>
          <p className="text-gray-700 mt-2">View and manage PRs across all your repositories with ease.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg border">
          <h3 className="text-2xl font-semibold text-gray-900">AI Code Reviews</h3>
          <p className="text-gray-700 mt-2">Get AI-generated feedback to improve your code quality.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg border">
          <h3 className="text-2xl font-semibold text-gray-900">Webhooks & Automation</h3>
          <p className="text-gray-700 mt-2">Automatically receive PR updates and trigger AI reviews.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-600 text-sm">
        © 2025 PR Pilot. All rights reserved.
      </footer>
    </div>
  );
}
