/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        'accent': 'var(--color-accent)',
      },
      fontFamily: {
        'montserrat': ['var(--font-montserrat)'],
        'pt-serif': ['var(--font-pt-serif)'],
        'dancing': ['var(--font-dancing-script)'],
        'playfair': ['var(--font-playfair-display-sc)'],
        'logo': ['var(--font-playfair-display-sc)', 'serif'],
      },
    },
  },
  plugins: [],
} 