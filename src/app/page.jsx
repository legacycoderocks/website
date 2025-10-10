import { getEpisodes, getEpisodesForPage, getPageNumbers } from '@/api/episodes'
import { EpisodeList } from '@/components/EpisodeList'

export const metadata = {
  title: 'Legacy Code Rocks - Explore the world of modernizing existing software applications',
  description: 'Explore the world of modernizing existing software applications',
}

export default async function Home() {
  const episodes = await getEpisodes()
  const pageOneEpisodes = getEpisodesForPage(episodes, 1)
  const allPageNumbers = getPageNumbers(episodes)

  return (
    <EpisodeList
      currentPage={1}
      episodesForCurrentPage={pageOneEpisodes}
      allPageNumbers={allPageNumbers}
    />
  )
}
