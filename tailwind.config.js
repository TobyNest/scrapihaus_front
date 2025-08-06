import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cinzaEscuro: '#303030',
        cinzaClaro: '#F2F2F2',
        cinzaBordas: '#EAEAEA'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'nata-sans': ['"Nata Sans"', 'sans-serif'],
        comfortaa: ['Comfortaa', 'cursive'],
        fredoka: ['Fredoka', 'cursive']
      },
      keyframes: {
        wave: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '15%': {
            transform: 'rotate(14deg)'
          },
          '30%': {
            transform: 'rotate(-8deg)'
          },
          '40%': {
            transform: 'rotate(14deg)'
          },
          '50%': {
            transform: 'rotate(-4deg)'
          },
          '60%': {
            transform: 'rotate(10deg)'
          },
          '70%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          },
        }
      },
      animation: {
        wave: 'wave 1.2s ease-in-out'
      }
    }
  },
  plugins: []
}
