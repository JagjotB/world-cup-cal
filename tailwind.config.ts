import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201c",
        pitch: "#146b4a",
        lime: "#d7f24f",
        clay: "#cb6f4d",
        skysoft: "#cce7f6"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 32, 28, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
