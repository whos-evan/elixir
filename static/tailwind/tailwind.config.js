/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'primary': '#0d2c4c',
        'secondary': '#d36135',
        'jet-black': '#0c0c0c',
        'ghost-white': '#f4f4f9'
      }
    },
  },
  plugins: [
  ],
}
