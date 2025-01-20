/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary :{
          black : "#000000",
          off_white : "#FDF0EA"
        },
        accent: {
          black: "#1E1E1E"
        }
      },
      fontSize: {
        big : "11vw"
      }
    },
  },
  plugins: [require("@tailwindcss/typography")]
}