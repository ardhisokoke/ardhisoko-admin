import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#F5921E",
          dark: "#D97A10",
        },
        green: {
          DEFAULT: "#2E7D1F",
          dark: "#1E5A12",
        },
        black: "#1A1A1A",
        danger: "#E53935",
        success: "#43A047",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        opensans: ["var(--font-opensans)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: ["@tailwindcss/line-clamp"],
};
export default config;
