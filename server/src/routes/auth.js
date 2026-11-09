import { Router } from "express"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { User } from "../models/User.js"
import { signToken } from "../utils/token.js"

const router = Router()

const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(72),
})

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
})

function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    likedTrackIds: user.likedTrackIds,
  }
}

router.post("/register", async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid data",
        errors: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      })
    }

    const { name, email, password } = parsed.data

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: "Email already in use" })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, passwordHash })

    res.status(201).json({
      token: signToken(user._id.toString()),
      user: toPublicUser(user),
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already in use" })
    }
    next(error)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data" })
    }

    const { email, password } = parsed.data

    const user = await User.findOne({ email }).select("+passwordHash")

    const valid = user && (await bcrypt.compare(password, user.passwordHash))
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    res.json({
      token: signToken(user._id.toString()),
      user: toPublicUser(user),
    })
  } catch (error) {
    next(error)
  }
})

export default router