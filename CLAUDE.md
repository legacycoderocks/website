# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for the Legacy Code Rocks community and podcast, built with Next.js 13, Tailwind CSS, and Storybook. The site is based on the Transmit template from Tailwind UI.

## Essential Commands

### Development
- `npm run dev` - Start Next.js development server (port 3000)
- `npm run storybook` - Start Storybook development server (port 6006)

### Build & Deploy
- `npm run build` - Build static site (configured with `output: 'export'`)
- `npm run build-storybook` - Build Storybook for deployment

### Quality
- `npm run lint` - Run ESLint
- `npm run chromatic` - Deploy to Chromatic for visual regression testing

### Dependencies
- `npm install` - Install all dependencies

## Architecture

### Static Site Export
The site uses Next.js static export (`output: 'export'` in next.config.js). This means:
- All pages are pre-rendered at build time
- Images are unoptimized (`images.unoptimized: true`)
- Dynamic routes must be generated via `getStaticPaths`

### Data Fetching
- **Episodes**: Fetched from Libsyn RSS feed (https://feeds.libsyn.com/82186/rss) in src/api/episodes.js
- **Patrons**: Fetched from Patreon API using PATREON_CREATOR_ACCESS_TOKEN and PATREON_CAMPAIGN_ID env vars in src/api/patrons.js
- Episodes are paginated with 10 per page (EPISODES_PER_PAGE constant)

### Audio Player Architecture
The audio player uses a global context-based architecture:
- **AudioProvider** (src/components/AudioProvider.jsx): Context provider with reducer pattern managing player state (playing, muted, duration, currentTime, meta)
- **useAudioPlayer** hook: Provides player controls bound to specific episode data
- Player state is shared globally but can control different episodes
- Actual HTML5 `<audio>` element is rendered once in AudioProvider

### Layout Structure
- **Layout component** (src/components/Layout.jsx): Main layout with header, navigation, footer, and audio player
- Uses a 3-column grid on desktop (2 columns main content + 1 column sidebar)
- Header uses Headless UI Popover for mobile menu
- Sidebar contains logo, about section, listen links, and engage links

### Component Organization
- **src/components/**: Reusable components (Container, EpisodeEntry, Pagination, etc.)
- **src/components/player/**: Audio player components (AudioPlayer, PlayButton, MuteButton, etc.)
- **src/pages/**: Next.js pages following file-based routing
- **src/stories/pages/**: Storybook stories for page components
- Component stories are co-located with components (*.stories.jsx)

### Styling
- Uses Tailwind CSS with custom color palette (`brand-yellow` and `brand-red`)
- Custom font: Satoshi (loaded via src/pages/_document.jsx)
- Tailwind plugins: @tailwindcss/typography and @tailwindcss/forms

### Storybook Integration
- Storybook 7.6.20 configured for Next.js
- Stories located in src/components/ and src/stories/pages/
- Static files served from public/ directory
- Visual regression testing with Chromatic CI

## Key Files
- **src/api/episodes.js**: Episode data fetching and pagination logic
- **src/api/patrons.js**: Patreon API integration
- **src/components/AudioProvider.jsx**: Global audio player state management
- **src/components/Layout.jsx**: Main layout component with navigation
- **next.config.js**: Next.js configuration (static export, trailing slashes)
- **tailwind.config.js**: Custom Tailwind theme with brand colors
