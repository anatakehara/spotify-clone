import TrackRow from "../components/TrackRow"
import { useLikes } from "../context/LikesContext"
import { usePlayer } from "../context/PlayerContext"
import { tracks } from "../data/tracks"
import { Heart } from "lucide-react"

function LikedSongs() {
  const { likedIds } = useLikes()
  const { playTracks } = usePlayer()

  const likedTracks = tracks.filter((track) => likedIds.includes(track.id))

  return (
    <section>
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-6">
        <div className="flex h-40 w-40 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 to-blue-300 shadow-2xl md:h-48 md:w-48">
          <Heart size={72} fill="white" className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase">Playlist</p>
          <h1 className="text-3xl font-bold md:text-5xl">Liked Songs</h1>
          <p className="mt-2 text-gray-400">{likedTracks.length} songs</p>
        </div>
      </div>

      {likedTracks.length === 0 ? (
        <p className="text-gray-400">
          Songs you like will appear here. Tap the ♡ on any track.
        </p>
      ) : (
        <ul className="flex flex-col">
          {likedTracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              index={index}
              onPlay={() => playTracks(likedTracks, index)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default LikedSongs