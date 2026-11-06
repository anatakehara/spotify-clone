import { useParams } from "react-router-dom"
import { playlists } from "../data/playlists"
import { tracks } from "../data/tracks"
import { usePlayer } from "../context/PlayerContext"

function Playlist() {
  const { id } = useParams()
  const { playTracks, currentTrack } = usePlayer()
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
          <li
            key={track.id}
            onClick={() => playTracks(playlistTracks, index)}
            className="flex cursor-pointer items-center gap-4 rounded-md px-4 py-2 hover:bg-[#282828]"
          >
            <span className="w-6 text-gray-400">{index + 1}</span>
            <img
              src={track.cover}
              alt={track.title}
              className="h-10 w-10 rounded object-cover"
            />
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  currentTrack?.id === track.id ? "text-[#1DB954]" : ""
                }`}
              >
                {track.title}
              </p>
              <p className="text-sm text-gray-400">{track.artist}</p>
            </div>
            <span className="text-sm text-gray-400">{track.duration}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Playlist