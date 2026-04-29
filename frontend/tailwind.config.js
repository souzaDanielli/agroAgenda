/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-brown': '#4A3F35',
        'agro-bege': '#EDE0D4',
        'agro-sand': '#D6CCC2',
        'agro-wine': '#7F5539',
        'agro-gray': '#6C757D',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'agro': '8px',
      }
    },
  },
  plugins: [],
}
