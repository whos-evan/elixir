/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: ['./public/index.html']
  },
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
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
