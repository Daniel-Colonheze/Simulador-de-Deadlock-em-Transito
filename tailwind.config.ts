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
        background: "#0a0e1a",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#008FFB",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#161b2e",
          foreground: "#ffffff",
        },
        accent: {
          north: "#FF4560",
          south: "#00E396",
          east: "#008FFB",
          west: "#FEB019",
        },
        muted: {
          DEFAULT: "#232a40",
          foreground: "#94a3b8",
        },
        card: {
          DEFAULT: "#161b2e",
          foreground: "#ffffff",
        },
        border: "#232a40",
        input: "#232a40",
        ring: "#008FFB",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 143, 251, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 143, 251, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
