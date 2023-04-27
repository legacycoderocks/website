import Head from 'next/head'

import { getEpisodes, getEpisodesForPage, getPageNumbers } from '@/api/episodes'
import { EpisodeList } from '@/components/EpisodeList'

export default function Home({ pageOneEpisodes, allPageNumbers }) {
  return (
    <>
      <Head>
        <title>
          Legacy Code Rocks - Explore the world of modernizing existing software applications
        </title>
        <meta
          name="description"
          content="Explore the world of modernizing existing software applications"
        />
      </Head>
      <EpisodeList currentPage={1} episodesForCurrentPage={pageOneEpisodes} allPageNumbers={allPageNumbers} />
    </>
  )
}

export async function getStaticProps() {
  const episodes = await getEpisodes()
  const pageOneEpisodes = getEpisodesForPage(episodes, 1)
  const allPageNumbers = getPageNumbers(episodes)
  return {
    props: {
      pageOneEpisodes,
      allPageNumbers
    },
  }
}
