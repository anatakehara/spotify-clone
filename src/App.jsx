import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Player from "./components/Player"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Playlist from "./pages/Playlist"
import LikedSongs from "./pages/LikedSongs"
import MobileNav from "./components/MobileNav"

function App() {
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <div className="flex flex-1 gap-2 overflow-hidden p-2">
        <Sidebar />

        <main className="flex-1 overflow-y-auto rounded-lg bg-gradient-to-b from-[#2a2a2a] via-[#121212] via-[320px] to-[#121212] p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/liked" element={<LikedSongs />} />
          </Routes>
        </main>
      </div>

      <Player />
      <MobileNav />
    </div>
  )
}

export default App