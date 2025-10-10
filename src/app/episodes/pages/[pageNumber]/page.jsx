import { notFound } from 'next/navigation'
import { getEpisodes, getEpisodesForPage, getPageNumbers, isValidPageNumber } from '@/api/episodes'
import { EpisodeList } from '@/components/EpisodeList'

export const metadata = {
  title: 'Legacy Code Rocks - Explore the world of modernizing existing software applications',
  description: 'Explore the world of modernizing existing software applications',
}

export async function generateStaticParams() {
  const episodes = await getEpisodes()
  const pageNumbers = getPageNumbers(episodes)

  return pageNumbers.map(pageNumber => ({
    pageNumber: pageNumber.toString()
  }))
}

export default async function PageNumber({ params }) {
  const episodes = await getEpisodes()
  const pageNumber = Number(params.pageNumber)
  const episodesForCurrentPage = getEpisodesForPage(episodes, pageNumber)
  const allPageNumbers = getPageNumbers(episodes)

  if (!isValidPageNumber(episodes, pageNumber)) {
    notFound()
  }

  return (
    <EpisodeList
      currentPage={pageNumber}
      episodesForCurrentPage={episodesForCurrentPage}
      allPageNumbers={allPageNumbers}
    />
  )
}
