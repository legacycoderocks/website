// Mock implementation for Storybook
import { getPatronData } from './mockDataManager'

export async function getPatronsByTier() {
  return getPatronData()
}

export async function getPatrons() {
  const samplePatrons = getPatronData()
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
  const samplePatrons = getPatronData()
  const levels = samplePatrons.map((tier, index) => [
    `tier-${index}`,
    { title: tier.title, amount_cents: tier.amount_cents }
  ])
  return new Map(levels)
}