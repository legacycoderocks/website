import { Container } from '@/components/Container'
import { Pagination } from '@/components/Pagination'
import { EpisodeEntry } from '@/components/EpisodeEntry'

export function EpisodeList({ currentPage, episodesForCurrentPage, allPageNumbers }) {
  return (
    <>
      <div className="pb-12 sm:pb-4">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Episodes
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-4 lg:border-t lg:border-slate-100">
          {episodesForCurrentPage.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
        <Pagination allPageNumbers={allPageNumbers} currentPage={currentPage} />
      </div>
    </>
  )
}
