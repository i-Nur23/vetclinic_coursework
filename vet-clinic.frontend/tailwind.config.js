/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        russo : ['Russo One', 'sans-serif'],
        rus: ['Ruslan Display', 'cursive'],
        serif : ['Roboto Slab', 'serif']
      },
    },
  },
  plugins: [],
}
