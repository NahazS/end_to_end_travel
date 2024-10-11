/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    screens: {
      'ml': '400px',
      // => @media (min-width: 640px) { ... }

      'md': '480px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1300px',
      // => @media (min-width: 1280px) { ... }
      'xl' : '1280px'
    },
    extend: {
      fontFamily:{
        raleway:['Raleway', 'sans-serif'],
      },
      colors: {
        'base-white': 'var(--base-white, #FFF)', // Custom color variable
      },
    },
  },
  plugins: [],
}
