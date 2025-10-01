import { CardWithHeader } from '@/components/CardWithHeader';
import { SignUpButton } from '@/components/SignUpButton';

export function PatronTier({ tier }) {
  const { title, amount_cents, patrons } = tier;

  return (<>
    <CardWithHeader title={`${title} - $${amount_cents / 100} USD per month`}>
      <ul>
        {patrons.map((member) => (
          <li key={member.id}>
            {member.full_name}
          </li>
        ))}
      </ul>
      <div>
        <SignUpButton href="https://www.patreon.com/legacycoderocks">Add your name here!</SignUpButton>
      </div>
    </CardWithHeader>
  </>)
}
