import PlaylistCard from "../components/PlaylistCard"
import { playlists } from "../data/playlists"

function Home() {
  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Good evening</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  )
}

export default Home