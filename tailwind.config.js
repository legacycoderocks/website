import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
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
          '50': '#faf4f4',
          '100': '#f6e9e9',
          '200': '#e8c7c7',
          '300': '#daa5a5',
          '400': '#be6262',
          '500': '#a21f1f',
          '600': '#921c1c',
          '700': '#7a1717',
          '800': '#611313',
          '900': '#4f0f0f'
        }
      }
    },
  },
  plugins: [
    typography,
    forms,
  ],
}
