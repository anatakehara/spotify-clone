import { createContext, useContext, useEffect, useRef, useState } from "react"

const PlayerContext = createContext(null)

const SETTINGS_KEY = "spotify-clone:player-settings"

function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY)
    const parsed = saved ? JSON.parse(saved) : {}
    return {
      volume: typeof parsed.volume === "number" ? parsed.volume : 1,
      shuffle: parsed.shuffle === true,
      repeat: ["off", "all", "one"].includes(parsed.repeat)
        ? parsed.repeat
        : "off",
    }
  } catch {
    return { volume: 1, shuffle: false, repeat: "off" }
  }
}

function shuffleArray(list) {
  const result = [...list]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const endedRef = useRef(() => {})
  const originalQueueRef = useRef([])

  const [initial] = useState(loadSettings)
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(initial.volume)
  const [shuffle, setShuffle] = useState(initial.shuffle)
  const [repeat, setRepeat] = useState(initial.repeat)

  const currentTrack = currentIndex >= 0 ? queue[currentIndex] : null

  // Load and play whenever the current track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!currentTrack) return

    if (!currentTrack.audioUrl) {
      console.warn("Track has no audioUrl:", currentTrack.title)
      setPlaying(false)
      return
    }

    audio.src = currentTrack.audioUrl
    audio
      .play()
      .then(() => setPlaying(true))
      .catch((err) => {
        console.error("Play failed:", err)
        setPlaying(false)
      })
  }, [currentTrack])

  // Keep React state in sync with the audio element
  useEffect(() => {
    const audio = audioRef.current

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => endedRef.current()

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const restartCurrent = () => {
    const audio = audioRef.current
    audio.currentTime = 0
    setCurrentTime(0)
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }

  const playTracks = (tracks, startIndex = 0) => {
    originalQueueRef.current = tracks

    if (shuffle) {
      const selected = tracks[startIndex]
      const rest = shuffleArray(tracks.filter((_, i) => i !== startIndex))
      setQueue([selected, ...rest])
      setCurrentIndex(0)
    } else {
      setQueue(tracks)
      setCurrentIndex(startIndex)
    }
  }

  const playShuffled = (tracks) => {
    originalQueueRef.current = tracks
    setShuffle(true)
    setQueue(shuffleArray(tracks))
    setCurrentIndex(0)
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
    } else if (repeat === "all" && queue.length > 0) {
      if (queue.length === 1) {
        restartCurrent()
      } else {
        setCurrentIndex(0)
      }
    } else {
      audioRef.current.pause()
      setPlaying(false)
    }
  }

  const previous = () => {
    if (audioRef.current.currentTime > 3 || currentIndex <= 0) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const toggleShuffle = () => {
    if (!shuffle) {
      if (currentTrack) {
        const rest = shuffleArray(queue.filter((_, i) => i !== currentIndex))
        setQueue([currentTrack, ...rest])
        setCurrentIndex(0)
      }
      setShuffle(true)
    } else {
      if (currentTrack) {
        const original = originalQueueRef.current
        const index = original.findIndex((t) => t.id === currentTrack.id)
        setQueue(original)
        setCurrentIndex(index >= 0 ? index : 0)
      }
      setShuffle(false)
    }
  }

  const cycleRepeat = () => {
    setRepeat((current) =>
      current === "off" ? "all" : current === "all" ? "one" : "off"
    )
  }

  const seek = (time) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const setVolume = (value) => {
    audioRef.current.volume = value
    setVolumeState(value)
  }

  const playFromQueue = (index) => {
    if (index >= 0 && index < queue.length) {
      setCurrentIndex(index)
    }
  }

  const removeFromQueue = (index) => {
    if (index <= currentIndex) return

    const removed = queue[index]
    setQueue((current) => current.filter((_, i) => i !== index))
    originalQueueRef.current = originalQueueRef.current.filter(
      (track) => track.id !== removed.id
    )
  }

  useEffect(() => {
    endedRef.current = () => {
      if (repeat === "one") {
        restartCurrent()
      } else {
        next()
      }
    }
  })

  useEffect(() => {
    audioRef.current.volume = initial.volume
  }, [initial.volume])

  useEffect(() => {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ volume, shuffle, repeat })
      )
    } catch {
    }
  }, [volume, shuffle, repeat])

  const value = {
    audioRef,
    queue,
    currentTrack,
    playing,
    currentTime,
    duration,
    volume,
    shuffle,
    repeat,
    currentIndex,
    playTracks,
    playShuffled,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleShuffle,
    cycleRepeat,
    playFromQueue,
    removeFromQueue,
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