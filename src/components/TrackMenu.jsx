import { useEffect, useRef, useState } from "react"
import { MoreHorizontal, Plus, Check, Trash2 } from "lucide-react"
import { usePlaylists } from "../context/PlaylistsContext"

function TrackMenu({ trackId, currentPlaylistId }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const {
    userPlaylists,
    createPlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  } = usePlaylists()

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const stop = (event) => event.stopPropagation()

  const handleToggle = (event) => {
    event.stopPropagation()
    setOpen((current) => !current)
  }

  const handleAdd = (event, playlistId) => {
    event.stopPropagation()
    addTrackToPlaylist(playlistId, trackId)
    setOpen(false)
  }

  const handleCreateAndAdd = (event) => {
    event.stopPropagation()
    const newPlaylist = createPlaylist("")
    addTrackToPlaylist(newPlaylist.id, trackId)
    setOpen(false)
  }

  const handleRemove = (event) => {
    event.stopPropagation()
    removeTrackFromPlaylist(currentPlaylistId, trackId)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative" onClick={stop}>
      <button
        onClick={handleToggle}
        className="text-gray-400 opacity-0 transition hover:text-white mt-2 focus:opacity-100 group-hover:opacity-100"
        aria-label="More options"
        aria-expanded={open}
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-56 rounded-md bg-[#282828] p-1 text-sm shadow-2xl">
          {currentPlaylistId &&
            userPlaylists.some((p) => p.id === currentPlaylistId) && (
              <>
                <button
                  onClick={handleRemove}
                  className="flex w-full items-center gap-3 rounded px-3 py-2 text-left hover:bg-white/10"
                >
                  <Trash2 size={16} />
                  Remove from this playlist
                </button>
                <div className="my-1 border-t border-white/10" />
              </>
            )}

          <p className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
            Add to playlist
          </p>

          <button
            onClick={handleCreateAndAdd}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-left hover:bg-white/10"
          >
            <Plus size={16} />
            New playlist
          </button>

          <div className="max-h-48 overflow-y-auto">
            {userPlaylists.map((playlist) => {
              const alreadyIn = playlist.trackIds.includes(trackId)
              return (
                <button
                  key={playlist.id}
                  onClick={(e) => handleAdd(e, playlist.id)}
                  disabled={alreadyIn}
                  className="flex w-full items-center justify-between gap-3 rounded px-3 py-2 text-left hover:bg-white/10 disabled:cursor-default disabled:text-gray-500 disabled:hover:bg-transparent"
                >
                  <span className="truncate">{playlist.name}</span>
                  {alreadyIn && <Check size={16} className="shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default TrackMenu