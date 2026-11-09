import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectDB } from "./db.js"
import authRoutes from "./routes/auth.js"

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

app.use("/api/auth", authRoutes)

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