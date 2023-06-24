/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
      center: true,
    },

    extend: {
      colors: {
        primary: '#153CF5',
        secondary: '#0423B2',
      },
    },
  },
  plugins: [require("daisyui")],
}

