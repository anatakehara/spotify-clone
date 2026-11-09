import { Heart } from "lucide-react"
import { useLikes } from "../context/LikesContext"

function LikeButton({ trackId, className = "" }) {
  const { isLiked, toggleLike } = useLikes()
  const liked = isLiked(trackId)

  const handleClick = (event) => {
    event.stopPropagation()
    toggleLike(trackId)
  }

  return (
    <button
      onClick={handleClick}
      className={`transition hover:scale-110 ${
        liked ? "text-[#1DB954]" : "text-gray-400 hover:text-white"
      } ${className}`}
      aria-label={liked ? "Remove from Liked Songs" : "Add to Liked Songs"}
      aria-pressed={liked}
    >
      <Heart size={18} fill={liked ? "currentColor" : "none"} />
    </button>
  )
}

export default LikeButton