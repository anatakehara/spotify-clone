import { Link } from "react-router-dom"
import { usePlayer } from "../context/PlayerContext"
import { tracks } from "../data/tracks"
import { Play } from "lucide-react"

function PlaylistCard({ playlist }) {
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
      className="group block cursor-pointer rounded-lg bg-[#181818] p-4 transition hover:bg-[#282828]"
    >
      <div className="relative mb-4">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="aspect-square w-full rounded-md object-cover shadow-lg"
        />

        <button
          onClick={handlePlay}
          className="absolute right-2 bottom-2 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-xl transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105"
          aria-label={`Play ${playlist.name}`}
        >
          <Play size={22} fill="currentColor" className="ml-0.5" />
        </button>
      </div>

      <h3 className="truncate font-bold text-white">{playlist.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-gray-400">
        {playlist.description}
      </p>
    </Link>
  )
}

export default PlaylistCard