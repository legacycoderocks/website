import { FormattedDate } from './FormattedDate'

export default {
  title: 'Components/FormattedDate',
  component: FormattedDate,
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'date',
      description: 'The date to format (ISO 8601 string or Date object)',
    },
    format: {
      control: 'text',
      description: 'Date format string (defaults to "MMMM d, yyyy")',
    },
  },
}

export const Default = {
  args: {
    date: new Date('2023-04-15T12:00:00Z'),
  },
}
