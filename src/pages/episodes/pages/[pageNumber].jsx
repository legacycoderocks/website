import Head from 'next/head'

import { getEpisodes, getEpisodesForPage, getPageNumbers, isValidPageNumber } from '@/api/episodes'
import { EpisodeList } from '@/components/EpisodeList'

export default function PageNumber({ pageNumber, episodesForCurrentPage, allPageNumbers }) {
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
      <EpisodeList currentPage={pageNumber} episodesForCurrentPage={episodesForCurrentPage} allPageNumbers={allPageNumbers} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const episodes = await getEpisodes()
  const pageNumber = Number(params.pageNumber)
  const episodesForCurrentPage = getEpisodesForPage(episodes, pageNumber)
  const allPageNumbers = getPageNumbers(episodes)

  if (!isValidPageNumber(episodes, pageNumber)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pageNumber,
      episodesForCurrentPage,
      allPageNumbers 
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const episodes = await getEpisodes()
  const pageNumbers = getPageNumbers(episodes)

  return {
    paths: pageNumbers.map(pageNumber => ({
      params: {
        pageNumber: pageNumber.toString()
      }
    })),
    fallback: 'blocking'
  }
}

