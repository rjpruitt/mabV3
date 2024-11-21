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
        'dancing': ['var(--font-dancing-script)'],
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
        fadeInUp: 'fadeInUp 0.5s ease-out',
        fadeInStagger: 'fadeIn 0.5s ease-out var(--stagger)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
