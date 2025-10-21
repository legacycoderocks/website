// Mock implementation for Storybook
import { getEpisodeData } from './mockDataManager'

export async function getEpisodes() {
  return getEpisodeData()
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