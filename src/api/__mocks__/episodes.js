// Mock implementation for Storybook
const sampleEpisodes = Array.from({ length: 162 }, (_, i) => ({
  id: `${162 - i}`,
  number: 162 - i,
  title: `${162 - i}: Episode Title ${162 - i}`,
  published: new Date(2024, 8, 16 - i).toISOString(),
  description: `This is a sample description for episode ${162 - i}. It contains information about the topics discussed and the guests featured.`,
  audio: {
    src: 'https://example.com/episode.mp3',
    type: 'audio/mpeg',
  },
  content: `<p>This is sample content for episode ${162 - i}.</p>`,
}))

export async function getEpisodes() {
  return sampleEpisodes
}

export function getPageNumbers(episodes) {
  const EPISODES_PER_PAGE = 10
  return Array.from(
    { length: Math.ceil(episodes.length / EPISODES_PER_PAGE) },
    (_, index) => index + 1
  )
}

export function isValidPageNumber(episodes, pageNumber) {
  return getPageNumbers(episodes).includes(pageNumber)
}

export function getEpisodesForPage(episodes, pageNumber) {
  const EPISODES_PER_PAGE = 10
  return episodes.slice((pageNumber - 1) * EPISODES_PER_PAGE, pageNumber * EPISODES_PER_PAGE)
}