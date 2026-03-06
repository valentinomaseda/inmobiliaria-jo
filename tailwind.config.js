/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-pink': {
          500: '#ed3b87',
          600: '#d5357a',
          700: '#bd2f6d',
        },
      },
    },
  },
  plugins: [],
}
