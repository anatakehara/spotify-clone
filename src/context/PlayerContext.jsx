import { createContext, useContext, useEffect, useRef, useState } from "react"

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const nextRef = useRef(() => {})
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(1)

  const currentTrack = currentIndex >= 0 ? queue[currentIndex] : null

  useEffect(() => {
    const audio = audioRef.current
    if (!currentTrack) return

    audio.src = currentTrack.audioUrl
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }, [currentTrack])

  useEffect(() => {
    const audio = audioRef.current

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => nextRef.current()

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

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
    } else {
      setPlaying(false)
    }
  }

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const seek = (time) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const setVolume = (value) => {
    audioRef.current.volume = value
    setVolumeState(value)
  }

  nextRef.current = next

  const value = {
    audioRef,
    queue,
    currentTrack,
    playing,
    currentTime,
    duration,
    volume,
    playTracks,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
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