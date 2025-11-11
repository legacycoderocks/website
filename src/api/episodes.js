import Parser from 'rss-parser'
import { stripHtml } from 'string-strip-html'
import truncate from 'truncate-sentences'

const EPISODES_PER_PAGE = 10

export async function getEpisodes(feedUrl = 'https://feeds.libsyn.com/82186/rss') {
  const parser = new Parser({
    customFields: {
      item: [
        ['content:encoded', 'contentEncoded'],
        ['description', 'description']
      ]
    }
  })
  let feed = await parser.parseURL(feedUrl)

  return feed.items.map(
    (item, index) => {
      const number = feed.items.length - index
      const description = stripHtml(item.description || '').result
      const cleanedDescription = truncate(description, 200);
      const content = item.contentEncoded || ''
      const cleanedContent = content
        .replace(cleanedDescription, '')
        .replace(/<p( dir="ltr")?>\W+<\/p>/m, '');
      return {
        id: item.guid ?? null,
        number,
        title: `${number}: ${item.title}`,
        published: new Date(item.pubDate).getTime(),
        description: cleanedDescription,
        audio: {
          src: item.enclosure?.url,
          type: item.enclosure?.type,
        },
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
