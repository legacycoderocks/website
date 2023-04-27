import Head from 'next/head'
import { ProseContainer } from '@/components/ProseContainer'
import { getEpisodes } from '@/api/episodes'

export default function About({episodeCount}) {
  return (
    <>
      <Head>
        <title>
          About - Legacy Code Rocks - Explore the world of modernizing existing software applications
        </title>
        <meta
          name="description"
          content="Explore the world of modernizing existing software applications"
        />
      </Head>
      <ProseContainer>
        <h2>About the Podcast</h2>
        <p>
          The Legacy Code Rocks podcast was created in 2016 in hopes that we
          could change the way developers and others engage with and talk
          about software systems that they inherit by others. Founders{' '} 
          <a href="https://andreagoulet.com/">Andrea Goulet</a> and{' '}
          <a href="https://linkedin.com/in/mscottford">M. Scott Ford</a>{' '}
          thought that they would make an attempt by having great conversations 
          with others who are also passionate about maintaining software.
        </p>
        <p>
          So often, people use <em>legacy code</em> as a pejorative term. The
          kind of thing that you never want to be accused of building, the
          kind of project that no one wants to touch, the kind of codebase
          that devs are eager to rewrite from scratch. This is the kind of
          mentality that this show is out to shift.
        </p>
        <p>
          Most episodes are less than 1 hour long. We&apos;ve 
          published {episodeCount} episodes so far, and we still have a lot more
          that we&apos;d like to explore and say.
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
