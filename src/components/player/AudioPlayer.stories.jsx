import { AudioPlayer } from './AudioPlayer'
import { AudioProvider } from '../AudioProvider'

export default {
  title: 'Components/Player/AudioPlayer',
  component: AudioPlayer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AudioProvider>
        <Story />
      </AudioProvider>
    ),
  ],
}

const sampleAudio = {
  title: '42: Understanding Legacy Code',
  link: '/episodes/42',
  audio: {
    src: 'https://example.com/episode.mp3',
    type: 'audio/mpeg',
  },
}

export const Default = {
  render: () => {
    // Note: This story shows the component structure but won't be fully interactive
    // without actual audio loading
    return (
      <div className="relative">
        <AudioPlayer />
        <p className="mt-4 text-sm text-gray-500">
          Note: Audio player requires an active episode to display. Use the episode pages to see it in action.
        </p>
      </div>
    )
  },
}

export const WithDescription = {
  render: () => (
    <div className="space-y-4">
      <div className="prose">
        <h3>Audio Player Component</h3>
        <p>
          The AudioPlayer component appears at the bottom of the page when an episode is playing.
          It includes:
        </p>
        <ul>
          <li>Play/Pause button</li>
          <li>Rewind and Forward buttons (10 seconds)</li>
          <li>Playback speed control</li>
          <li>Volume/Mute control</li>
          <li>Progress slider</li>
        </ul>
      </div>
      <AudioPlayer />
    </div>
  ),
}