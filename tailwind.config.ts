import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          300: '#ffdcf6',
          400: '#e45eb0',
        }
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
