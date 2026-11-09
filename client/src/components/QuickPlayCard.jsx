import { Link } from "react-router-dom"
import { Play } from "lucide-react"
import { usePlayer } from "../context/PlayerContext"
import { tracks } from "../data/tracks"

function QuickPlayCard({ playlist }) {
  const { playTracks } = usePlayer()

  const handlePlay = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const playlistTracks = playlist.trackIds.map((trackId) =>
      tracks.find((track) => track.id === trackId)
    )
    playTracks(playlistTracks, 0)
  }

  return (
    <Link
      to={`/playlist/${playlist.id}`}
      className="group flex items-center gap-3 overflow-hidden rounded-md bg-white/10 transition hover:bg-white/20"
    >
      <img
        src={playlist.cover}
        alt={playlist.name}
        className="h-14 w-14 shrink-0 object-cover shadow-lg md:h-16 md:w-16"
      />

      <span className="min-w-0 flex-1 truncate text-sm font-bold md:text-base">
        {playlist.name}
      </span>

      <button
        onClick={handlePlay}
        className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-xl transition-all hover:scale-105 group-hover:opacity-100"
        aria-label={`Play ${playlist.name}`}
      >
        <Play size={18} fill="currentColor" className="ml-0.5" />
      </button>
    </Link>
  )
}

export default QuickPlayCard