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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: '#159C47',
          50: '#E8F7EE',
          100: '#C5EBDA',
          200: '#8DD7B5',
          300: '#55C390',
          400: '#1DAF6B',
          500: '#159C47',
          600: '#117D39',
          700: '#0D5E2B',
          800: '#093E1C',
          900: '#051F0E',
        },
      },
    },
  },
  plugins: [],
};

export default config;