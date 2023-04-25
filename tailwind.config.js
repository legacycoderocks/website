const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        18: '4.5rem',
        112: '28rem',
        120: '30rem',
      },
      colors: {
        'brand-yellow': {
          '50': '#fffdf7',
          '100': '#fffcee',
          '200': '#fff7d6',
          '300': '#fff2bd',
          '400': '#ffe88b',
          '500': '#ffde59',
          '600': '#e6c850',
          '700': '#bfa743',
          '800': '#998535',
          '900': '#7d6d2c'
        },
        'brand-red': {
          '50': '#f9f5f4',
          '100': '#f4eae9',
          '200': '#e3cbc7',
          '300': '#d1aca5',
          '400': '#af6d62',
          '500': '#8d2f1f',
          '600': '#7f2a1c',
          '700': '#6a2317',
          '800': '#551c13',
          '900': '#45170f'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
