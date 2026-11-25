import { Router } from "express"
import mongoose from "mongoose"
import { z } from "zod"
import { Playlist } from "../models/Playlist.js"
import { requireAuth } from "../middleware/auth.js"
import { toPublicPlaylist } from "../utils/publicPlaylist.js"

const router = Router()

router.use(requireAuth)

const COLORS = ["#2d5a6b", "#6b4a2d", "#4a2d6b", "#2d6b4a", "#6b2d4a"]
const MAX_PLAYLISTS_PER_USER = 50

const createSchema = z.object({
  name: z.string().trim().max(60).optional(),
})

const renameSchema = z.object({
  name: z.string().trim().min(1).max(60),
})

const trackIdSchema = z.coerce.number().int().positive()

function validateObjectId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Playlist not found" })
  }
  next()
}

router.get("/", async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).sort({
      createdAt: 1,
    })
    res.json({ playlists: playlists.map(toPublicPlaylist) })
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body ?? {})
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data" })
    }

    const count = await Playlist.countDocuments({ user: req.user._id })
    if (count >= MAX_PLAYLISTS_PER_USER) {
      return res.status(403).json({ message: "Playlist limit reached" })
    }

    const playlist = await Playlist.create({
      user: req.user._id,
      name: parsed.data.name || `My Playlist #${count + 1}`,
      color: COLORS[count % COLORS.length],
    })

    res.status(201).json({ playlist: toPublicPlaylist(playlist) })
  } catch (error) {
    next(error)
  }
})

router.get("/:id", validateObjectId, async (req, res, next) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" })
    }
    res.json({ playlist: toPublicPlaylist(playlist) })
  } catch (error) {
    next(error)
  }
})

router.patch("/:id", validateObjectId, async (req, res, next) => {
  try {
    const parsed = renameSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid name" })
    }

    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name: parsed.data.name },
      { new: true }
    )
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" })
    }
    res.json({ playlist: toPublicPlaylist(playlist) })
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", validateObjectId, async (req, res, next) => {
  try {
    const playlist = await Playlist.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" })
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put("/:id/tracks/:trackId", validateObjectId, async (req, res, next) => {
  try {
    const parsed = trackIdSchema.safeParse(req.params.trackId)
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid track id" })
    }

    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $addToSet: { trackIds: parsed.data } },
      { new: true }
    )
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" })
    }
    res.json({ playlist: toPublicPlaylist(playlist) })
  } catch (error) {
    next(error)
  }
})

router.delete(
  "/:id/tracks/:trackId",
  validateObjectId,
  async (req, res, next) => {
    try {
      const parsed = trackIdSchema.safeParse(req.params.trackId)
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid track id" })
      }

      const playlist = await Playlist.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { $pull: { trackIds: parsed.data } },
        { new: true }
      )
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" })
      }
      res.json({ playlist: toPublicPlaylist(playlist) })
    } catch (error) {
      next(error)
    }
  }
)

export default router