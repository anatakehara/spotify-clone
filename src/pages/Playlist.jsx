import { useParams } from "react-router-dom"
import { playlists } from "../data/playlists"
import { tracks } from "../data/tracks"
import { usePlayer } from "../context/PlayerContext"
import TrackRow from "../components/TrackRow"

function Playlist() {
  const { id } = useParams()
  const { playTracks } = usePlayer()
  const playlist = playlists.find((item) => item.id === Number(id))

  if (!playlist) {
    return <p className="text-gray-400">Playlist not found.</p>
  }

  const playlistTracks = playlist.trackIds.map((trackId) =>
    tracks.find((track) => track.id === trackId)
  )

  return (
    <section>
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-6">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="h-40 w-40 rounded-md object-cover shadow-2xl md:h-48 md:w-48"
        />
        <div>
          <p className="text-sm font-semibold uppercase">Playlist</p>
          <h1 className="text-3xl font-bold md:text-5xl">{playlist.name}</h1>
          <p className="mt-2 text-gray-400">{playlist.description}</p>
        </div>
      </div>

      <ul className="flex flex-col">
        {playlistTracks.map((track, index) => (
          <TrackRow
            key={track.id}
            track={track}
            index={index}
            onPlay={() => playTracks(playlistTracks, index)}
          />
        ))}
      </ul>
    </section>
  )
}

export default Playlist