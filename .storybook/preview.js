import '../src/styles/tailwind.css'
import 'focus-visible'

// Set up module mocks for API calls
if (typeof jest !== 'undefined') {
  jest.mock('@/api/episodes')
  jest.mock('@/api/patrons')
}

/** @type { import('@storybook/nextjs').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#1a1a1a' },
        "brand-yellow": { name: 'brand-yellow', value: '#ffde59' }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
}

export default preview
