import { usePlayer } from "../context/PlayerContext"
import { formatTime } from "../utils/formatTime"

function Player() {
  const {
    currentTrack,
    playing,
    currentTime,
    duration,
    volume,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
  } = usePlayer()

  return (
    <footer className="flex h-24 items-center justify-between bg-black px-4">
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

      <div className="flex w-1/3 flex-col items-center gap-2 text-white">
        <div className="flex items-center gap-6">
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

        <div className="flex w-full items-center gap-2 text-xs text-gray-400">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-[#1DB954]"
            aria-label="Progress"
          />
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex w-1/3 items-center justify-end gap-2 text-white">
        <span aria-hidden="true">{volume === 0 ? "🔇" : "🔊"}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-1 w-28 cursor-pointer accent-[#1DB954]"
          aria-label="Volume"
        />
      </div>
    </footer>
  )
}

export default Player