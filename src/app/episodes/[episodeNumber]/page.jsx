import { useMemo } from 'react'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { getEpisodes } from '@/api/episodes'

export async function generateStaticParams() {
  const episodes = await getEpisodes()
  return episodes.map(({ number }) => ({
    episodeNumber: number.toString(),
  }))
}

export async function generateMetadata({ params }) {
  const episodes = await getEpisodes()
  const episode = episodes.find(({ number }) => number.toString() === params.episodeNumber)

  if (!episode) {
    return {
      title: 'Episode Not Found - Legacy Code Rocks',
    }
  }

  return {
    title: `${episode.title} - Legacy Code Rocks`,
    description: episode.description,
  }
}

export default async function Episode({ params }) {
  const episodes = await getEpisodes()
  const episode = episodes.find(({ number }) => number.toString() === params.episodeNumber)

  if (!episode) {
    notFound()
  }

  const date = new Date(episode.published)

  return (
    <article className="py-16 lg:py-36">
      <Container>
        <header className="flex flex-col">
          <div className="flex items-center gap-6">
            <EpisodePlayButton episode={episode} size="large" />
            <div className="flex flex-col">
              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                {episode.title}
              </h1>
              <FormattedDate
                date={date}
                className="order-first font-mono text-sm leading-7 text-slate-500"
              />
            </div>
          </div>
          <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
            {episode.description}
          </p>
        </header>
        <hr className="my-12 border-gray-200" />
        <div
          className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: episode.content }}
        />
      </Container>
    </article>
  )
}
