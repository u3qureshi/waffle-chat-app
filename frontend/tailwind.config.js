import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#efebe9',
          200: '#d7ccc8',
          300: '#bcaaa4',
          400: '#a1887f',
          500: '#8d6e63',
          600: '#795548',
          700: '#6d4c41',
          800: '#5d4037',
          900: '#4e342e',
        },
        dijon: {
          100: '#fdf3c4',
          200: '#fbe99e',
          300: '#f8df78',
          400: '#f5d652',
          500: '#f2cc2c', // dijon-like mustard yellow
          600: '#caa726',
          700: '#a2821f',
          800: '#7a5e18',
          900: '#523910',
        },
        'light-yellow': '#FFF9DB',
        'dijon-yellow': '#C49102', // Dijon mustard yellow
        'mustard-yellow': '#E1AD01', // Another nice mustard variant
        // Optional: override or add to default yellow
        yellow: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
    },
  },
  plugins: [daisyui],
};
