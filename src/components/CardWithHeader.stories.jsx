import { CardWithHeader } from './CardWithHeader'

export default {
  title: 'Components/CardWithHeader',
  component: CardWithHeader,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The card header title',
    },
    children: {
      description: 'The card content',
    },
  },
}

export const Default = {
  args: {
    title: 'Card Title',
    children: (
      <div className="py-4">
        <p className="text-base text-gray-700">
          This is the card content. It can contain any elements.
        </p>
      </div>
    ),
  },
}

export const WithList = {
  args: {
    title: 'Features',
    children: (
      <ul className="py-4 space-y-2">
        <li>Feature one</li>
        <li>Feature two</li>
        <li>Feature three</li>
      </ul>
    ),
  },
}

export const LongTitle = {
  args: {
    title: 'This is a Very Long Card Title That Should Wrap Properly',
    children: (
      <div className="py-4">
        <p className="text-base text-gray-700">Content with a long title.</p>
      </div>
    ),
  },
}