import mongoose from "mongoose"

const playlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    description: {
      type: String,
      default: "",
      maxlength: 200,
    },
    color: {
      type: String,
      default: "#2d5a6b",
    },
    trackIds: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
)

export const Playlist = mongoose.model("Playlist", playlistSchema)