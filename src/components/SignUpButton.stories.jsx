import { SignUpButton } from './SignUpButton'

export default {
  title: 'Components/SignUpButton',
  component: SignUpButton,
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'The URL the button links to',
    },
    children: {
      control: 'text',
      description: 'The button text',
    },
  },
}

export const Default = {
  args: {
    href: 'https://www.patreon.com/legacycode',
    children: 'Become a Supporter',
  },
}

export const ShortText = {
  args: {
    href: '#',
    children: 'Join',
  },
}

export const LongText = {
  args: {
    href: '#',
    children: 'Become a Patron and Support the Show',
  },
}