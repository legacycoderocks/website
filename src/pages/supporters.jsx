import Head from 'next/head'
import { ProseContainer } from '@/components/ProseContainer'
import { CardWithHeader } from '@/components/CardWithHeader'
import { SignUpButton } from '@/components/SignUpButton'

import { getPatronsByTier } from '@/api/patrons'
import { PatronsByTier } from '@/components/PatronsByTier'

export default function Supporters({ patrons }) {


  return (
    <>
      <Head>
        <title>
          Community - Legacy Code Rocks - Explore the world of modernizing existing software applications
        </title>
        <meta
          name="description"
          content="Explore the world of modernizing existing software applications"
        />
      </Head>
      <ProseContainer>
        <h1>Many Thanks to Our Supporters</h1>
        <p>
          Legacy Code Rocks receives financial support from the wonderful folks
          listed below. We are incredibly grateful for their generosity.
        </p>

        <h2>Supporters by Level</h2>
        <PatronsByTier patrons={patrons} />

        <h2>Join Us</h2>
        <p>
          Want to see your name listed here? You can become a paying member of
          the community by visiting our <a href="https://patreon.com/legacycoderocks">
          Patreon</a> page, and selecting a tier that works best for you.
        </p>
        <p>
          What do get for being a paid member? Beyond helping ensure that 
          there are enough funds to record, host, and edit podcast episodes, 
          while also providing general support for hosting our annual virtual 
          conference, <a href="https://mendercon.com">MenderCon</a>, there are 
          a couple of perks. At the moment, all membership levels get the same 
          benefits.
        </p>
        <p>
          All paying members are displayed on this page. Additionally, a 
          random paying member will be thanked at the end of each episode, 
          and we`&apos;`ll be working through our back catalog to update the 
          past recordings to include shoutouts as well.
        </p>
        <p>
          Each installment of our conference, <a href="https://mendercon.com">
          MenderCon</a>, will include a slide between events that lists the 
          names of paying members.
        </p>
        <p>
          More perks may be added later. We`&apos;`re considering creating a 
          video version of future episodes that will only be available to 
          paying members. If you`&apos;`ve got any perk ideas, please share 
          them in <a href="http://slack.legacycode.rocks">Slack</a>.
        </p>
        <p>
          Everything free to access today will continue to be free. So 
          don`&apos;`t worry about the audio content or access to <a href="http://slack.legacycode.rocks">
          Slack</a> being limited to only paying members. Doing so 
          wouldn`&apos;`t be the best way to support Legacy Code Rocks mission.
        </p>
        <p>
          <SignUpButton href="https://www.patreon.com/legacycoderocks">
            Join Now
          </SignUpButton>
        </p>
      </ProseContainer>
    </>
  )
}

export async function getStaticProps() {
  const patrons = await getPatronsByTier()

  return {
    props: { patrons}
  }
}
