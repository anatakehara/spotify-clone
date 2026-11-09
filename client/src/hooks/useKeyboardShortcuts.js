import { useEffect } from "react"
import { usePlayer } from "../context/PlayerContext"

export function useKeyboardShortcuts() {
  const { togglePlay, next, previous, volume, setVolume } = usePlayer()

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tag = event.target.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || event.target.isContentEditable) {
        return
      }

      if (tag === "BUTTON") return

      if (event.ctrlKey || event.metaKey || event.altKey) return

      switch (event.code) {
        case "Space":
          event.preventDefault()
          togglePlay()
          break
        case "ArrowRight":
          if (event.shiftKey) {
            event.preventDefault()
            next()
          }
          break
        case "ArrowLeft":
          if (event.shiftKey) {
            event.preventDefault()
            previous()
          }
          break
        case "KeyM":
          setVolume(volume === 0 ? 1 : 0)
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [togglePlay, next, previous, volume, setVolume])
}