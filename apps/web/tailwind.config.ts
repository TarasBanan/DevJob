import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        velvet: "#000000",
        showroom: "#ffffff",
        silver: "#999999"
      },
      fontFamily: {
        display: ["'Unbounded'", "ui-sans-serif", "system-ui"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        text: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
