import PlaylistCard from "../components/PlaylistCard"
import QuickPlayCard from "../components/QuickPlayCard"
import { playlists } from "../data/playlists"
import { getGreeting } from "../utils/getGreeting"

function Home() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">{getGreeting()}</h1>

      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {playlists.map((playlist) => (
          <QuickPlayCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      <h2 className="mb-4 text-2xl font-bold">Made for you</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  )
}

export default Home