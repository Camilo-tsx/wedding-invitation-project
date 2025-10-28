import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["var(--font-lora)", "serif"],
        parisienne: ["var(--font-parisienne)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
