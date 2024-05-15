import Head from 'next/head'
import { ProseContainer } from '@/components/ProseContainer'
import { getEpisodes } from '@/api/episodes'

export default function Pitch({episodeCount}) {
  return (
    <>
      <Head>
        <title>
          Pitch a Guest - Legacy Code Rocks - Explore the world of modernizing existing software applications
        </title>
        <meta
          name="description"
          content="Explore the world of modernizing existing software applications"
        />
      </Head>
      <ProseContainer>
        <h2>Know Someone We Should Talk To?</h2>
        <p>
          We&apos;re always looking for new guests to have no the show. If you 
          know who would be a good fit for the show (even if it&apos;s you.),
          then please fill out <a href="https://9lsmuup7u2y.typeform.com/to/FXr5kFRS">our pitch form</a>.
        </p>
      </ProseContainer>
    </>
  )
}

export async function getStaticProps() {
  const episodes = await getEpisodes()
  return {
    props: {
      episodeCount: episodes.length
    }
  }
}
