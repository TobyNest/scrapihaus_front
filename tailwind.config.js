/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cinzaEscuro: '#303030',
        cinzaClaro: '#F2F2F2'
      }
    }
  },
  plugins: []
}
