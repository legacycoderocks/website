import { parse } from 'rss-to-json'
import { stripHtml } from 'string-strip-html'
import truncate from 'truncate-sentences'

const EPISODES_PER_PAGE = 10

export async function getEpisodes() {
  let feed = await parse('https://feeds.libsyn.com/82186/rss')

  return feed.items.map(
    ({ id, title, description, enclosures, published, content }, index) => {
      const number = feed.items.length - index
      const cleanedDescription = truncate(stripHtml(description).result, 200);
      const cleanedContent = content
        .replace(cleanedDescription, '')
        .replace(/<p( dir="ltr")?>\W+<\/p>/m, '');
      return {
        id: id ?? null,
        number,
        title: `${number}: ${title}`,
        published,
        description: cleanedDescription,
        audio: enclosures.map((enclosure) => ({
          src: enclosure.url,
          type: enclosure.type,
        }))[0],
        content: cleanedContent,
      }
    }
  )
}

export function getPageNumbers(episodes) {
  return Array.from(
    { length: episodes.length / EPISODES_PER_PAGE },
    (_, index) => index + 1
  )
}

export function isValidPageNumber(episodes, pageNumber) {
  return getPageNumbers(episodes).includes(pageNumber)
}

export function getEpisodesForPage(episodes, pageNumber) {
  return episodes.slice((pageNumber - 1) * EPISODES_PER_PAGE, pageNumber * EPISODES_PER_PAGE)
}
