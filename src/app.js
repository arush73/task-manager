import express from 'express'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


import healthCheckRouter from "./routes/healthCheck.routes.js"
import userRouter from "./routes/auth.routes.js"


app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/auth",authRouter)


export default app