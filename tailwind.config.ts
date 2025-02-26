/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ Enables dark mode styling
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neon: "0px 0px 12px rgba(0, 255, 255, 0.6)", // ✅ Custom shadow for a neon glow
      },
      colors: {
        neonBlue: "#00ffff",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};
