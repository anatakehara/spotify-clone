import { useParams } from "react-router-dom"
import { Play, Pause, Shuffle } from "lucide-react"
import TrackRow from "../components/TrackRow"
import { usePlayer } from "../context/PlayerContext"
import { playlists } from "../data/playlists"
import { tracks } from "../data/tracks"
import TrackListHeader from "../components/TrackListHeader"

function Playlist() {
  const { id } = useParams()
  const { playTracks, playShuffled, currentTrack, playing, togglePlay } =
    usePlayer()

  const playlist = playlists.find((item) => item.id === Number(id))

  if (!playlist) {
    return <p className="text-gray-400">Playlist not found.</p>
  }

  const playlistTracks = playlist.trackIds.map((trackId) =>
    tracks.find((track) => track.id === trackId)
  )

  const isThisPlaylistPlaying =
    playing && playlistTracks.some((track) => track.id === currentTrack?.id)

  const handleMainButton = () => {
    if (isThisPlaylistPlaying) {
      togglePlay()
    } else {
      playTracks(playlistTracks, 0)
    }
  }

  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute -top-4 -right-4 -left-4 h-80 md:-top-6 md:-right-6 md:-left-6"
        style={{
          background: `linear-gradient(to bottom, ${playlist.color}, transparent)`,
        }}
      />

      <div className="relative">
        <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-6">
          <img
            src={playlist.cover}
            alt={playlist.name}
            className="h-40 w-40 rounded-md object-cover shadow-2xl md:h-56 md:w-56"
          />
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase">Playlist</p>
            <h1 className="text-3xl font-bold md:text-7xl">{playlist.name}</h1>
            <p className="mt-2 text-gray-300">{playlist.description}</p>
            <p className="mt-1 text-sm text-gray-300">
              {playlistTracks.length} songs
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-6">
          <button
            onClick={handleMainButton}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1DB954] text-black transition hover:scale-105 hover:bg-[#1ed760]"
            aria-label={isThisPlaylistPlaying ? "Pause" : "Play"}
          >
            {isThisPlaylistPlaying ? (
              <Pause size={26} fill="currentColor" />
            ) : (
              <Play size={26} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button
            onClick={() => playShuffled(playlistTracks)}
            className="text-gray-300 transition hover:scale-105 hover:text-white"
            aria-label="Shuffle play"
          >
            <Shuffle size={28} />
          </button>
        </div>

        <TrackListHeader />
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
      </div>
    </section>
  )
}

export default Playlist