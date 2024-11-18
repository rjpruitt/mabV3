import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#016369',
          light: '#0A8B93',
        },
        'accent': '#CD8062',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        'playfair': ['var(--font-playfair-display)'],
        'playfair-sc': ['var(--font-playfair-display-sc)'],
        'pt-serif': ['var(--font-pt-serif)'],
        'dm-sans': ['var(--font-dm-sans)'],
      },
    },
  },
  plugins: [],
};

export default config;
