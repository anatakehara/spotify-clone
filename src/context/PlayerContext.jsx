import { createContext, useContext, useEffect, useRef, useState } from "react"

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [playing, setPlaying] = useState(false)

  const currentTrack = currentIndex >= 0 ? queue[currentIndex] : null

  useEffect(() => {
    const audio = audioRef.current
    if (!currentTrack) return

    audio.src = currentTrack.audioUrl
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }, [currentTrack])

  const playTracks = (tracks, startIndex = 0) => {
    setQueue(tracks)
    setCurrentIndex(startIndex)
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!currentTrack) return

    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const next = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const value = {
    audioRef,
    queue,
    currentTrack,
    playing,
    playTracks,
    togglePlay,
    next,
    previous,
  }

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used inside a PlayerProvider")
  }
  return context
}