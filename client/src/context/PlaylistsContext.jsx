import { createContext, useContext, useEffect, useState } from "react"
import { playlists as defaultPlaylists } from "../data/playlists"

const PlaylistsContext = createContext(null)

const STORAGE_KEY = "spotify-clone:user-playlists"

const COLORS = ["#2d5a6b", "#6b4a2d", "#4a2d6b", "#2d6b4a", "#6b2d4a"]

function loadPlaylists() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function PlaylistsProvider({ children }) {
  const [userPlaylists, setUserPlaylists] = useState(loadPlaylists)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userPlaylists))
    } catch {
    }
  }, [userPlaylists])

  const allPlaylists = [...defaultPlaylists, ...userPlaylists]

  const getPlaylistById = (id) =>
    allPlaylists.find((playlist) => String(playlist.id) === String(id))

  const createPlaylist = (name) => {
    const trimmed = name?.trim()
    const newPlaylist = {
      id: `user-${crypto.randomUUID()}`,
      name: trimmed || `My Playlist #${userPlaylists.length + 1}`,
      description: "",
      cover: null,
      color: COLORS[userPlaylists.length % COLORS.length],
      trackIds: [],
      isUser: true,
    }

    setUserPlaylists((current) => [...current, newPlaylist])
    return newPlaylist
  }

  const renamePlaylist = (id, name) => {
    const trimmed = name.trim()
    if (!trimmed) return

    setUserPlaylists((current) =>
      current.map((playlist) =>
        playlist.id === id ? { ...playlist, name: trimmed } : playlist
      )
    )
  }

  const deletePlaylist = (id) => {
    setUserPlaylists((current) =>
      current.filter((playlist) => playlist.id !== id)
    )
  }

  const addTrackToPlaylist = (playlistId, trackId) => {
    setUserPlaylists((current) =>
      current.map((playlist) =>
        playlist.id === playlistId && !playlist.trackIds.includes(trackId)
          ? { ...playlist, trackIds: [...playlist.trackIds, trackId] }
          : playlist
      )
    )
  }

  const removeTrackFromPlaylist = (playlistId, trackId) => {
    setUserPlaylists((current) =>
      current.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              trackIds: playlist.trackIds.filter((id) => id !== trackId),
            }
          : playlist
      )
    )
  }

  const value = {
    userPlaylists,
    allPlaylists,
    getPlaylistById,
    createPlaylist,
    renamePlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  }

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  )
}

export function usePlaylists() {
  const context = useContext(PlaylistsContext)
  if (!context) {
    throw new Error("usePlaylists must be used inside a PlaylistsProvider")
  }
  return context
}