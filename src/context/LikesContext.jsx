import { createContext, useContext, useEffect, useState } from "react"

const LikesContext = createContext(null)

const STORAGE_KEY = "spotify-clone:likes"

function loadLikes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function LikesProvider({ children }) {
  const [likedIds, setLikedIds] = useState(loadLikes)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds))
    } catch {
    }
  }, [likedIds])

  const isLiked = (trackId) => likedIds.includes(trackId)

  const toggleLike = (trackId) => {
    setLikedIds((current) =>
      current.includes(trackId)
        ? current.filter((id) => id !== trackId)
        : [...current, trackId]
    )
  }

  const value = { likedIds, isLiked, toggleLike }

  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
}

export function useLikes() {
  const context = useContext(LikesContext)
  if (!context) {
    throw new Error("useLikes must be used inside a LikesProvider")
  }
  return context
}