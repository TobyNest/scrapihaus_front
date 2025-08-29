/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  darkMode: 'class', // ✅ tem que ficar aqui, não dentro de theme

  theme: {
    extend: {
      // FONT
      fontSize: {
        'very-small': '12px', // Para o estilo "Very Small"
        small: '14px', // Para "Small" e "Small Extra Light"
        base: '16px', // Para "Base" e "Base Light"
        'medium-title-small': '18px', // Para "Medium Title Small"
        'medium-title': '20px', // Para "Medium Title"
        'big-title': '24px', // Para "Big Title"
        'really-big-title': '48px' // Para "Really Big Title"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'nata-sans': ['"Nata Sans"', 'sans-serif'],
        comfortaa: ['Comfortaa', 'cursive'],
        fredoka: ['Fredoka', 'cursive']
      },
      fontWeight: {
        extralight: '200',
        light: '300',
        regular: '400',
        bold: '700'
      },

      // COLORS via CSS vars
      colors: {
        bg: {
          dark: 'hsl(var(--bg-dark) / <alpha-value>)',
          DEFAULT: 'hsl(var(--bg) / <alpha-value>)',
          light: 'hsl(var(--bg-light) / <alpha-value>)',
          60: 'hsl(var(--bg-60))'
        },
        text: {
          DEFAULT: 'hsl(var(--text) / <alpha-value>)',
          muted: 'hsl(var(--text-muted) / <alpha-value>)'
        },
        border: {
          DEFAULT: 'hsl(var(--border) / <alpha-value>)',
          muted: 'hsl(var(--border-muted) / <alpha-value>)'
        },
        highlight: 'hsl(var(--highlight) / <alpha-value>)',
        danger: 'hsl(var(--danger) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        success: 'hsl(var(--success) / <alpha-value>)',
        info: 'hsl(var(--info) / <alpha-value>)',
        table: {
          light: 'hsl(var(--table-light) / <alpha-value>)'
        }
      },

      // OTHERS
      boxShadow: {
        sombraPadrao: '0 0 30px 0 rgba(0, 0, 0, 0.2)'
      },

      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(14deg)' },
          '30%': { transform: 'rotate(-8deg)' },
          '40%': { transform: 'rotate(14deg)' },
          '50%': { transform: 'rotate(-4deg)' },
          '60%': { transform: 'rotate(10deg)' },
          '70%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      },
      animation: {
        wave: 'wave 1.2s ease-in-out'
      }
    }
  },

  plugins: []
}
