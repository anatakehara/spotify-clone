import { NavLink } from "react-router-dom"
import { Home, Search, Library, Heart } from "lucide-react"

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`

  return (
    <aside className="hidden w-64 flex-col gap-2 rounded-lg bg-black p-2 md:flex">
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

      <div className="flex-1 rounded-lg bg-[#121212] p-4">
        <h2 className="mb-4 flex items-center gap-3 font-semibold text-gray-300">
          <Library size={22} />
          Your Library
        </h2>
        <NavLink to="/liked" className={linkClass}>
          <Heart size={18} />
          Liked Songs
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar