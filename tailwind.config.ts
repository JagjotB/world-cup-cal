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
        skysoft: "#cce7f6",
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        gold: "var(--gold)",
        "gold-foreground": "#111827",
        cyan: "var(--cyan)",
        "muted-foreground": "var(--muted)",
        "host-red": "var(--host-red)",
        "host-green": "var(--host-green)",
        "host-blue": "var(--host-blue)"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 32, 28, 0.12)",
        glow: "var(--shadow-glow)",
        card: "var(--shadow-card)"
      }
    }
  },
  plugins: []
};

export default config;
