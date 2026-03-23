/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        weirdserif: ['var(--font-weird-serif)', 'Georgia', 'Times New Roman', 'serif'],
        neue: ['var(--font-neue-haas)', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};