import { XMLParser } from 'fast-xml-parser'
import { stripHtml } from 'string-strip-html'
import truncate from 'truncate-sentences'

const EPISODES_PER_PAGE = 10

export async function getEpisodes(feedUrl = 'https://feeds.libsyn.com/82186/rss') {
  // Fetch the RSS feed XML
  const response = await fetch(feedUrl)
  const xmlText = await response.text()

  // Parse XML to JavaScript object
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    // Preserve text content when there are attributes
    textNodeName: '#text'
  })
  const parsed = parser.parse(xmlText)

  // Extract items from the RSS feed structure
  const items = parsed.rss?.channel?.item || []

  return items.map(
    (item, index) => {
      const number = items.length - index
      const description = stripHtml(item.description || '').result
      const cleanedDescription = truncate(description, 200);
      const content = item['content:encoded'] || ''
      const cleanedContent = content
        .replace(cleanedDescription, '')
        .replace(/<p( dir="ltr")?>\W+<\/p>/m, '');
      // Extract guid - it might be a string or an object with #text
      const guid = typeof item.guid === 'string'
        ? item.guid
        : item.guid?.['#text'] ?? null;

      return {
        id: guid,
        number,
        title: `${number}: ${item.title}`,
        published: new Date(item.pubDate).getTime(),
        description: cleanedDescription,
        audio: {
          src: item.enclosure?.['@_url'],
          type: item.enclosure?.['@_type'],
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
