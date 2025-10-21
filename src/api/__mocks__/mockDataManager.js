// Mock data manager for controlling test scenarios in Storybook
let currentScenario = 'default'

export function setMockScenario(scenario) {
  currentScenario = scenario
}

export function getCurrentScenario() {
  return currentScenario
}

export function resetMockScenario() {
  currentScenario = 'default'
}

// Episode mock data scenarios
export const episodeScenarios = {
  default: Array.from({ length: 162 }, (_, i) => ({
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
  })),

  fewEpisodes: Array.from({ length: 12 }, (_, i) => ({
    id: `${12 - i}`,
    number: 12 - i,
    title: `${12 - i}: Episode Title ${12 - i}`,
    published: new Date(2024, 8, 16 - i).toISOString(),
    description: `This is a sample description for episode ${12 - i}. It contains information about the topics discussed and the guests featured.`,
    audio: {
      src: 'https://example.com/episode.mp3',
      type: 'audio/mpeg',
    },
    content: `<p>This is sample content for episode ${12 - i}.</p>`,
  })),

  singlePage: Array.from({ length: 5 }, (_, i) => ({
    id: `${5 - i}`,
    number: 5 - i,
    title: `${5 - i}: Episode Title ${5 - i}`,
    published: new Date(2024, 8, 16 - i).toISOString(),
    description: `This is a sample description for episode ${5 - i}. It contains information about the topics discussed and the guests featured.`,
    audio: {
      src: 'https://example.com/episode.mp3',
      type: 'audio/mpeg',
    },
    content: `<p>This is sample content for episode ${5 - i}.</p>`,
  })),

  longContent: Array.from({ length: 162 }, (_, i) => ({
    id: `${162 - i}`,
    number: 162 - i,
    title: `${162 - i}: Episode Title ${162 - i}`,
    published: new Date(2024, 8, 16 - i).toISOString(),
    description: `This is a sample description for episode ${162 - i}. It contains information about the topics discussed and the guests featured.`,
    audio: {
      src: 'https://example.com/episode.mp3',
      type: 'audio/mpeg',
    },
    content: `
      <h2>Introduction</h2>
      <p>This is a much longer episode with extensive show notes and detailed information about the topics discussed.</p>

      <h2>Main Topics</h2>
      <p>We covered several important topics in this episode:</p>
      <ul>
        <li>Understanding the history of legacy systems</li>
        <li>Technical debt and its impact</li>
        <li>Refactoring strategies</li>
        <li>Team communication</li>
        <li>Documentation practices</li>
      </ul>

      <h2>Guest Background</h2>
      <p>Our guest has over 20 years of experience working with legacy systems across various industries.</p>

      <h2>Resources Mentioned</h2>
      <ul>
        <li>Working Effectively with Legacy Code by Michael Feathers</li>
        <li>Refactoring by Martin Fowler</li>
        <li>The Pragmatic Programmer</li>
      </ul>

      <h2>Key Takeaways</h2>
      <p>Legacy systems are valuable assets that deserve respect and careful maintenance.</p>
    `,
  })),
}

// Patron mock data scenarios
export const patronScenarios = {
  default: [
    {
      title: 'Sustainer',
      amount_cents: 500,
      patrons: [
        { id: '1', full_name: 'Daniel', patron_status: 'active_patron' },
        { id: '2', full_name: 'Edwin Kortman', patron_status: 'active_patron' },
        { id: '3', full_name: 'Peter M Clausen', patron_status: 'active_patron' },
        { id: '4', full_name: 'Richard Giraud', patron_status: 'active_patron' },
        { id: '5', full_name: 'Ryan B Harvey', patron_status: 'active_patron' },
        { id: '6', full_name: 'Subhrajyoti Sen', patron_status: 'active_patron' },
      ],
    },
    {
      title: 'Maintainer',
      amount_cents: 2500,
      patrons: [],
    },
    {
      title: 'Mender',
      amount_cents: 5000,
      patrons: [],
    },
  ],

  multipleTiers: [
    {
      title: 'Sustainer',
      amount_cents: 500,
      patrons: [
        { id: '1', full_name: 'Alice Johnson', patron_status: 'active_patron' },
        { id: '2', full_name: 'Bob Smith', patron_status: 'active_patron' },
        { id: '3', full_name: 'Carol Williams', patron_status: 'active_patron' },
      ],
    },
    {
      title: 'Maintainer',
      amount_cents: 2500,
      patrons: [
        { id: '4', full_name: 'David Brown', patron_status: 'active_patron' },
        { id: '5', full_name: 'Eve Davis', patron_status: 'active_patron' },
      ],
    },
    {
      title: 'Mender',
      amount_cents: 5000,
      patrons: [
        { id: '6', full_name: 'Frank Miller', patron_status: 'active_patron' },
      ],
    },
  ],
}

export function getEpisodeData() {
  return episodeScenarios[currentScenario] || episodeScenarios.default
}

export function getPatronData() {
  return patronScenarios[currentScenario] || patronScenarios.default
}
