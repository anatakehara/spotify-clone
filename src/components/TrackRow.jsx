import { Play } from "lucide-react"
import { usePlayer } from "../context/PlayerContext"
import Equalizer from "./Equalizer"
import LikeButton from "./LikeButton"

function TrackRow({ track, index, onPlay }) {
  const { currentTrack, playing } = usePlayer()
  const isCurrent = currentTrack?.id === track.id

  return (
    <li
      onClick={onPlay}
      className="group grid cursor-pointer grid-cols-[2rem_1fr_auto] items-center gap-4 rounded-md px-4 py-2 hover:bg-white/10 md:grid-cols-[2rem_4fr_3fr_auto]"
    >
      <div className="flex w-8 items-center justify-center text-gray-400">
        {isCurrent ? (
          <>
            <span className="group-hover:hidden">
              <Equalizer playing={playing} />
            </span>
            <Play
              size={16}
              fill="currentColor"
              className="hidden text-white group-hover:block"
            />
          </>
        ) : (
          <>
            <span className="group-hover:hidden">{index + 1}</span>
            <Play
              size={16}
              fill="currentColor"
              className="hidden text-white group-hover:block"
            />
          </>
        )}
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <img
          src={track.cover}
          alt={track.title}
          className="h-10 w-10 shrink-0 rounded object-cover"
        />
        <div className="min-w-0">
          <p
            className={`truncate font-semibold ${
              isCurrent ? "text-[#1DB954]" : "text-white"
            }`}
          >
            {track.title}
          </p>
          <p className="truncate text-sm text-gray-400 group-hover:text-white">
            {track.artist}
          </p>
        </div>
      </div>

      <p className="hidden truncate text-sm text-gray-400 group-hover:text-white md:block">
        {track.album}
      </p>

      <div className="flex items-center gap-4">
        <LikeButton trackId={track.id} />
        <span className="w-10 text-right text-sm text-gray-400">
          {track.duration}
        </span>
      </div>
    </li>
  )
}

export default TrackRow