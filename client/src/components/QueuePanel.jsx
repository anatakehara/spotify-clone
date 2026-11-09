import { X, Play } from "lucide-react"
import { usePlayer } from "../context/PlayerContext"
import Equalizer from "./Equalizer"

function QueuePanel({ onClose }) {
  const { queue, currentTrack, currentIndex, playing, playFromQueue, removeFromQueue } =
    usePlayer()

  const upNext = queue.slice(currentIndex + 1)

  return (
    <aside className="flex w-80 shrink-0 flex-col rounded-lg bg-[#121212]">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-bold">Queue</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
          aria-label="Close queue"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {!currentTrack ? (
          <p className="px-2 text-sm text-gray-400">
            Nothing in the queue. Play a song to get started.
          </p>
        ) : (
          <>
            <h3 className="px-2 pb-2 text-sm font-semibold text-gray-400">
              Now playing
            </h3>
            <div className="flex items-center gap-3 rounded-md p-2">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="h-10 w-10 shrink-0 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#1DB954]">
                  {currentTrack.title}
                </p>
                <p className="truncate text-sm text-gray-400">
                  {currentTrack.artist}
                </p>
              </div>
              <Equalizer playing={playing} />
            </div>

            <h3 className="px-2 pt-4 pb-2 text-sm font-semibold text-gray-400">
              Next up
            </h3>
            {upNext.length === 0 ? (
              <p className="px-2 text-sm text-gray-400">No more songs in the queue.</p>
            ) : (
              <ul>
                {upNext.map((track, i) => {
                  const queueIndex = currentIndex + 1 + i
                  return (
                    <li
                      key={`${track.id}-${queueIndex}`}
                      className="group flex items-center gap-3 rounded-md p-2 hover:bg-white/10"
                    >
                      <button
                        onClick={() => playFromQueue(queueIndex)}
                        className="relative h-10 w-10 shrink-0"
                        aria-label={`Play ${track.title}`}
                      >
                        <img
                          src={track.cover}
                          alt=""
                          className="h-10 w-10 rounded object-cover"
                        />
                        <span className="absolute inset-0 hidden items-center justify-center rounded bg-black/60 group-hover:flex">
                          <Play size={16} fill="white" className="text-white" />
                        </span>
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{track.title}</p>
                        <p className="truncate text-sm text-gray-400">
                          {track.artist}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromQueue(queueIndex)}
                        className="text-gray-400 opacity-0 hover:text-white focus:opacity-100 group-hover:opacity-100"
                        aria-label={`Remove ${track.title} from queue`}
                      >
                        <X size={16} />
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </aside>
  )
}

export default QueuePanel