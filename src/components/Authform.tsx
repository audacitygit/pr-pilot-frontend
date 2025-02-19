import { useState } from "react";

const AuthForm = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert(`${isSignup ? "Signup" : "Login"} successful!`);
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-900">
                {isSignup ? "Create an Account" : "Welcome Back!"}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
                {isSignup
                    ? "Start managing your PRs with AI-powered reviews."
                    : "Sign in to continue reviewing PRs."}
            </p>

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded text-gray-700 focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded text-gray-700 focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 rounded font-semibold transition ${loading ? "bg-gray-400 text-white" : "bg-black text-white hover:bg-gray-900"
                        }`}
                >
                    {loading ? "Processing..." : isSignup ? "Sign Up" : "Login Now"}
                </button>
            </form>

            {/* Google Login & Forgot Password */}
            <div className="flex flex-col items-center mt-4 space-y-2">
                <button className="w-full flex items-center justify-center p-2 border border-gray-300 rounded hover:bg-gray-100">
                    <img src="/google_icon.svg" alt="Google" className="w-5 h-5 mr-2" />
                    Login with Google
                </button>
                {!isSignup && (
                    <a href="/forgot-password" className="text-sm text-gray-500 hover:underline">
                        Forgot password? <span className="text-blue-500 font-semibold">Click here</span>
                    </a>
                )}
            </div>

            {/* Toggle between Signup & Login */}
            <p className="text-sm text-gray-600 text-center mt-6">
                {isSignup ? "Already have an account?" : "Need an account?"}{" "}
                <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-blue-500 font-semibold hover:underline"
                >
                    {isSignup ? "Sign In" : "Sign Up"}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
