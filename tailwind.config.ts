import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#CAD2C5',
          200: '#84A98C',
          300: '#52796F',
          400: '#354F52',
          500: '#2F3E46',
          600: '#18262e',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
