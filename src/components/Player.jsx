import { usePlayer } from "../context/PlayerContext"

function Player() {
  const { currentTrack, playing, togglePlay, next, previous } = usePlayer()

  return (
    <footer className="flex h-20 items-center justify-between bg-black px-4">
      <div className="flex w-1/3 items-center gap-3 text-white">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="h-14 w-14 rounded object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {currentTrack.title}
              </p>
              <p className="truncate text-xs text-gray-400">
                {currentTrack.artist}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400">Nothing playing</p>
        )}
      </div>

      <div className="flex w-1/3 items-center justify-center gap-6 text-white">
        <button onClick={previous} className="hover:scale-105" aria-label="Previous">
          ⏮
        </button>
        <button
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:scale-105"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button onClick={next} className="hover:scale-105" aria-label="Next">
          ⏭
        </button>
      </div>

      <div className="flex w-1/3 justify-end text-white">Volume</div>
    </footer>
  )
}

export default Player