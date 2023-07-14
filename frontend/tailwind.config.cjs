/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'snap': ['snap ITC'],
      'berlin': ['berlin sans fb']
    }
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp')
  ],
}