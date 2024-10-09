/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00263e',
          hover: '#da291c',
        },
        blue: {
          600: '#00263e',
          800: '#001a2b',
        },
        red: {
          500: '#da291c',
          600: '#b22318',
        },
      },
    },
  },
  plugins: [],
}