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
      <div className="mb-8 flex items-end gap-6">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="h-48 w-48 rounded-md object-cover shadow-2xl"
        />
        <div>
          <p className="text-sm font-semibold uppercase">Playlist</p>
          <h1 className="text-5xl font-bold">{playlist.name}</h1>
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