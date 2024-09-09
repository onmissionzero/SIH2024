/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f2f2f2',
        'secondary': '#0d0d0d',
      },
      fontFamily:{
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}