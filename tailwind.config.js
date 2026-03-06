/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jo: {
          pink: '#ed3b87',
          pinkHover: '#d32e73',
          dark: '#0f172a', // Un negro con un levísimo tono azul/pizarra, más elegante que el negro puro
          surface: '#f8fafc',
          border: '#e2e8f0',
          textMuted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}