// Mock implementation for Storybook
const samplePatrons = [
  {
    title: 'Sustainer',
    amount_cents: 500,
    patrons: [
      { id: '1', full_name: 'Daniel', patron_status: 'active_patron' },
      { id: '2', full_name: 'Edwin Kortman', patron_status: 'active_patron' },
      { id: '3', full_name: 'Peter M Clausen', patron_status: 'active_patron' },
      { id: '4', full_name: 'Richard Giraud', patron_status: 'active_patron' },
      { id: '5', full_name: 'Ryan B Harvey', patron_status: 'active_patron' },
      { id: '6', full_name: 'Subhrajyoti Sen', patron_status: 'active_patron' },
    ],
  },
  {
    title: 'Maintainer',
    amount_cents: 2500,
    patrons: [],
  },
  {
    title: 'Mender',
    amount_cents: 5000,
    patrons: [],
  },
]

export async function getPatronsByTier() {
  return samplePatrons
}

export async function getPatrons() {
  const allPatrons = samplePatrons.flatMap(tier =>
    tier.patrons.map(patron => [
      patron.id,
      {
        full_name: patron.full_name,
        patron_status: patron.patron_status,
        tiers: [tier.title]
      }
    ])
  )
  return new Map(allPatrons)
}

export async function getMembershipLevels() {
  const levels = samplePatrons.map((tier, index) => [
    `tier-${index}`,
    { title: tier.title, amount_cents: tier.amount_cents }
  ])
  return new Map(levels)
}