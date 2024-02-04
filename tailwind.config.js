/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        beach: "url('./src/assets/sea-background.png')",
      },
    },
  },
  plugins: [require('daisyui')],
}
