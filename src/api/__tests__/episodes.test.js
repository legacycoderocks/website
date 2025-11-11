import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import nock from 'nock'
import { getEpisodes } from '../episodes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('getEpisodes', () => {
  let fixtureXml

  beforeEach(() => {
    // Read the fixture file
    const fixturePath = join(__dirname, 'fixtures', 'libsyn-feed.xml')
    fixtureXml = readFileSync(fixturePath, 'utf-8')

    // Mock the HTTP request to return our fixture
    nock('https://feeds.libsyn.com')
      .get('/82186/rss')
      .reply(200, fixtureXml, {
        'Content-Type': 'application/rss+xml'
      })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should parse RSS feed and return episodes with expected structure', async () => {
    const episodes = await getEpisodes()

    expect(episodes).toMatchSnapshot()
  })
})
