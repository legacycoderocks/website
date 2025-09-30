import { PlayButton } from './PlayButton'
import { AudioProvider } from '../AudioProvider'
import { useState } from 'react'

export default {
  title: 'Components/Player/PlayButton',
  component: PlayButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AudioProvider>
        <div className="p-8">
          <Story />
        </div>
      </AudioProvider>
    ),
  ],
}

// Create a mock player for stories
const MockPlayer = ({ playing, size }) => {
  const [isPlaying, setIsPlaying] = useState(playing)

  const mockPlayer = {
    playing: isPlaying,
    toggle: () => setIsPlaying(!isPlaying),
  }

  return <PlayButton player={mockPlayer} size={size} />
}

export const Large = {
  render: () => <MockPlayer playing={false} size="large" />,
}

export const LargePlaying = {
  render: () => <MockPlayer playing={true} size="large" />,
}

export const Medium = {
  render: () => <MockPlayer playing={false} size="medium" />,
}

export const MediumPlaying = {
  render: () => <MockPlayer playing={true} size="medium" />,
}

export const Small = {
  render: () => <MockPlayer playing={false} size="small" />,
}

export const SmallPlaying = {
  render: () => <MockPlayer playing={true} size="small" />,
}