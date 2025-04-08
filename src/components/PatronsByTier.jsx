import { PatronTier } from '@/components/PatronTier';

export function PatronsByTier({ patrons }) {
  return (<>
    {patrons.map((tier) => (<PatronTier key={tier.title} tier={tier} />))}
  </>)
}
