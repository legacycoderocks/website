import { PatronTier } from './PatronTier'
import { ProseContainer } from './ProseContainer'

export default {
  title: 'Components/PatronTier',
  component: PatronTier,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ProseContainer>
        <Story />
      </ProseContainer>
    ),
  ],
}

const sampleTier = {
  title: 'Gold Supporters',
  amount_cents: 2500,
  patrons: [
    { id: '1', full_name: 'John Doe' },
    { id: '2', full_name: 'Jane Smith' },
    { id: '3', full_name: 'Bob Johnson' },
  ],
}

export const Default = {
  args: {
    tier: sampleTier,
  },
}

export const SinglePatron = {
  args: {
    tier: {
      title: 'Silver Supporters',
      amount_cents: 1000,
      patrons: [
        { id: '1', full_name: 'Alice Williams' },
      ],
    },
  },
}

export const ManyPatrons = {
  args: {
    tier: {
      title: 'Bronze Supporters',
      amount_cents: 500,
      patrons: Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 1}`,
        full_name: `Patron ${i + 1}`,
      })),
    },
  },
}

export const HighTier = {
  args: {
    tier: {
      title: 'Platinum Supporters',
      amount_cents: 10000,
      patrons: [
        { id: '1', full_name: 'VIP Sponsor' },
      ],
    },
  },
}