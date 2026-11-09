import { useState } from "react"
import TrackRow from "../components/TrackRow"
import { usePlayer } from "../context/PlayerContext"
import { useDebounce } from "../hooks/useDebounce"
import { tracks } from "../data/tracks"
import TrackListHeader from "../components/TrackListHeader"

function Search() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 300)
  const { playTracks } = usePlayer()

  const normalized = debouncedQuery.trim().toLowerCase()

  const results = normalized
    ? tracks.filter(
        (track) =>
          track.title.toLowerCase().includes(normalized) ||
          track.artist.toLowerCase().includes(normalized) ||
          track.album.toLowerCase().includes(normalized)
      )
    : []

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Search</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What do you want to listen to?"
        className="mb-8 w-full max-w-md rounded-full bg-[#242424] px-5 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white"
      />

      {!normalized && (
        <p className="text-gray-400">Search for songs, artists or albums.</p>
      )}

      {normalized && results.length === 0 && (
        <p className="text-gray-400">No results for "{debouncedQuery}".</p>
      )}

      {results.length > 0 && (
        <>
          <TrackListHeader />
          <ul className="flex flex-col">
          {results.map((track, index) => (
            <TrackRow
              key={track.id}
                track={track}
                index={index}
                onPlay={() => playTracks(results, index)}
              />
          ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Search