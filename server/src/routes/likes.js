import { Router } from "express"
import { z } from "zod"
import { User } from "../models/User.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()

router.use(requireAuth)

const trackIdSchema = z.coerce.number().int().positive()

router.get("/", (req, res) => {
  res.json({ likedTrackIds: req.user.likedTrackIds })
})

router.put("/:trackId", async (req, res, next) => {
  try {
    const parsed = trackIdSchema.safeParse(req.params.trackId)
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid track id" })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { likedTrackIds: parsed.data } },
      { new: true }
    )

    res.json({ likedTrackIds: user.likedTrackIds })
  } catch (error) {
    next(error)
  }
})

router.delete("/:trackId", async (req, res, next) => {
  try {
    const parsed = trackIdSchema.safeParse(req.params.trackId)
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid track id" })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { likedTrackIds: parsed.data } },
      { new: true }
    )

    res.json({ likedTrackIds: user.likedTrackIds })
  } catch (error) {
    next(error)
  }
})

export default router