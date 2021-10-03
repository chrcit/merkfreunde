module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        heroBlue: "#d0e5f7"
      }
    },
  },
  variants: {
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
