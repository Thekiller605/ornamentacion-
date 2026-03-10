/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        metal: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
        },
        fire: {
          500: '#f97316',
          600: '#ea580c',
        },
        gold: {
          500: '#eab308',
        }
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      }
    },
  },
  plugins: [],
}
