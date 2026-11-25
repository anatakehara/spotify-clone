import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectDB } from "./db.js"
import authRoutes from "./routes/auth.js"
import likesRoutes from "./routes/likes.js"
import playlistsRoutes from "./routes/playlists.js"
import helmet from "helmet"
import { apiLimiter, authLimiter } from "./middleware/rateLimits.js"

const app = express()
const PORT = process.env.PORT || 4000

app.set("trust proxy", 1)

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json({ limit: "10kb" }))
app.use("/api", apiLimiter)

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

app.use("/api/auth/login", authLimiter)
app.use("/api/auth/register", authLimiter)
app.use("/api/auth", authRoutes)
app.use("/api/likes", likesRoutes)
app.use("/api/playlists", playlistsRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: "Internal server error" })
})

async function start() {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the .env file")
    }
  
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error.message)
    process.exit(1)
  }
}

start()