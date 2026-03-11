/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jo: {
          pink: '#ed3b87',
          pinkHover: '#d32e73',
          dark: '#0f172a',
          surface: '#f8fafc',
          border: '#e2e8f0',
          textMuted: '#64748b',
          // Dark mode colors
          darkBg: '#0f1419',
          darkSurface: '#1a1d29',
          darkCard: '#1f2937',
          darkBorder: '#2d3748',
          darkText: '#f7fafc',
          darkTextMuted: '#a0aec0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.1)',
        'premium-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        'premium-hover-dark': '0 12px 30px -4px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}