import Link from "next/link";

const pricingTiers = [
    {
        title: "Free",
        price: "$0/month",
        description: "Perfect for individuals getting started.",
        features: [
            "1 repository",
            "Manage 20 recent pull requests",
            "1 AI review per day",
            "500-character AI response",
        ],
        cta: "Try It Free",
        highlight: false,
    },
    {
        title: "Basic",
        price: "$3/month",
        description: "For small teams that need more control.",
        features: [
            "Up to 5 repositories",
            "Manage 100 recent PRs per repo",
            "1 AI review per day",
            "1000-token AI response",
        ],
        cta: "Start Basic",
        highlight: false,
    },
    {
        title: "Pro",
        price: "$20/month",
        description: "Best for professionals & growing teams.",
        features: [
            "Unlimited repositories",
            "Unlimited pull requests managed",
            "Unlimited AI reviews",
            "Standard technical support"
        ],
        cta: "Get Pro",
        highlight: true, // Highlighted Plan
    },
    {
        title: "Enterprise",
        price: "Custom Pricing",
        description: "For large organizations with advanced needs.",
        features: [
            "Multiple users and roles",
            "Advanced AI code reviews",
            "Custom integration & support",
            "24/7 Technical support"
        ],
        cta: "Let's Talk",
        highlight: false,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10">
            {/* Header */}
            <h1 className="text-4xl font-extrabold text-gray-900">Choose Your Plan</h1>
            <p className="text-lg text-gray-600 mt-2">Find the plan that fits your needs.</p>

            {/* Pricing Cards */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
                {pricingTiers.map((tier, index) => (
                    <div
                        key={index}
                        className={`p-6 border rounded-lg shadow-lg h-full flex flex-col justify-between ${tier.highlight ? "bg-green-100 border-green-500" : "bg-white"
                            }`}
                    >
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">{tier.title}</h2>
                            <p className="text-xl text-gray-700 font-bold mt-2">{tier.price}</p>
                            <p className="text-sm text-gray-600 mt-2">{tier.description}</p>

                            {/* Features List */}
                            <ul className="mt-4 text-gray-600 text-sm space-y-2">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        ✅ <span className="ml-2">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Button (Ensures All Buttons Align) */}
                        <div className="mt-auto">
                            <Link
                                href="/signup"
                                className={`block text-center mt-6 px-6 py-3 rounded-lg font-semibold ${tier.highlight
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Back to Home */}
            <Link href="/" className="mt-10 text-blue-600 underline">
                ← Back to Home
            </Link>
        </div>
    );
}
