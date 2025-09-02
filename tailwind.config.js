/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // Adjust according to your project
  ],
  theme: {
    extend: {
      colors: {
        customGray: "#3b3a3c",
      },
      fontFamily: {   
        sans: [
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          '"Lucida Grande"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
