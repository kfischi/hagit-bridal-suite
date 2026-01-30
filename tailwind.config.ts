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
        ivory: 'rgb(var(--color-ivory) / <alpha-value>)',
        blush: 'rgb(var(--color-blush) / <alpha-value>)',
        rose: 'rgb(var(--color-rose) / <alpha-value>)',
        champagne: 'rgb(var(--color-champagne) / <alpha-value>)',
        taupe: 'rgb(var(--color-taupe) / <alpha-value>)',
        charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
      },
      fontFamily: {
        crimson: ['var(--font-crimson)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
