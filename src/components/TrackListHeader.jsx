import { Clock } from "lucide-react"

function TrackListHeader() {
  return (
    <div className="mb-2 grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-white/10 px-4 py-2 text-sm text-gray-400 md:grid-cols-[2rem_4fr_3fr_auto]">
      <span className="text-center">#</span>
      <span>Title</span>
      <span className="hidden md:block">Album</span>
      <span className="flex w-[4.75rem] justify-end pr-1">
        <Clock size={16} />
      </span>
    </div>
  )
}

export default TrackListHeader