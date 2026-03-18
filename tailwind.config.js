/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        caligari: ['F37 Caligari Trial', 'serif'],
        serif: ['var(--font-weird-serif)'],
        neue: ['var(--font-neue-haas)'],
      },
    },
  },
  plugins: [],
};