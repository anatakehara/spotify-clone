import { NavLink } from "react-router-dom"
import { Home, Search, Library, Heart } from "lucide-react"
import { playlists } from "../data/playlists"

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`

  const libraryItemClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md p-2 transition hover:bg-white/10 ${
      isActive ? "bg-white/10" : ""
    }`

  return (
    <aside className="hidden w-72 flex-col gap-2 rounded-lg bg-black p-2 md:flex">
      <nav className="rounded-lg bg-[#121212] p-4">
        <ul className="flex flex-col gap-4 font-semibold">
          <li>
            <NavLink to="/" className={linkClass}>
              <Home size={22} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={linkClass}>
              <Search size={22} />
              Search
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex min-h-0 flex-1 flex-col rounded-lg bg-[#121212] p-2">
        <h2 className="mb-2 flex items-center gap-3 px-2 py-2 font-semibold text-gray-300">
          <Library size={22} />
          Your Library
        </h2>

        <ul className="flex flex-col gap-1 overflow-y-auto">
          <li>
            <NavLink to="/liked" className={libraryItemClass}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 to-blue-300">
                <Heart size={18} fill="white" className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">Liked Songs</p>
                <p className="truncate text-sm text-gray-400">Playlist</p>
              </div>
            </NavLink>
          </li>

          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <NavLink
                to={`/playlist/${playlist.id}`}
                className={libraryItemClass}
              >
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="h-12 w-12 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {playlist.name}
                  </p>
                  <p className="truncate text-sm text-gray-400">Playlist</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar