import { NavLink } from "react-router-dom"

function Sidebar() {
  const linkClass = ({ isActive }) =>
    isActive ? "text-white" : "text-gray-300 hover:text-white"

  return (
    <aside className="flex w-64 flex-col gap-2 rounded-lg bg-black p-2">
      <nav className="rounded-lg bg-[#121212] p-4">
        <ul className="flex flex-col gap-4 font-semibold">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={linkClass}>
              Search
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex-1 rounded-lg bg-[#121212] p-4">
        <h2 className="font-semibold text-gray-300">Your Library</h2>
      </div>
    </aside>
  )
}

export default Sidebar