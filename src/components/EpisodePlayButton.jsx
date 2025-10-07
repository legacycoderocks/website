'use client'

import { useMemo } from 'react'
import { useAudioPlayer } from '@/components/AudioProvider'
import { PlayButton } from '@/components/player/PlayButton'

export function EpisodePlayButton({ episode, size = 'large' }) {
  const audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.number}`,
    }),
    [episode]
  )
  const player = useAudioPlayer(audioPlayerData)

  return <PlayButton player={player} size={size} />
}
