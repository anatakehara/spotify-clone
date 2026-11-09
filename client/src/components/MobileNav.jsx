import { NavLink } from "react-router-dom"
import { Home, Search, Heart } from "lucide-react"

function MobileNav() {
  const linkClass = ({ isActive }) =>
    `flex flex-1 flex-col items-center gap-1 py-2 text-xs font-semibold ${
      isActive ? "text-white" : "text-gray-400"
    }`

  return (
    <nav className="flex bg-black md:hidden">
      <NavLink to="/" className={linkClass}>
        <Home size={22} />
        Home
      </NavLink>
      <NavLink to="/search" className={linkClass}>
        <Search size={22} />
        Search
      </NavLink>
      <NavLink to="/liked" className={linkClass}>
        <Heart size={22} />
        Liked
      </NavLink>
    </nav>
  )

}

export default MobileNav