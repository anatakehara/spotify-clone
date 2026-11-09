import { usePlayer } from "../context/PlayerContext"
import { formatTime } from "../utils/formatTime"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

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
    <footer className="flex h-24 items-center justify-between gap-3 bg-black px-3 md:px-4">
      <div className="flex w-1/2 items-center gap-3 text-white md:w-1/3">
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
          <p className="truncate text-sm text-gray-400">Nothing playing</p>
        )}
      </div>

      <div className="flex w-1/2 flex-col items-center gap-2 text-white md:w-1/3">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={previous}
            className="text-gray-300 hover:text-white"
            aria-label="Previous"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:scale-105 md:h-10 md:w-10"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={next}
            className="text-gray-300 hover:text-white"
            aria-label="Next"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>

        <div className="flex w-full items-center gap-2 text-xs text-gray-400">
          <span className="w-9 shrink-0 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="h-1 min-w-0 flex-1 cursor-pointer accent-[#1DB954]"
            aria-label="Progress"
          />
          <span className="w-9 shrink-0">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="hidden w-1/3 items-center justify-end gap-2 text-white md:flex">
        {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
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