import { usePlayer } from "../context/PlayerContext"
import LikeButton from "./LikeButton"

function TrackRow({ track, index, onPlay }) {
  const { currentTrack } = usePlayer()
  const isCurrent = currentTrack?.id === track.id

  return (
    <li
      onClick={onPlay}
      className="flex cursor-pointer items-center gap-4 rounded-md px-4 py-2 hover:bg-[#282828]"
    >
      <span className="w-6 text-gray-400">{index + 1}</span>
      <img
        src={track.cover}
        alt={track.title}
        className="h-10 w-10 rounded object-cover"
      />
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-semibold ${
            isCurrent ? "text-[#1DB954]" : ""
          }`}
        >
          {track.title}
        </p>
        <p className="truncate text-sm text-gray-400">{track.artist}</p>
      </div>
      <LikeButton trackId={track.id} />
      <span className="text-sm text-gray-400">{track.duration}</span>
    </li>
  )
}

export default TrackRow