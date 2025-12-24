/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1a1a',
          card: '#2a2a2a',
          cardHover: '#333333',
          border: '#404040',
          text: '#e0e0e0',
          textSecondary: '#a0a0a0',
        },
        accent: {
          blue: '#4a9eff',
          purple: '#8b5cf6',
          green: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

