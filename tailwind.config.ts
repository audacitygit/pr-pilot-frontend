import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class", // ✅ Ensures dark mode works by adding `dark` class manually
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
