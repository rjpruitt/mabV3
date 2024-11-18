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
          DEFAULT: '#016369', // darker teal for main nav
          light: '#0A8B93',   // lighter teal for top banner
        },
        'accent': '#CD8062', // CTA button color
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        'playfair': ['var(--font-playfair-display)'],
        'playfair-sc': ['var(--font-playfair-display-sc)'],
      },
    },
  },
  plugins: [],
};

export default config;
