import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectDB } from "./db.js"

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

async function start() {
  try {
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