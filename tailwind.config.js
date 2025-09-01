/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // Adjust based on your directory structure
  ],
  theme: {
    extend: {
      colors: {
        customGray: "#3b3a3c",
      },
    },
  },
  plugins: [],
};
